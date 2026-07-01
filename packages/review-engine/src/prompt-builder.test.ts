import { describe, expect, it } from 'vitest';
import type { ReviewInput } from '@ai-pr-reviewer/shared';
import { buildReviewPrompt } from './prompt-builder.js';

const reviewInput: ReviewInput = {
  repository: {
    installationId: 1,
    owner: 'acme',
    repo: 'api',
  },
  pullNumber: 42,
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

describe('buildReviewPrompt', () => {
  it('includes repository and review instructions', () => {
    const prompt = buildReviewPrompt(reviewInput);

    expect(prompt).toContain('acme/api');
    expect(prompt).toContain('Pull request: #42');
    expect(prompt).toContain('Return only JSON');
    expect(prompt).toContain('src/auth.ts');
  });
});
