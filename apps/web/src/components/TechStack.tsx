const technologies = [
  'TypeScript',
  'Node.js 22',
  'Fastify',
  'BullMQ',
  'Redis',
  'PostgreSQL',
  'Prisma',
  'Octokit',
  'OpenRouter',
  'Zod',
  'Vitest',
  'Turborepo',
];

export function TechStack() {
  return (
    <section className="border-t border-border bg-surface-raised py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Tech stack</h2>
          <p className="mt-4 text-muted">
            Production-grade tooling chosen for reliability, testability, and scale.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-xl border border-border bg-surface-card px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-accent/30 hover:text-white"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
