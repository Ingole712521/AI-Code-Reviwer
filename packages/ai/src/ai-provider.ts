export interface AiReviewRequest {
  readonly prompt: string;
}

export interface AIProvider {
  reviewPullRequest(input: AiReviewRequest): Promise<unknown>;
}

export interface OpenRouterConfig {
  readonly apiKey: string;
  readonly baseUrl: string;
  readonly model: string;
}
