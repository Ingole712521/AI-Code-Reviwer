import { Queue, Worker } from 'bullmq';
import { QueueError, reviewJobPayloadSchema, type ReviewJobPayload } from '@ai-pr-reviewer/shared';
import { buildReviewJobId } from './build-review-job-id.js';
import {
  REVIEW_QUEUE_NAME,
  type ReviewJobHandler,
  type ReviewQueue,
  type ReviewWorker,
} from './review-queue.js';

export class BullMqReviewQueue implements ReviewQueue {
  private readonly queue: Queue;

  constructor(redisUrl: string) {
    this.queue = new Queue(REVIEW_QUEUE_NAME, {
      connection: { url: redisUrl },
    });
  }

  async enqueue(payload: ReviewJobPayload): Promise<void> {
    const parsed = reviewJobPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      throw new QueueError('Invalid review job payload');
    }

    try {
      await this.queue.add('review-pull-request', parsed.data, {
        jobId: buildReviewJobId(parsed.data),
        removeOnComplete: 100,
        removeOnFail: 100,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
      });
    } catch (error) {
      throw new QueueError('Failed to enqueue review job', error);
    }
  }

  async ping(): Promise<boolean> {
    try {
      await this.queue.waitUntilReady();
      return true;
    } catch {
      return false;
    }
  }

  async close(): Promise<void> {
    await this.queue.close();
  }
}

export class BullMqReviewWorker implements ReviewWorker {
  private readonly worker: Worker;

  constructor(redisUrl: string, handler: ReviewJobHandler) {
    this.worker = new Worker(
      REVIEW_QUEUE_NAME,
      async (job) => {
        const parsed = reviewJobPayloadSchema.safeParse(job.data);
        if (!parsed.success) {
          throw new QueueError('Invalid review job payload in worker');
        }

        await handler(parsed.data);
      },
      {
        connection: { url: redisUrl },
      },
    );
  }

  async close(): Promise<void> {
    await this.worker.close();
  }
}
