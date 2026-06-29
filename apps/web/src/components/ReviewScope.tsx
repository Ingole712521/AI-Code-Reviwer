const reviews = [
  { label: 'Bugs', color: 'text-danger', bg: 'bg-danger/10 border-danger/20' },
  { label: 'Security', color: 'text-warning', bg: 'bg-warning/10 border-warning/20' },
  { label: 'Performance', color: 'text-accent', bg: 'bg-accent/10 border-accent/20' },
  { label: 'Error handling', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' },
  { label: 'Logic issues', color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20' },
];

const ignores = ['Formatting', 'Naming conventions', 'Code style', 'Personal preference'];

export function ReviewScope() {
  return (
    <section className="border-t border-border bg-surface-raised py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What it reviews</h2>
            <p className="mt-4 text-muted leading-relaxed">
              Staff-engineer level analysis focused on issues that actually matter. Every finding
              includes severity, category, file, and line number.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {reviews.map((item) => (
                <span
                  key={item.label}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium ${item.bg} ${item.color}`}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface-card p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Intentionally ignores
            </h3>
            <ul className="mt-6 space-y-4">
              {ignores.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-400">
                  <svg className="h-4 w-4 shrink-0 text-border-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border border-border bg-surface-raised p-4 font-mono text-xs text-muted">
              <span className="text-accent">{'{'}</span>
              <br />
              &nbsp;&nbsp;"severity": <span className="text-warning">"high"</span>,
              <br />
              &nbsp;&nbsp;"category": <span className="text-blue-400">"security"</span>,
              <br />
              &nbsp;&nbsp;"file": <span className="text-slate-300">"src/auth.ts"</span>,
              <br />
              &nbsp;&nbsp;"line": <span className="text-purple-400">51</span>
              <br />
              <span className="text-accent">{'}'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
