import { HeroBackground } from './HeroBackground';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <HeroBackground />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="hero-stagger mx-auto max-w-3xl text-center">
          <div className="hero-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border-light bg-surface-raised px-4 py-1.5 text-xs text-muted">
            <span className="hero-dot-pulse h-1.5 w-1.5 rounded-full bg-accent" />
            Powered by OpenRouter · GPT-5.3 Codex
          </div>

          <h1 className="hero-fade-up text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Ship code with{' '}
            <span className="text-gradient-animated">confidence</span>
          </h1>

          <p className="hero-fade-up mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            Revio automatically reviews every GitHub pull request for bugs, security
            flaws, and logic errors — then posts inline comments directly on your PR.
          </p>

          <div className="hero-fade-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#get-started"
              className="hero-btn-primary w-full rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-surface sm:w-auto"
            >
              Install GitHub App
            </a>
            <a
              href="#how-it-works"
              className="hero-btn-secondary w-full rounded-xl border border-border-light bg-surface-raised px-8 py-3.5 text-sm font-semibold text-slate-200 sm:w-auto"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="hero-card-enter relative mx-auto mt-20 max-w-4xl">
          <div className="hero-card-shine pointer-events-none absolute -inset-px rounded-2xl" />
          <div className="animate-float relative overflow-hidden rounded-2xl border border-border-light bg-surface-raised shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-danger/80" />
              <div className="h-3 w-3 rounded-full bg-warning/80" />
              <div className="h-3 w-3 rounded-full bg-accent/80" />
              <span className="ml-3 font-mono text-xs text-muted">PR #142 · src/auth.ts</span>
              <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-accent">
                <span className="hero-dot-pulse h-1 w-1 rounded-full bg-accent" />
                reviewing
              </span>
            </div>

            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative border-b border-border p-5 font-mono text-xs leading-relaxed md:border-r md:border-b-0">
                <div className="hero-scan-line" />
                <div className="text-muted">48</div>
                <div>
                  <span className="text-slate-500">49</span>{' '}
                  <span className="text-slate-300">const user = await getUser(id);</span>
                </div>
                <div className="hero-line-highlight bg-danger/10">
                  <span className="text-slate-500">50</span>{' '}
                  <span className="text-slate-300">return user.profile.email;</span>
                </div>
                <div className="text-muted">51</div>
              </div>

              <div className="hero-comment-enter p-5">
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
