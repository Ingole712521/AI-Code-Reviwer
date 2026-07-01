import { createAppAuth } from '@octokit/auth-app';
import { Octokit } from '@octokit/rest';
import {
  GitHubApiError,
  type PullRequestFile,
  type ReviewComment,
  type ReviewJobPayload,
  type ReviewResult,
} from '@ai-pr-reviewer/shared';
import type { GitHubAppConfig, GitHubService } from './github-service.js';

function mapFileStatus(
  status: string,
): PullRequestFile['status'] {
  if (
    status === 'added' ||
    status === 'modified' ||
    status === 'removed' ||
    status === 'renamed' ||
    status === 'copied' ||
    status === 'changed'
  ) {
    return status;
  }
  return 'changed';
}

function formatReviewComment(comment: ReviewComment): string {
  return `**[${comment.severity}] ${comment.category}: ${comment.title}**\n\n${comment.comment}`;
}

export class OctokitGitHubService implements GitHubService {
  constructor(private readonly config: GitHubAppConfig) {}

  private async createInstallationClient(installationId: number): Promise<Octokit> {
    try {
      const auth = createAppAuth({
        appId: this.config.appId,
        privateKey: this.config.privateKey.replace(/\\n/g, '\n'),
      });

      const installationAuth = await auth({
        type: 'installation',
        installationId,
      });

      return new Octokit({ auth: installationAuth.token });
    } catch (error) {
      throw new GitHubApiError('Failed to authenticate GitHub App installation', undefined, error);
    }
  }

  async getPullRequestFiles(job: ReviewJobPayload): Promise<PullRequestFile[]> {
    const octokit = await this.createInstallationClient(job.installationId);

    try {
      const response = await octokit.rest.pulls.listFiles({
        owner: job.owner,
        repo: job.repo,
        pull_number: job.pullNumber,
        per_page: 100,
      });

      return response.data.map((file) => {
        const mapped: PullRequestFile = {
          filename: file.filename,
          status: mapFileStatus(file.status),
          additions: file.additions,
          deletions: file.deletions,
          changes: file.changes,
        };

        if (file.patch !== undefined) {
          return { ...mapped, patch: file.patch };
        }

        return mapped;
      });
    } catch (error) {
      const statusCode =
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        typeof error.status === 'number'
          ? error.status
          : undefined;

      throw new GitHubApiError('Failed to fetch pull request files', statusCode, error);
    }
  }

  async submitPullRequestReview(job: ReviewJobPayload, result: ReviewResult): Promise<void> {
    const octokit = await this.createInstallationClient(job.installationId);

    try {
      await octokit.rest.pulls.createReview({
        owner: job.owner,
        repo: job.repo,
        pull_number: job.pullNumber,
        event: 'COMMENT',
        body: result.summary,
        comments: result.comments.map((comment) => ({
          path: comment.file,
          line: comment.line,
          body: formatReviewComment(comment),
        })),
      });
    } catch (error) {
      const statusCode =
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        typeof error.status === 'number'
          ? error.status
          : undefined;

      throw new GitHubApiError('Failed to submit pull request review', statusCode, error);
    }
  }
}
