import { z } from 'zod';

export const pullRequestWebhookSchema = z.object({
  action: z.enum(['opened', 'synchronize', 'reopened']),
  installation: z.object({
    id: z.number().int().positive(),
  }),
  repository: z.object({
    name: z.string().min(1),
    owner: z.object({
      login: z.string().min(1),
    }),
  }),
  pull_request: z.object({
    number: z.number().int().positive(),
    head: z.object({
      sha: z.string().min(1),
    }),
  }),
});

export type PullRequestWebhookPayload = z.infer<typeof pullRequestWebhookSchema>;
