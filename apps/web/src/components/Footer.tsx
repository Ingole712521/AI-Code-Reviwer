const footerLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Get started', href: '#get-started' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-raised py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15 ring-1 ring-accent/30">
              <svg className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold">AI PR Reviewer</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-sm text-muted">
            © {new Date().getFullYear()} AI PR Reviewer
          </p>
        </div>
      </div>
    </footer>
  );
}
