import { HeroBackground } from './HeroBackground';

export function Hero() {
  return (
    <section
      id="home"
      className="hero-screen page-section relative isolate flex flex-col overflow-hidden pt-20 sm:pt-24"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-10">
        <div className="hero-stagger mx-auto w-full max-w-3xl text-center">
          <div className="hero-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-border-light bg-surface-raised px-4 py-1.5 text-xs text-muted">
            <span className="hero-dot-pulse h-1.5 w-1.5 rounded-full bg-accent" />
            Powered by OpenRouter · GPT-5.3 Codex
          </div>

          <h1 className="hero-fade-up text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Ship code with{' '}
            <span className="text-gradient-animated">confidence</span>
          </h1>

          <p className="hero-fade-up mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Revio automatically reviews every GitHub pull request for bugs, security
            flaws, and logic errors — then posts inline comments directly on your PR.
          </p>

          <div className="hero-fade-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="#get-started"
              className="hero-btn-primary w-full rounded-xl bg-accent px-8 py-3 text-sm font-semibold text-surface sm:w-auto"
            >
              Install GitHub App
            </a>
            <a
              href="#how-it-works"
              className="hero-btn-secondary w-full rounded-xl border border-border-light bg-surface-raised px-8 py-3 text-sm font-semibold text-slate-200 sm:w-auto"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="hero-card-enter relative z-10 mx-auto mt-8 w-full max-w-3xl sm:mt-10">
          <div className="hero-card-shine pointer-events-none absolute -inset-px rounded-2xl" />
          <div className="hero-card-float relative overflow-hidden rounded-2xl border border-border-light bg-surface-raised shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 border-b border-border px-3 py-2.5 sm:px-4 sm:py-3">
              <div className="h-2.5 w-2.5 rounded-full bg-danger/80 sm:h-3 sm:w-3" />
              <div className="h-2.5 w-2.5 rounded-full bg-warning/80 sm:h-3 sm:w-3" />
              <div className="h-2.5 w-2.5 rounded-full bg-accent/80 sm:h-3 sm:w-3" />
              <span className="ml-2 font-mono text-[10px] text-muted sm:ml-3 sm:text-xs">
                PR #142 · src/auth.ts
              </span>
              <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-accent">
                <span className="hero-dot-pulse h-1 w-1 rounded-full bg-accent" />
                reviewing
              </span>
            </div>

            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative border-b border-border p-3 font-mono text-[10px] leading-relaxed sm:p-4 sm:text-xs md:border-r md:border-b-0">
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

              <div className="hero-comment-enter p-3 sm:p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-[10px] text-accent sm:h-6 sm:w-6 sm:text-xs">
                    AI
                  </div>
                  <span className="text-[10px] font-medium text-accent sm:text-xs">High · Bug</span>
                </div>
                <p className="text-xs font-medium text-slate-200 sm:text-sm">
                  Possible null dereference
                </p>
                <p className="mt-1.5 text-[10px] leading-relaxed text-muted sm:mt-2 sm:text-xs">
                  user may be undefined before accessing profile. Add a null check or throw a
                  descriptive error.
                </p>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#features"
          className="hero-fade-up mx-auto mt-8 flex flex-col items-center gap-2 text-muted transition-colors hover:text-accent"
          aria-label="Scroll to features"
        >
          <span className="text-xs">Scroll to explore</span>
          <svg
            className="hero-scroll-hint h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
