const layers = [
  {
    name: 'Presentation',
    items: ['github-app', 'worker'],
    description: 'Webhook server and background job processor',
    color: 'border-blue-500/30 bg-blue-500/5',
  },
  {
    name: 'Domain',
    items: ['review-engine', 'parser'],
    description: 'Prompt building, diff parsing, review orchestration',
    color: 'border-accent/30 bg-accent/5',
  },
  {
    name: 'Infrastructure',
    items: ['github', 'ai'],
    description: 'Octokit wrapper and OpenRouter provider',
    color: 'border-purple-500/30 bg-purple-500/5',
  },
  {
    name: 'Shared',
    items: ['types', 'errors', 'schemas'],
    description: 'Domain types, Zod validation, typed errors',
    color: 'border-border-light bg-surface-card',
  },
];

export function Architecture() {
  return (
    <section id="architecture" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Clean architecture</h2>
          <p className="mt-4 text-muted">
            Built for maintainability. Business logic never depends on Fastify, Redis, GitHub, or
            AI SDKs. Swap providers without touching the review engine.
          </p>
        </div>

        <div className="mt-16 space-y-4">
          {layers.map((layer) => (
            <div
              key={layer.name}
              className={`rounded-2xl border p-6 ${layer.color}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">{layer.name}</h3>
                  <p className="mt-1 text-sm text-muted">{layer.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-border-light bg-surface-raised px-3 py-1 font-mono text-xs text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Dependencies always point inward. Ready for multi-agent reviews, RAG, and multi-model
          support.
        </p>
      </div>
    </section>
  );
}
