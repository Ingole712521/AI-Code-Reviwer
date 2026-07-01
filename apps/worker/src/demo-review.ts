import './load-env.js';
import { OpenRouterProvider } from '@ai-pr-reviewer/ai';
import { ReviewEngine } from '@ai-pr-reviewer/review-engine';
import type { ReviewComment, ReviewInput } from '@ai-pr-reviewer/shared';

const samplePullRequest: ReviewInput = {
  repository: {
    installationId: 1,
    owner: 'demo-org',
    repo: 'payments-api',
  },
  pullNumber: 42,
  files: [
    {
      filename: 'src/auth/login.ts',
      status: 'modified',
      additions: 8,
      deletions: 6,
      changes: 14,
      patch: `@@ -10,14 +10,16 @@ export async function login(email: string, password: string) {
   const user = await db.user.findByEmail(email);
   if (!user) {
     return null;
   }
-  const valid = await bcrypt.compare(password, user.passwordHash);
-  if (!valid) {
-    return null;
-  }
+  if (password === user.passwordHash) {
+    return createSession(user.id);
+  }
+  console.log('Failed login', email, password);
   return createSession(user.id);
 }`,
    },
    {
      filename: 'src/api/transfer.ts',
      status: 'modified',
      additions: 5,
      deletions: 2,
      changes: 7,
      patch: `@@ -22,8 +22,11 @@ export async function transfer(fromId: string, toId: string, amount: number) {
   if (amount <= 0) {
     throw new Error('Amount must be positive');
   }
-  await db.transaction(async (tx) => {
-    await tx.debit(fromId, amount);
-    await tx.credit(toId, amount);
-  });
+  await db.debit(fromId, amount);
+  await db.credit(toId, amount);
 }`,
    },
  ],
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name} in .env`);
  }
  return value;
}

function formatComment(comment: ReviewComment): string {
  return [
    `  ${comment.file}:${comment.line}`,
    `  [${comment.severity}] ${comment.category} — ${comment.title}`,
    `  ${comment.comment}`,
  ].join('\n');
}

async function main() {
  const aiProvider = new OpenRouterProvider({
    apiKey: requireEnv('OPENROUTER_API_KEY'),
    baseUrl: process.env.OPENROUTER_BASE_URL ?? 'https://openrouter.ai/api/v1',
    model: process.env.OPENROUTER_MODEL ?? 'openai/gpt-5.3-codex',
  });

  const reviewEngine = new ReviewEngine(aiProvider);

  console.log('');
  console.log('Revio — live review demo');
  console.log('========================');
  console.log(`Repository: ${samplePullRequest.repository.owner}/${samplePullRequest.repository.repo}`);
  console.log(`Pull request: #${samplePullRequest.pullNumber}`);
  console.log(`Files: ${samplePullRequest.files.map((file) => file.filename).join(', ')}`);
  console.log('');
  console.log('Calling AI reviewer...');
  console.log('');

  const result = await reviewEngine.review(samplePullRequest);

  console.log('Summary');
  console.log('-------');
  console.log(result.summary);
  console.log('');

  if (result.comments.length === 0) {
    console.log('No inline comments returned.');
    return;
  }

  console.log(`Inline comments (${result.comments.length})`);
  console.log('----------------');
  for (const comment of result.comments) {
    console.log(formatComment(comment));
    console.log('');
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
