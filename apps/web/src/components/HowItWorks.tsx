const steps = [
  {
    step: '01',
    title: 'Install the GitHub App',
    description: 'Add Revio to your org or personal account and select repositories.',
  },
  {
    step: '02',
    title: 'Open a pull request',
    description: 'When a PR is opened or updated, GitHub sends a signed webhook to our server.',
  },
  {
    step: '03',
    title: 'AI reviews the diff',
    description:
      'A background worker fetches changed files, sends the diff to GPT-5.3 Codex via OpenRouter.',
  },
  {
    step: '04',
    title: 'Comments appear on PR',
    description:
      'Structured findings are posted as inline review comments with severity and category.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
          <p className="mt-4 text-muted">
            From webhook to inline comment in under a minute. Fully automated, zero config per PR.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute top-8 left-8 hidden h-[calc(100%-4rem)] w-px bg-border-light lg:block" />

          <div className="space-y-8">
            {steps.map((item) => (
              <div key={item.step} className="relative flex gap-8">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-border-light bg-surface-raised font-mono text-sm font-bold text-accent">
                  {item.step}
                </div>
                <div className="rounded-2xl border border-border bg-surface-card p-6 flex-1">
                  <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
