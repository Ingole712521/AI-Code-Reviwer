import type { ReviewJobPayload } from '@ai-pr-reviewer/shared';

export const REVIEW_QUEUE_NAME = 'review-queue';

export interface ReviewQueue {
  enqueue(payload: ReviewJobPayload): Promise<void>;
  ping(): Promise<boolean>;
  close(): Promise<void>;
}

export type ReviewJobHandler = (payload: ReviewJobPayload) => Promise<void>;

export interface ReviewWorker {
  close(): Promise<void>;
}
