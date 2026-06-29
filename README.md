# AI PR Reviewer

Production-quality AI-powered GitHub Pull Request reviewer. Automatically reviews PRs for bugs, security issues, performance problems, error handling gaps, and logic errors — then posts inline comments back to GitHub.

Built with **Clean Architecture** in a **Turborepo monorepo** so new review agents, RAG context, and multi-model support can be added without major refactoring.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [System Workflow](#system-workflow)
- [Repository Structure](#repository-structure)
- [Module Responsibilities](#module-responsibilities)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [GitHub App Setup](#github-app-setup)
- [Running Locally](#running-locally)
- [Testing](#testing)
- [Data Contracts](#data-contracts)
- [Error Handling](#error-handling)
- [Project Status](#project-status)
- [Roadmap](#roadmap)

---

## Overview

| Step | What happens |
|------|----------------|
| 1 | User installs the GitHub App on a repository |
| 2 | A pull request is opened or synchronized |
| 3 | GitHub sends a webhook to `apps/github-app` |
| 4 | The app verifies the webhook signature |
| 5 | A review job is pushed to Redis (`review-queue`) |
| 6 | `apps/worker` picks up the job |
| 7 | The worker downloads the PR diff via GitHub API |
| 8 | The diff is sent to OpenRouter (`openai/gpt-5.3-codex`) |
| 9 | The AI returns structured JSON |
| 10 | The worker posts inline review comments on the PR |

The webhook responds immediately. All heavy work runs asynchronously in the worker.

---

## Architecture

The project follows **Clean Architecture**. Dependencies always point inward. Business logic never imports Fastify, Redis, Octokit, Prisma, or the OpenAI/OpenRouter SDK directly.

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
│                                                             │
│   apps/github-app          apps/worker                      │
│   (Fastify webhook)        (BullMQ consumer)              │
│                                                             │
│   Receives HTTP webhooks   Processes review jobs            │
│   Verifies signatures      Orchestrates the review flow     │
│   Enqueues jobs            Posts results to GitHub          │
└──────────────────────────┬──────────────────────────────────┘
                           │ depends on
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                        │
│                                                             │
│   Use cases, dependency injection, job handlers             │
│   Wires domain services to infrastructure implementations   │
└──────────────────────────┬──────────────────────────────────┘
                           │ depends on
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      DOMAIN LAYER                           │
│                                                             │
│   packages/review-engine    packages/parser                 │
│                                                             │
│   ReviewEngine              Diff parsing                    │
│   Prompt builder            Patch → line-annotated hunks    │
│   AI output validation                                      │
│                                                             │
│   No knowledge of HTTP, queues, GitHub, or AI SDKs        │
└──────────────────────────┬──────────────────────────────────┘
                           │ depends on
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  INFRASTRUCTURE LAYER                       │
│                                                             │
│   packages/github           packages/ai                     │
│                                                             │
│   GitHubService (Octokit)   AIProvider (OpenRouter)         │
│   Auth, PR fetch,           reviewPullRequest()             │
│   post review comments                                      │
└──────────────────────────┬──────────────────────────────────┘
                           │ depends on
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                       SHARED CORE                           │
│                                                             │
│   packages/shared                                           │
│                                                             │
│   Domain types, errors, Zod schemas                           │
│   Innermost layer — no external dependencies                │
└─────────────────────────────────────────────────────────────┘
```

### Dependency Rules

| Layer | Can depend on | Cannot depend on |
|-------|---------------|------------------|
| Presentation (`apps/*`) | Application, Domain, Infrastructure, Shared | — |
| Application | Domain, Infrastructure interfaces, Shared | Fastify internals in domain |
| Domain (`review-engine`, `parser`) | Shared only | GitHub, AI, Redis, Prisma, Fastify |
| Infrastructure (`github`, `ai`) | Shared, external SDKs | Apps, Fastify |
| Shared | Zod only | Everything else |

### Key Design Decisions

- **Interfaces over implementations** — `AIProvider`, `GitHubService` are interfaces. Swapping OpenRouter for another model or mocking in tests requires no domain changes.
- **Validation at boundaries** — Webhooks, queue payloads, and AI responses are validated with Zod before entering business logic.
- **Async by default** — Webhooks enqueue jobs and return `200` fast. Reviews run in BullMQ workers.
- **Typed errors** — Every external failure throws a `DomainError` subclass (`GitHubApiError`, `AiProviderError`, etc.), never a raw `Error`.

---

## System Workflow

```
Developer                GitHub              github-app           Redis           worker              OpenRouter
    │                       │                    │                  │                │                    │
    │── open PR ───────────►│                    │                  │                │                    │
    │                       │── webhook POST ───►│                  │                │                    │
    │                       │                    │── verify sig     │                │                    │
    │                       │                    │── enqueue job ──►│                │                    │
    │                       │◄── 200 OK ─────────│                  │                │                    │
    │                       │                    │                  │── dequeue ────►│                    │
    │                       │                    │                  │                │── get PR diff ────►│
    │                       │◄──────────────────────────────────────────────────────│                    │
    │                       │                    │                  │                │── review request ─►│
    │                       │                    │                  │                │◄── JSON response ─│
    │                       │                    │                  │                │── validate output  │
    │                       │◄── inline comments ──────────────────────────────────│                    │
    │◄── review on PR ──────│                    │                  │                │                    │
```

---

## Repository Structure

```
ai-pr-reviewer/
├── apps/
│   ├── github-app/              # Fastify server — webhook receiver
│   └── worker/                  # BullMQ consumer — review processor
│
├── packages/
│   ├── shared/                  # Domain types, errors, Zod schemas
│   ├── parser/                  # Unified diff parser
│   ├── ai/                      # AIProvider interface + OpenRouter client
│   ├── review-engine/           # Prompt builder, ReviewEngine
│   └── github/                  # GitHubService (Octokit wrapper)
│
├── prisma/                      # PostgreSQL schema and migrations
├── docker/                      # Redis + PostgreSQL for local dev
├── .cursor/rules/               # AI coding standards
├── .env.example                 # Environment template
├── package.json                 # Root scripts
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.base.json
```

---

## Module Responsibilities

### `apps/github-app` — Webhook Server

| Responsibility | Detail |
|----------------|--------|
| Receive webhooks | `POST /webhooks/github` |
| Verify signature | HMAC-SHA256 with `GITHUB_WEBHOOK_SECRET` |
| Parse payload | Validate `pull_request` events via Zod |
| Enqueue job | Push to `review-queue` in Redis |
| Respond fast | Return `200` without running AI review |

### `apps/worker` — Review Processor

| Responsibility | Detail |
|----------------|--------|
| Consume jobs | BullMQ worker on `review-queue` |
| Fetch PR data | Authenticate GitHub App, download changed files |
| Run review | Call `ReviewEngine` with parsed diff |
| Post results | Submit inline review comments to GitHub |

### `packages/github` — GitHub Service

The only package allowed to use Octokit.

| Method | Purpose |
|--------|---------|
| Authenticate | Create installation access token |
| Get Pull Request | Fetch PR metadata |
| Get changed files | List files with patches |
| Download file contents | Read file content when needed |
| Post review comments | Submit PR review with inline comments |

### `packages/ai` — AI Provider

The only package allowed to call OpenRouter/OpenAI SDK.

| Method | Purpose |
|--------|---------|
| `reviewPullRequest(input)` | Send prompt, return structured JSON |

### `packages/review-engine` — Review Engine

Pure domain logic. No infrastructure imports.

| Responsibility | Detail |
|----------------|--------|
| Build prompt | Staff-engineer review instructions |
| Call AI | Via `AIProvider` interface |
| Validate output | Zod schema validation |
| Return result | `ReviewResult` with summary + comments |

### `packages/parser` — Diff Parser

| Responsibility | Detail |
|----------------|--------|
| Parse patches | Convert unified diff to line-annotated hunks |
| Map line numbers | Align AI comments to correct PR lines |

### `packages/shared` — Shared Core

| Export | Purpose |
|--------|---------|
| `DomainError` hierarchy | Typed errors for all layers |
| `ReviewInput`, `ReviewResult` | Review workflow types |
| `reviewResponseSchema` | AI output validation |
| `reviewJobPayloadSchema` | Queue job validation |
| `parsePullRequestWebhook` | Webhook payload validation |

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | TypeScript |
| Runtime | Node.js 22+ |
| Package manager | pnpm |
| Monorepo | Turborepo |
| API framework | Fastify |
| Database | PostgreSQL |
| ORM | Prisma |
| Queue | BullMQ |
| Cache / broker | Redis |
| GitHub API | Octokit |
| AI | OpenRouter (`openai/gpt-5.3-codex`) |
| Validation | Zod |
| Logging | Pino |
| Testing | Vitest |
| Linting | ESLint |
| Formatting | Prettier |

---

## Prerequisites

- Node.js 22 or higher
- pnpm 10+
- Docker (for Redis and PostgreSQL locally)
- A GitHub account with permission to create GitHub Apps
- An OpenRouter API key

---

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd ai-pr-reviewer
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your credentials (see [Environment Variables](#environment-variables)).

### 3. Build and test

```bash
pnpm build
pnpm test
```

### 4. Start infrastructure (when docker config is available)

```bash
docker compose -f docker/docker-compose.yml up -d
```

### 5. Run the application (when apps are built)

```bash
pnpm dev
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_APP_ID` | Yes | GitHub App numeric ID |
| `GITHUB_APP_PRIVATE_KEY` | Yes | PEM private key from GitHub App |
| `GITHUB_WEBHOOK_SECRET` | Yes | Secret used to verify webhook signatures |
| `OPENROUTER_API_KEY` | Yes | OpenRouter API key |
| `OPENROUTER_BASE_URL` | No | Default: `https://openrouter.ai/api/v1` |
| `OPENROUTER_MODEL` | No | Default: `openai/gpt-5.3-codex` |
| `REDIS_URL` | Yes | Redis connection string for BullMQ |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `PORT` | No | Webhook server port. Default: `3000` |
| `LOG_LEVEL` | No | Pino log level. Default: `info` |

Example `.env`:

```env
GITHUB_APP_ID=123456
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n..."
GITHUB_WEBHOOK_SECRET=your-strong-secret

OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=openai/gpt-5.3-codex

REDIS_URL=redis://localhost:6379
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_pr_reviewer

PORT=3000
LOG_LEVEL=info
```

Never commit `.env`. It is listed in `.gitignore`.

---

## GitHub App Setup

### Step 1 — Create the app

Go to [Create a new GitHub App](https://github.com/settings/apps/new).

| Field | Value |
|-------|-------|
| GitHub App name | `AI PR Reviewer` (or your choice) |
| Homepage URL | Your app or repo URL |
| Webhook URL | `https://your-domain.com/webhooks/github` |
| Webhook secret | Strong random string → `GITHUB_WEBHOOK_SECRET` |
| Active | Checked |

**Permissions:**

| Permission | Access |
|------------|--------|
| Pull requests | Read & write |
| Contents | Read |
| Metadata | Read |

**Subscribe to events:**

- Pull request

After creation:

1. Copy **App ID** → `GITHUB_APP_ID`
2. Generate and download a **private key** → `GITHUB_APP_PRIVATE_KEY`

### Step 2 — Install the app on a repository

The install option is on the **GitHub App page**, not in repository settings.

1. Go to [https://github.com/settings/apps](https://github.com/settings/apps)
2. Click your app name
3. Click **Install App** in the left sidebar
4. Select your account or organization
5. Choose **All repositories** or **Only select repositories**
6. Click **Install**

Direct link format (replace slug):

```
https://github.com/apps/your-app-slug
```

### Step 3 — Expose webhook locally (development)

GitHub must reach your machine. Use a tunnel:

```bash
ngrok http 3000
```

Set the ngrok URL as your GitHub App webhook:

```
https://abc123.ngrok-free.app/webhooks/github
```

---

## Running Locally

### What works today

```bash
pnpm install
pnpm build
pnpm test
```

Currently only `@ai-pr-reviewer/shared` is implemented. The webhook server and worker are not yet runnable.

### Full local stack (when all packages are built)

```bash
docker compose -f docker/docker-compose.yml up -d
pnpm dev
```

This will start:

| Service | Port | Purpose |
|---------|------|---------|
| `github-app` | 3000 | Webhook receiver |
| `worker` | — | Background review processor |
| Redis | 6379 | Job queue |
| PostgreSQL | 5432 | App database |

### Verify a review

1. Install the GitHub App on a test repository
2. Open or update a pull request
3. Check worker logs for job processing
4. Inline comments should appear on the PR

---

## Testing

```bash
pnpm test
```

Run tests for a single package:

```bash
pnpm --filter @ai-pr-reviewer/shared test
pnpm --filter @ai-pr-reviewer/parser test
pnpm --filter @ai-pr-reviewer/review-engine test
```

### Test coverage targets

| Module | What is tested |
|--------|----------------|
| `shared` | AI response validation, webhook parsing |
| `parser` | Unified diff parsing, line mapping |
| `review-engine` | Prompt builder, review orchestration |
| `ai` | Response parsing (OpenRouter mocked) |

---

## Data Contracts

### Queue job payload (`review-queue`)

```json
{
  "installationId": 12345,
  "owner": "acme",
  "repo": "my-repo",
  "pullNumber": 42
}
```

### AI review response

```json
{
  "summary": "Found two potential issues.",
  "comments": [
    {
      "file": "src/auth.ts",
      "line": 51,
      "severity": "high",
      "category": "bug",
      "title": "Possible null dereference",
      "comment": "user may be undefined before accessing profile."
    }
  ]
}
```

| Field | Values |
|-------|--------|
| `severity` | `low`, `medium`, `high`, `critical` |
| `category` | `bug`, `security`, `performance`, `error-handling`, `logic` |

Invalid AI responses are rejected by Zod validation before posting to GitHub.

### Review scope

The AI reviews for:

- Bugs
- Security issues
- Performance problems
- Error handling issues
- Logic issues

The AI ignores:

- Formatting
- Naming
- Style
- Personal preference

---

## Error Handling

All external failures use typed domain errors from `@ai-pr-reviewer/shared`:

| Error | When thrown |
|-------|-------------|
| `WebhookVerificationError` | Invalid webhook signature |
| `WebhookValidationError` | Malformed webhook payload |
| `QueueError` | Redis/BullMQ failure |
| `GitHubApiError` | GitHub API request failed |
| `AiProviderError` | OpenRouter request failed |
| `AiResponseValidationError` | AI returned invalid JSON |
| `DiffParseError` | Could not parse PR diff |
| `ReviewEngineError` | Unrecoverable review logic error |

Secrets are never logged.

---

## Project Status

### Phase 1 — MVP (in progress)

| Component | Status |
|-----------|--------|
| Monorepo scaffolding | Done |
| `@ai-pr-reviewer/shared` | Done |
| `@ai-pr-reviewer/parser` | Planned |
| `@ai-pr-reviewer/ai` | Planned |
| `@ai-pr-reviewer/review-engine` | Planned |
| `@ai-pr-reviewer/github` | Planned |
| `apps/github-app` | Planned |
| `apps/worker` | Planned |
| `docker/` | Planned |
| `prisma/` | Planned |

---

## Roadmap

| Phase | Features |
|-------|----------|
| **Phase 1** | Webhook → queue → AI review → inline comments |
| **Phase 2** | Multiple review agents, configurable review rules |
| **Phase 3** | Repository context retrieval (RAG) |
| **Phase 4** | Multi-model support, per-repo model selection |
| **Phase 5** | SaaS dashboard, billing, usage analytics |

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all dependencies |
| `pnpm build` | Build all packages |
| `pnpm dev` | Start apps in development mode |
| `pnpm test` | Run all tests |
| `pnpm lint` | Lint all packages |
| `pnpm typecheck` | Type-check all packages |
| `pnpm format` | Format code with Prettier |

---

## License

Private — all rights reserved.
