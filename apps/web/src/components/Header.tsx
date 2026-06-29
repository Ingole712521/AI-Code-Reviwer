const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Docs', href: 'https://github.com' },
];

export function Header() {
  return (
    <header className="pointer-events-none fixed top-0 z-50 w-full px-4 pt-4 sm:px-6 sm:pt-5">
      <div className="pointer-events-auto mx-auto flex h-14 max-w-4xl items-center justify-between rounded-2xl border border-border-light/80 bg-surface-raised/75 px-4 shadow-xl shadow-black/30 backdrop-blur-xl sm:h-16 sm:px-6">
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 ring-1 ring-accent/30">
            <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight">AI PR Reviewer</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#get-started"
            className="hidden rounded-xl bg-accent px-4 py-2 text-sm font-medium text-surface transition-colors hover:bg-accent-dim sm:inline-block"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
