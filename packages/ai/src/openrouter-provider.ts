import { AiProviderError } from '@ai-pr-reviewer/shared';
import type { AIProvider, AiReviewRequest, OpenRouterConfig } from './ai-provider.js';

interface OpenRouterChoice {
  message?: {
    content?: string;
  };
}

interface OpenRouterResponse {
  choices?: OpenRouterChoice[];
}

export class OpenRouterProvider implements AIProvider {
  constructor(private readonly config: OpenRouterConfig) {}

  async reviewPullRequest(input: AiReviewRequest): Promise<unknown> {
    let response: Response;
    try {
      response = await fetch(`${this.config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://revio.dev',
          'X-Title': 'Revio',
        },
        body: JSON.stringify({
          model: this.config.model,
          temperature: 0.2,
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content:
                'You are a staff software engineer reviewing pull requests. Return only valid JSON.',
            },
            {
              role: 'user',
              content: input.prompt,
            },
          ],
        }),
      });
    } catch (error) {
      throw new AiProviderError('OpenRouter request failed', error);
    }

    if (!response.ok) {
      throw new AiProviderError(`OpenRouter returned status ${response.status}`);
    }

    let payload: OpenRouterResponse;
    try {
      payload = (await response.json()) as OpenRouterResponse;
    } catch (error) {
      throw new AiProviderError('OpenRouter returned invalid JSON', error);
    }

    const content = payload.choices?.[0]?.message?.content;
    if (!content) {
      throw new AiProviderError('OpenRouter returned an empty response');
    }

    try {
      return JSON.parse(content) as unknown;
    } catch (error) {
      throw new AiProviderError('OpenRouter returned non-JSON content', error);
    }
  }
}
