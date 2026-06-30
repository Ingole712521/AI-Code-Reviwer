import { LogoAnimated } from './LogoAnimated';
import { BrandName } from './BrandName';

const footerLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Get started', href: '#get-started' },
];

const resourceLinks = [
  { label: 'Create GitHub App', href: 'https://github.com/settings/apps/new', external: true },
  { label: 'Install App', href: 'https://github.com/settings/apps', external: true },
  { label: 'OpenRouter', href: 'https://openrouter.ai/', external: true },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-8 border-t border-border bg-surface-raised">
      <div className="footer-glow pointer-events-none absolute inset-x-0 top-0 h-px" />

      <div className="mx-auto max-w-6xl px-6 pt-16 pb-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#home" className="inline-flex items-center gap-3">
              <LogoAnimated />
              <BrandName size="lg" showTagline />
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Revio delivers intelligent GitHub pull request reviews powered by AI. Catch bugs and
              security issues before they reach production.
            </p>

            <a
              href="https://www.nehalingole.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-creator-card group mt-6 inline-flex items-center gap-3 rounded-xl border border-border-light bg-surface-card px-4 py-3 transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10"
            >
              <img
                src="/profile.jpg"
                alt="Nehal Ingole"
                className="h-10 w-10 rounded-full border-2 border-accent/30 object-cover transition-transform group-hover:scale-110 group-hover:border-accent/60"
              />
              <div className="text-left">
                <p className="text-xs text-muted">Created by</p>
                <p className="text-sm font-semibold text-slate-100 transition-colors group-hover:text-accent">
                  Nehal Ingole
                </p>
              </div>
              <svg
                className="ml-2 h-4 w-4 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-link group flex items-center gap-2 text-sm text-muted">
                    <span className="footer-link-dot h-1 w-1 rounded-full bg-accent opacity-0 transition-all group-hover:opacity-100" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link group flex items-center gap-2 text-sm text-muted"
                  >
                    <span className="footer-link-dot h-1 w-1 rounded-full bg-accent opacity-0 transition-all group-hover:opacity-100" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 sm:flex-row">
          <p className="text-center text-sm text-muted sm:text-left">
            © {new Date().getFullYear()}{' '}
            <span className="font-semibold text-slate-200">Revio</span>
            {' · '}Complete project by{' '}
            <a
              href="https://www.nehalingole.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent transition-colors hover:text-emerald-300"
            >
              Nehal Ingole
            </a>
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://www.nehalingole.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="Nehal Ingole Portfolio"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </a>

            <a
              href="https://github.com/settings/apps/new"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="GitHub"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="footer-back-top group flex items-center gap-2 rounded-xl border border-border-light bg-surface-card px-4 py-2 text-sm text-muted transition-all hover:border-accent/40 hover:text-white"
            >
              Back to top
              <svg
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
