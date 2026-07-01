import { describe, expect, it } from 'vitest';
import { buildReviewJobId } from './build-review-job-id.js';

describe('buildReviewJobId', () => {
  it('builds a stable id from owner, repo, pull number, and head sha', () => {
    const jobId = buildReviewJobId({
      installationId: 1,
      owner: 'acme',
      repo: 'api',
      pullNumber: 42,
      headSha: 'abc123',
    });

    expect(jobId).toBe('acme/api#42@abc123');
  });
});
