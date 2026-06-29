export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <div className="grid-bg absolute inset-0" />
      <div className="glow-orb animate-pulse-glow absolute top-20 left-1/2 h-[500px] w-[800px] -translate-x-1/2" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-light bg-surface-raised px-4 py-1.5 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Powered by OpenRouter · GPT-5.3 Codex
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Ship code with{' '}
            <span className="text-gradient">confidence</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            AI PR Reviewer automatically reviews every GitHub pull request for bugs, security
            flaws, and logic errors — then posts inline comments directly on your PR.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#get-started"
              className="w-full rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-surface transition-all hover:bg-accent-dim hover:shadow-lg hover:shadow-accent/20 sm:w-auto"
            >
              Install GitHub App
            </a>
            <a
              href="#how-it-works"
              className="w-full rounded-xl border border-border-light bg-surface-raised px-8 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:border-accent/40 hover:bg-surface-card sm:w-auto"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="animate-float relative mx-auto mt-20 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-border-light bg-surface-raised shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-danger/80" />
              <div className="h-3 w-3 rounded-full bg-warning/80" />
              <div className="h-3 w-3 rounded-full bg-accent/80" />
              <span className="ml-3 font-mono text-xs text-muted">PR #142 · src/auth.ts</span>
            </div>

            <div className="grid gap-0 md:grid-cols-2">
              <div className="border-b border-border p-5 font-mono text-xs leading-relaxed md:border-r md:border-b-0">
                <div className="text-muted">48</div>
                <div>
                  <span className="text-slate-500">49</span>{' '}
                  <span className="text-slate-300">const user = await getUser(id);</span>
                </div>
                <div className="bg-danger/10">
                  <span className="text-slate-500">50</span>{' '}
                  <span className="text-slate-300">return user.profile.email;</span>
                </div>
                <div className="text-muted">51</div>
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs text-accent">
                    AI
                  </div>
                  <span className="text-xs font-medium text-accent">High · Bug</span>
                </div>
                <p className="text-sm font-medium text-slate-200">Possible null dereference</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  user may be undefined before accessing profile. Add a null check or throw a
                  descriptive error.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
