export abstract class DomainError extends Error {
  abstract readonly code: string;

  constructor(
    message: string,
    override readonly cause?: unknown,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class AiProviderError extends DomainError {
  readonly code = 'AI_PROVIDER_ERROR';
}

export class AiResponseValidationError extends DomainError {
  readonly code = 'AI_RESPONSE_VALIDATION_ERROR';

  constructor(
    message: string,
    readonly validationErrors: readonly string[],
    cause?: unknown,
  ) {
    super(message, cause);
  }
}

export class GitHubApiError extends DomainError {
  readonly code = 'GITHUB_API_ERROR';

  constructor(
    message: string,
    readonly statusCode?: number,
    cause?: unknown,
  ) {
    super(message, cause);
  }
}

export class WebhookVerificationError extends DomainError {
  readonly code = 'WEBHOOK_VERIFICATION_ERROR';
}

export class WebhookValidationError extends DomainError {
  readonly code = 'WEBHOOK_VALIDATION_ERROR';

  constructor(
    message: string,
    readonly validationErrors: readonly string[],
    cause?: unknown,
  ) {
    super(message, cause);
  }
}

export class QueueError extends DomainError {
  readonly code = 'QUEUE_ERROR';
}

export class DiffParseError extends DomainError {
  readonly code = 'DIFF_PARSE_ERROR';
}

export class ReviewEngineError extends DomainError {
  readonly code = 'REVIEW_ENGINE_ERROR';
}
