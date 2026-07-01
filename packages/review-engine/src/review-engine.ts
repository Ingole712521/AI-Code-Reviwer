import type { AIProvider } from '@ai-pr-reviewer/ai';
import {
  parseReviewResponse,
  ReviewEngineError,
  type ReviewInput,
  type ReviewResult,
} from '@ai-pr-reviewer/shared';
import { buildReviewPrompt } from './prompt-builder.js';

export class ReviewEngine {
  constructor(private readonly aiProvider: AIProvider) {}

  async review(input: ReviewInput): Promise<ReviewResult> {
    if (input.files.length === 0) {
      throw new ReviewEngineError('Pull request has no reviewable files');
    }

    const prompt = buildReviewPrompt(input);
    const rawResponse = await this.aiProvider.reviewPullRequest({ prompt });

    const parsed = parseReviewResponse(rawResponse);

    return {
      summary: parsed.summary,
      comments: parsed.comments,
    };
  }
}
