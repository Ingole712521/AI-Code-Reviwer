# AI PR Reviewer

Production-quality AI-powered GitHub Pull Request reviewer built with Clean Architecture.

## Architecture

```
Presentation (apps/github-app, apps/worker)
        ↓
Application (orchestration, use cases)
        ↓
Domain (review-engine, parser)
        ↓
Infrastructure (github, ai packages)
        ↓
Shared (types, errors, schemas)
```

## Tech Stack

- **Runtime:** Node.js 22+
- **Monorepo:** Turborepo + pnpm
- **API:** Fastify
- **Queue:** BullMQ + Redis
- **Database:** PostgreSQL + Prisma
- **AI:** OpenAI Responses API (GPT-5.5)
- **Testing:** Vitest

## Getting Started

```bash
pnpm install
pnpm build
pnpm test
```

## Project Status

**Phase 1 — In Progress**

- [x] Monorepo scaffolding (Turborepo, pnpm, TypeScript, ESLint, Prettier)
- [x] `@ai-pr-reviewer/shared` — domain errors, types, Zod schemas
- [ ] `@ai-pr-reviewer/parser` — diff parsing
- [ ] `@ai-pr-reviewer/ai` — OpenAI provider
- [ ] `@ai-pr-reviewer/review-engine` — review orchestration
- [ ] `@ai-pr-reviewer/github` — GitHub API service
- [ ] `apps/github-app` — webhook receiver
- [ ] `apps/worker` — review job processor

## Repository Structure

```
ai-pr-reviewer/
├── apps/
│   ├── github-app/     # Fastify webhook server
│   └── worker/         # BullMQ job consumer
├── packages/
│   ├── ai/             # AIProvider interface + OpenAI implementation
│   ├── github/         # GitHub service (Octokit wrapper)
│   ├── review-engine/  # Prompt builder + review orchestration
│   ├── parser/         # Unified diff parser
│   └── shared/         # Domain types, errors, schemas
├── prisma/             # Database schema
└── docker/             # Local dev infrastructure
```
