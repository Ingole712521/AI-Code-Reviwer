import type { ReviewComment, ReviewSeverity, ReviewCategory } from '../../schemas/review-response.schema.js';

export interface RepositoryRef {
  readonly installationId: number;
  readonly owner: string;
  readonly repo: string;
}

export interface ReviewJobPayload extends RepositoryRef {
  readonly pullNumber: number;
  readonly headSha: string;
}

export interface PullRequestFile {
  readonly filename: string;
  readonly status: 'added' | 'modified' | 'removed' | 'renamed' | 'copied' | 'changed';
  readonly patch?: string;
  readonly additions: number;
  readonly deletions: number;
  readonly changes: number;
}

export interface ReviewInput {
  readonly repository: RepositoryRef;
  readonly pullNumber: number;
  readonly files: readonly PullRequestFile[];
}

export interface ReviewResult {
  readonly summary: string;
  readonly comments: readonly ReviewComment[];
}

export type { ReviewCategory, ReviewComment, ReviewSeverity };
