import { OpenRouterProvider } from '@ai-pr-reviewer/ai';
import { OctokitGitHubService } from '@ai-pr-reviewer/github';
import { ReviewEngine } from '@ai-pr-reviewer/review-engine';
import type { ReviewJobPayload } from '@ai-pr-reviewer/shared';
import type { WorkerConfig } from './config.js';

export function createReviewProcessor(config: WorkerConfig) {
  const githubService = new OctokitGitHubService({
    appId: config.GITHUB_APP_ID,
    privateKey: config.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, '\n'),
  });

  const aiProvider = new OpenRouterProvider({
    apiKey: config.OPENROUTER_API_KEY,
    baseUrl: config.OPENROUTER_BASE_URL,
    model: config.OPENROUTER_MODEL,
  });

  const reviewEngine = new ReviewEngine(aiProvider);

  return async (job: ReviewJobPayload) => {
    const files = await githubService.getPullRequestFiles(job);

    const result = await reviewEngine.review({
      repository: {
        installationId: job.installationId,
        owner: job.owner,
        repo: job.repo,
      },
      pullNumber: job.pullNumber,
      files,
    });

    await githubService.submitPullRequestReview(job, result);
  };
}
