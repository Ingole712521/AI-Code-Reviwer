import './load-env.js';
import pino from 'pino';
import { BullMqReviewWorker } from '@ai-pr-reviewer/queue';
import { loadConfig } from './config.js';
import { createReviewProcessor } from './process-review-job.js';

async function main() {
  const config = loadConfig();
  const logger = pino({ level: config.LOG_LEVEL });
  const processReviewJob = createReviewProcessor(config);

  const worker = new BullMqReviewWorker(config.REDIS_URL, async (job) => {
    const startedAt = Date.now();

    logger.info(
      {
        owner: job.owner,
        repo: job.repo,
        pullNumber: job.pullNumber,
      },
      'review job started',
    );

    await processReviewJob(job);

    logger.info(
      {
        owner: job.owner,
        repo: job.repo,
        pullNumber: job.pullNumber,
        durationMs: Date.now() - startedAt,
      },
      'review job completed',
    );
  });

  const shutdown = async () => {
    await worker.close();
    process.exit(0);
  };

  process.on('SIGINT', () => {
    void shutdown();
  });

  process.on('SIGTERM', () => {
    void shutdown();
  });

  logger.info('worker started');
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
