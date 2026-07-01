import type { ReviewJobPayload } from '@ai-pr-reviewer/shared';

export function buildReviewJobId(payload: ReviewJobPayload): string {
  return `${payload.owner}/${payload.repo}#${payload.pullNumber}@${payload.headSha}`;
}
