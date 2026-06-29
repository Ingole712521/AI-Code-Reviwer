import { z } from 'zod';

export const reviewSeveritySchema = z.enum(['low', 'medium', 'high', 'critical']);

export const reviewCategorySchema = z.enum([
  'bug',
  'security',
  'performance',
  'error-handling',
  'logic',
]);

export const reviewCommentSchema = z.object({
  file: z.string().min(1),
  line: z.number().int().positive(),
  severity: reviewSeveritySchema,
  category: reviewCategorySchema,
  title: z.string().min(1),
  comment: z.string().min(1),
});

export const reviewResponseSchema = z.object({
  summary: z.string().min(1),
  comments: z.array(reviewCommentSchema),
});

export type ReviewSeverity = z.infer<typeof reviewSeveritySchema>;
export type ReviewCategory = z.infer<typeof reviewCategorySchema>;
export type ReviewComment = z.infer<typeof reviewCommentSchema>;
export type ReviewResponse = z.infer<typeof reviewResponseSchema>;
