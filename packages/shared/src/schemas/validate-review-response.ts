import { AiResponseValidationError } from '../domain/errors/index.js';
import { formatValidationErrors } from './format-validation-errors.js';
import {
  reviewResponseSchema,
  type ReviewResponse,
} from './review-response.schema.js';

export function parseReviewResponse(raw: unknown): ReviewResponse {
  const result = reviewResponseSchema.safeParse(raw);

  if (!result.success) {
    throw new AiResponseValidationError(
      'AI response failed schema validation',
      formatValidationErrors(result.error),
    );
  }

  return result.data;
}
