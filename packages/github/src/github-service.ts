import type { PullRequestFile, ReviewJobPayload, ReviewResult } from '@ai-pr-reviewer/shared';

export interface GitHubAppConfig {
  readonly appId: string;
  readonly privateKey: string;
}

export interface GitHubService {
  getPullRequestFiles(job: ReviewJobPayload): Promise<PullRequestFile[]>;
  submitPullRequestReview(job: ReviewJobPayload, result: ReviewResult): Promise<void>;
}
