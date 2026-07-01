import { formatValidationErrors } from '@ai-pr-reviewer/shared';
import { z } from 'zod';

const envSchema = z.object({
  GITHUB_APP_ID: z.string().min(1),
  GITHUB_APP_PRIVATE_KEY: z.string().min(1),
  OPENROUTER_API_KEY: z.string().min(1),
  OPENROUTER_BASE_URL: z.string().url().default('https://openrouter.ai/api/v1'),
  OPENROUTER_MODEL: z.string().min(1).default('openai/gpt-5.3-codex'),
  REDIS_URL: z.string().min(1),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
});

export type WorkerConfig = z.infer<typeof envSchema>;

export function loadConfig(): WorkerConfig {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const details = formatValidationErrors(result.error).join(', ');
    throw new Error(`Invalid environment configuration: ${details}`);
  }

  return result.data;
}
