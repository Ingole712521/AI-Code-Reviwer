import { z } from 'zod';

export const reviewJobPayloadSchema = z.object({
  installationId: z.number().int().positive(),
  owner: z.string().min(1),
  repo: z.string().min(1),
  pullNumber: z.number().int().positive(),
});

export type ReviewJobPayloadSchema = z.infer<typeof reviewJobPayloadSchema>;
