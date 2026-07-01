import Fastify from 'fastify';
import {
  DomainError,
  parsePullRequestWebhook,
  WebhookVerificationError,
  type ReviewJobPayload,
} from '@ai-pr-reviewer/shared';
import type { ReviewQueue } from '@ai-pr-reviewer/queue';
import type { AppConfig } from './config.js';
import { verifyWebhookSignature } from './verify-webhook.js';

interface CreateServerOptions {
  config: AppConfig;
  reviewQueue: ReviewQueue;
}

function readHeaderValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export function createServer({ config, reviewQueue }: CreateServerOptions) {
  const app = Fastify({
    logger: {
      level: config.LOG_LEVEL,
    },
  });

  app.addContentTypeParser(
    'application/json',
    { parseAs: 'string' },
    (_request, body, done) => {
      done(null, body);
    },
  );

  app.get('/health', async () => {
    const redis = await reviewQueue.ping();
    const status = redis ? 'ok' : 'degraded';

    return {
      status,
      redis,
    };
  });

  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof WebhookVerificationError) {
      return reply.status(401).send({ error: 'invalid-signature' });
    }

    if (error instanceof DomainError) {
      return reply.status(400).send({ error: error.code });
    }

    app.log.error(error);
    return reply.status(500).send({ error: 'internal-error' });
  });

  app.post('/webhooks/github', async (request, reply) => {
    const rawBody = typeof request.body === 'string' ? request.body : '';
    const signature = readHeaderValue(request.headers['x-hub-signature-256']);
    const eventName = readHeaderValue(request.headers['x-github-event']);

    if (!verifyWebhookSignature(rawBody, signature, config.GITHUB_WEBHOOK_SECRET)) {
      throw new WebhookVerificationError('Invalid webhook signature');
    }

    if (eventName !== 'pull_request') {
      return reply.status(202).send({ accepted: false, reason: 'ignored-event' });
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody) as unknown;
    } catch {
      return reply.status(400).send({ accepted: false, reason: 'invalid-json' });
    }

    const webhook = parsePullRequestWebhook(payload);
    const job: ReviewJobPayload = {
      installationId: webhook.installation.id,
      owner: webhook.repository.owner.login,
      repo: webhook.repository.name,
      pullNumber: webhook.pull_request.number,
      headSha: webhook.pull_request.head.sha,
    };

    await reviewQueue.enqueue(job);

    request.log.info(
      {
        owner: job.owner,
        repo: job.repo,
        pullNumber: job.pullNumber,
      },
      'review job enqueued',
    );

    return reply.status(202).send({ accepted: true });
  });

  return app;
}
