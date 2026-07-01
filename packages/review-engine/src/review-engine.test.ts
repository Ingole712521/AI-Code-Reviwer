import { describe, expect, it, vi } from 'vitest';
import type { ReviewInput } from '@ai-pr-reviewer/shared';
import { ReviewEngine } from './review-engine.js';

const reviewInput: ReviewInput = {
  repository: {
    installationId: 1,
    owner: 'acme',
    repo: 'api',
  },
  pullNumber: 7,
  files: [
    {
      filename: 'src/auth.ts',
      status: 'modified',
      patch: '@@ -1,1 +1,1 @@\n-old\n+new',
      additions: 1,
      deletions: 1,
      changes: 2,
    },
  ],
};

describe('ReviewEngine', () => {
  it('returns a validated review result', async () => {
    const aiProvider = {
      reviewPullRequest: vi.fn().mockResolvedValue({
        summary: 'Found one issue.',
        comments: [
          {
            file: 'src/auth.ts',
            line: 1,
            severity: 'high',
            category: 'bug',
            title: 'Bad change',
            comment: 'This change breaks auth.',
          },
        ],
      }),
    };

    const engine = new ReviewEngine(aiProvider);
    const result = await engine.review(reviewInput);

    expect(result.summary).toBe('Found one issue.');
    expect(result.comments).toHaveLength(1);
    expect(aiProvider.reviewPullRequest).toHaveBeenCalledOnce();
  });
});
