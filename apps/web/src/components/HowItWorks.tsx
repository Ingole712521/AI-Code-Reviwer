import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const heading = section.querySelector('.how-it-works-heading');
      const headingItems = heading?.children;

      if (headingItems) {
        gsap.from(headingItems, {
          scrollTrigger: {
            trigger: heading,
            start: 'top 82%',
          },
          y: 50,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
        });
      }

      const timelineLine = section.querySelector('.how-it-works-line');
      if (timelineLine) {
        gsap.from(timelineLine, {
          scrollTrigger: {
            trigger: section.querySelector('.how-it-works-cards'),
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: 1.2,
          },
          scaleY: 0,
          transformOrigin: 'top center',
        });
      }

      const cards = gsap.utils.toArray<HTMLElement>('.how-it-works-card');

      cards.forEach((card) => {
        const badge = card.querySelector('.how-it-works-badge');
        const content = card.querySelector('.how-it-works-content');

        const cardTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
          },
        });

        if (badge) {
          cardTimeline.from(badge, {
            scale: 0.5,
            opacity: 0,
            rotation: -8,
            duration: 0.55,
            ease: 'back.out(2)',
          });
        }

        if (content) {
          cardTimeline.from(
            content,
            {
              y: 70,
              opacity: 0,
              duration: 0.75,
              ease: 'power3.out',
            },
            '-=0.2',
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="page-section overflow-hidden bg-surface-raised py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="how-it-works-heading mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-border-light bg-surface-card px-4 py-1.5 text-xs font-medium text-muted">
            How it works
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            From webhook to review in four steps
          </h2>
          <p className="mt-4 text-muted">
            From webhook to inline comment in under a minute. Fully automated, zero config per PR.
          </p>
        </div>

        <div className="how-it-works-cards relative mt-16">
          <div className="how-it-works-line absolute top-8 left-8 hidden h-[calc(100%-4rem)] w-px origin-top bg-gradient-to-b from-accent/60 via-border-light to-transparent lg:block" />

          <div className="space-y-8">
            {steps.map((item) => (
              <div key={item.step} className="how-it-works-card relative flex gap-6 sm:gap-8">
                <div className="how-it-works-badge flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 font-mono text-sm font-bold text-accent shadow-lg shadow-accent/10 sm:h-16 sm:w-16">
                  {item.step}
                </div>
                <div className="how-it-works-content flex-1 rounded-2xl border border-border bg-surface-card p-6 transition-colors hover:border-accent/25">
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
