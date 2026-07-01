import type { ReviewInput } from '@ai-pr-reviewer/shared';
import { formatParsedFileForPrompt, parseFilePatch } from '@ai-pr-reviewer/parser';

export function buildReviewPrompt(input: ReviewInput): string {
  const fileSections = input.files
    .filter((file) => file.patch)
    .map((file) => formatParsedFileForPrompt(parseFilePatch(file.filename, file.patch)));

  const diffBlock = fileSections.length > 0 ? fileSections.join('\n\n') : 'No diff available.';

  return [
    'Review this pull request as a staff software engineer.',
    'Report only bugs, security issues, performance problems, error handling issues, and logic issues.',
    'Ignore formatting, naming, style, and personal preference.',
    'Return only JSON with this shape:',
    '{"summary":"...","comments":[{"file":"path","line":1,"severity":"low|medium|high|critical","category":"bug|security|performance|error-handling|logic","title":"...","comment":"..."}]}',
    `Repository: ${input.repository.owner}/${input.repository.repo}`,
    `Pull request: #${input.pullNumber}`,
    'Diff:',
    diffBlock,
  ].join('\n\n');
}
