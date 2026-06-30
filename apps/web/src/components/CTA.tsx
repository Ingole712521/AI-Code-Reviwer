export function CTA() {
  return (
    <section id="get-started" className="page-section py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-surface-card p-12 text-center sm:p-16">
          <div className="glow-orb absolute inset-0 opacity-50" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to review smarter?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Install the GitHub App on your repository and get AI-powered inline reviews on every
              pull request.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://github.com/settings/apps/new"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-surface transition-all hover:bg-accent-dim hover:shadow-lg hover:shadow-accent/20 sm:w-auto"
              >
                Create GitHub App
              </a>
              <a
                href="https://github.com/settings/apps"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl border border-border-light px-8 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:border-accent/40 sm:w-auto"
              >
                Install on repo
              </a>
            </div>

            <p className="mt-8 font-mono text-xs text-muted">
              pnpm --filter @ai-pr-reviewer/web dev
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
