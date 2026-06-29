import { describe, expect, it } from 'vitest';
import { parsePullRequestWebhook, WebhookValidationError } from '../index.js';

describe('parsePullRequestWebhook', () => {
  const validPayload = {
    action: 'opened' as const,
    installation: { id: 12345 },
    repository: {
      name: 'my-repo',
      owner: { login: 'acme' },
    },
    pull_request: { number: 42 },
  };

  it('parses a valid pull_request webhook payload', () => {
    expect(parsePullRequestWebhook(validPayload)).toEqual(validPayload);
  });

  it('accepts synchronize action', () => {
    const payload = { ...validPayload, action: 'synchronize' as const };
    expect(parsePullRequestWebhook(payload).action).toBe('synchronize');
  });

  it('rejects unsupported actions', () => {
    const payload = { ...validPayload, action: 'closed' };
    expect(() => parsePullRequestWebhook(payload)).toThrow(WebhookValidationError);
  });

  it('rejects missing installation id', () => {
    const { installation: _, ...rest } = validPayload;
    expect(() => parsePullRequestWebhook(rest)).toThrow(WebhookValidationError);
  });
});
