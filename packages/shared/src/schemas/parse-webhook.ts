import { WebhookValidationError } from '../domain/errors/index.js';
import { formatValidationErrors } from './format-validation-errors.js';
import {
  pullRequestWebhookSchema,
  type PullRequestWebhookPayload,
} from './webhook.schema.js';

export function parsePullRequestWebhook(
  payload: unknown,
): PullRequestWebhookPayload {
  const result = pullRequestWebhookSchema.safeParse(payload);

  if (!result.success) {
    throw new WebhookValidationError(
      'Invalid pull request webhook payload',
      formatValidationErrors(result.error),
    );
  }

  return result.data;
}
