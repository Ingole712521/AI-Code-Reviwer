function ReviewsChartVisual() {
  return (
    <div className="bento-visual mt-auto rounded-xl border border-border/60 bg-surface-raised/80 p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted">Reviews this week</p>
          <p className="mt-1 text-2xl font-bold text-slate-100">248</p>
        </div>
        <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
          +18%
        </span>
      </div>
      <svg className="mt-4 h-28 w-full" viewBox="0 0 320 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 80 L40 65 L80 70 L120 45 L160 50 L200 30 L240 35 L280 15 L320 20 L320 100 L0 100 Z"
          fill="url(#chartFill)"
        />
        <path
          d="M0 80 L40 65 L80 70 L120 45 L160 50 L200 30 L240 35 L280 15 L320 20"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          className="bento-chart-line"
        />
        <circle cx="200" cy="30" r="4" fill="#10b981" className="bento-chart-dot" />
      </svg>
      <p className="mt-2 text-center text-[10px] text-muted">Mon · Tue · Wed · Thu · Fri · Sat · Sun</p>
    </div>
  );
}

function IssueTrackingVisual() {
  const items = [
    { label: 'Bugs caught', value: '84', change: '+12%', color: 'text-danger' },
    { label: 'Security issues', value: '31', change: '+8%', color: 'text-warning' },
    { label: 'Logic errors', value: '52', change: '+5%', color: 'text-accent' },
  ];

  return (
    <div className="bento-visual mt-auto space-y-2">
      <div className="rounded-xl border border-border/60 bg-surface-raised/80 p-4">
        <p className="text-xs text-muted">Issues flagged</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-100">167</span>
          <span className="text-xs font-medium text-accent">+11%</span>
        </div>
      </div>
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between rounded-xl border border-border/60 bg-surface-raised/60 px-4 py-3 transition-colors hover:border-accent/20"
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-surface-card" />
            <span className="text-sm text-slate-300">{item.label}</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-100">{item.value}</p>
            <p className={`text-xs ${item.color}`}>{item.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SecurityVisual() {
  return (
    <div className="bento-visual relative mt-auto flex min-h-[200px] items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-surface-raised/80">
      <div className="bento-shield-glow absolute inset-0" />
      <div className="absolute inset-0 opacity-20">
        {['1', '0', '1', '1', '0', '1', '0', '0', '1', '1', '0', '1', '0', '1', '1', '0', '1', '0', '1', '1', '0', '0', '1', '0', '1', '1', '0', '1', '0', '1', '1', '0', '1', '0', '0', '1', '1', '0', '1', '0', '1', '1', '0', '1', '0', '1', '0', '0'].map(
          (digit, index) => (
            <span
              key={index}
              className="absolute font-mono text-[10px] text-muted"
              style={{ top: `${(index % 6) * 18 + 10}%`, left: `${Math.floor(index / 6) * 12 + 5}%` }}
            >
              {digit}
            </span>
          ),
        )}
      </div>
      <svg
        className="relative z-10 h-28 w-28 text-slate-200 drop-shadow-[0_0_30px_#10b98155]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M12 2l8 4v6c0 5-3.5 9-8 10C7.5 21 4 17 4 12V6l8-4z"
          className="bento-shield-pulse"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4"
          className="text-accent"
          stroke="currentColor"
        />
      </svg>
    </div>
  );
}

function IntegrationVisual() {
  const leftNodes = ['GH', 'API', 'PR'];
  const rightNodes = ['AI', 'MQ', 'DB'];

  return (
    <div className="bento-visual relative mt-auto flex min-h-[200px] items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-surface-raised/80 p-6">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <line x1="22%" y1="35%" x2="50%" y2="50%" stroke="#2a2a3d" strokeWidth="1" />
        <line x1="22%" y1="50%" x2="50%" y2="50%" stroke="#2a2a3d" strokeWidth="1" />
        <line x1="22%" y1="65%" x2="50%" y2="50%" stroke="#2a2a3d" strokeWidth="1" />
        <line x1="78%" y1="35%" x2="50%" y2="50%" stroke="#2a2a3d" strokeWidth="1" />
        <line x1="78%" y1="50%" x2="50%" y2="50%" stroke="#2a2a3d" strokeWidth="1" />
        <line x1="78%" y1="65%" x2="50%" y2="50%" stroke="#2a2a3d" strokeWidth="1" />
      </svg>

      <div className="absolute left-[10%] flex flex-col gap-3">
        {leftNodes.map((node) => (
          <div
            key={node}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-light bg-surface-card text-[10px] font-bold text-muted"
          >
            {node}
          </div>
        ))}
      </div>

      <div className="relative z-10 rounded-full border border-accent/40 bg-accent/10 px-5 py-2 text-sm font-semibold text-accent shadow-lg shadow-accent/10">
        Revio
      </div>

      <div className="absolute right-[10%] flex flex-col gap-3">
        {rightNodes.map((node) => (
          <div
            key={node}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-light bg-surface-card text-[10px] font-bold text-muted"
          >
            {node}
          </div>
        ))}
      </div>
    </div>
  );
}

const bentoCards = [
  {
    title: 'Real-time PR insights',
    description:
      'Get instant AI analysis on every pull request. Track review volume and catch issues before they merge.',
    visual: <ReviewsChartVisual />,
  },
  {
    title: 'Automated issue detection',
    description:
      'Bugs, security flaws, and logic errors are categorized automatically — no manual triage needed.',
    visual: <IssueTrackingVisual />,
  },
  {
    title: 'Secure by design',
    description:
      'Webhook signatures verified, secrets never logged, and GitHub App permissions scoped to the minimum required.',
    visual: <SecurityVisual />,
  },
  {
    title: 'Seamless GitHub integration',
    description:
      'Install once and Revio connects to your repos, queue, worker, and AI provider without disrupting your workflow.',
    visual: <IntegrationVisual />,
  },
];

export function About() {
  return (
    <section id="about" className="page-section relative overflow-hidden border-t border-border bg-surface py-24">
      <div className="bento-particles pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-border-light bg-surface-raised px-4 py-1.5 text-xs font-medium text-muted">
            About us
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl lg:text-5xl">
            Essential tools for smarter code reviews
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Revio gives your team AI-powered pull request reviews that fit directly into GitHub —
            helping you ship faster with fewer bugs and security risks.
          </p>
        </div>

        <div className="bento-grid mt-16">
          {bentoCards.map((card) => (
            <article
              key={card.title}
              className="bento-card group"
            >
              <h3 className="text-lg font-semibold text-slate-100 sm:text-xl">{card.title}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{card.description}</p>
              {card.visual}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
