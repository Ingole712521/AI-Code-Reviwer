import type { ZodError } from 'zod';

export function formatValidationErrors(error: ZodError): string[] {
  return error.errors.map((issue) => `${issue.path.join('.')}: ${issue.message}`);
}
