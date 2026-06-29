# @ai-pr-reviewer/shared

Shared domain primitives used across all packages in the AI PR Reviewer monorepo.

## Responsibility

This package is the **innermost layer** of the architecture. It contains:

- **Domain errors** — typed error classes (`GitHubApiError`, `AiProviderError`, etc.) so infrastructure code never throws generic `Error` objects
- **Domain types** — cross-cutting interfaces like `ReviewInput`, `ReviewResult`, and `ReviewJobPayload`
- **Zod schemas** — runtime validation for webhooks, queue payloads, and AI responses

## Why It Exists

In Clean Architecture, inner layers must not depend on outer layers. By centralizing types, errors, and validation schemas here, every other package (`github`, `ai`, `review-engine`, `parser`, apps) can share a common vocabulary without creating circular dependencies.

Infrastructure packages implement interfaces; this package defines the contracts and data shapes those implementations must honor.

## Public API

| Export | Purpose |
|--------|---------|
| `DomainError` and subclasses | Structured, domain-specific errors |
| `ReviewInput`, `ReviewResult`, `PullRequestFile` | Review workflow data types |
| `reviewResponseSchema`, `parseReviewResponse` | AI output validation |
| `reviewJobPayloadSchema` | BullMQ job payload validation |
| `parsePullRequestWebhook` | GitHub webhook payload validation |

## Testing

```bash
pnpm --filter @ai-pr-reviewer/shared test
```

Tests cover AI response validation and webhook payload parsing — the two highest-risk validation boundaries.
