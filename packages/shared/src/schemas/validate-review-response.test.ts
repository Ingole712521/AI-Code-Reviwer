import { describe, expect, it } from 'vitest';
import {
  parseReviewResponse,
  AiResponseValidationError,
  reviewResponseSchema,
} from '../index.js';

describe('reviewResponseSchema', () => {
  const validResponse = {
    summary: 'Found two potential issues.',
    comments: [
      {
        file: 'src/auth.ts',
        line: 51,
        severity: 'high' as const,
        category: 'bug' as const,
        title: 'Possible null dereference',
        comment: 'user may be undefined before accessing profile.',
      },
    ],
  };

  it('accepts a valid review response', () => {
    const result = reviewResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
  });

  it('rejects responses with invalid severity', () => {
    const result = reviewResponseSchema.safeParse({
      ...validResponse,
      comments: [{ ...validResponse.comments[0], severity: 'urgent' }],
    });
    expect(result.success).toBe(false);
  });

  it('rejects responses with empty summary', () => {
    const result = reviewResponseSchema.safeParse({
      ...validResponse,
      summary: '',
    });
    expect(result.success).toBe(false);
  });

  it('rejects responses with zero or negative line numbers', () => {
    const result = reviewResponseSchema.safeParse({
      ...validResponse,
      comments: [{ ...validResponse.comments[0], line: 0 }],
    });
    expect(result.success).toBe(false);
  });

  it('accepts an empty comments array', () => {
    const result = reviewResponseSchema.safeParse({
      summary: 'No issues found.',
      comments: [],
    });
    expect(result.success).toBe(true);
  });
});

describe('parseReviewResponse', () => {
  it('returns parsed data for valid input', () => {
    const input = {
      summary: 'All clear.',
      comments: [],
    };

    expect(parseReviewResponse(input)).toEqual(input);
  });

  it('throws AiResponseValidationError for invalid input', () => {
    expect(() => parseReviewResponse({ summary: 123 })).toThrow(
      AiResponseValidationError,
    );
  });

  it('includes validation error details', () => {
    try {
      parseReviewResponse({ summary: 123 });
    } catch (error) {
      expect(error).toBeInstanceOf(AiResponseValidationError);
      const validationError = error as AiResponseValidationError;
      expect(validationError.validationErrors.length).toBeGreaterThan(0);
    }
  });
});
