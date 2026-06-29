export function LogoAnimated() {
  return (
    <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 ring-1 ring-accent/30">
      <span className="logo-glow absolute inset-0 rounded-lg" />
      <svg className="relative h-5 w-5" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <g className="logo-orbit">
          <circle
            cx="16"
            cy="16"
            r="13"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 5"
            className="text-accent/40"
          />
        </g>

        <circle
          cx="16"
          cy="16"
          r="10"
          stroke="currentColor"
          strokeWidth="1.5"
          className="logo-ring text-accent"
        />

        <path
          d="M11 16.5 L14.5 20 L21 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="logo-check text-accent"
        />

        <circle cx="24" cy="8" r="1.5" fill="currentColor" className="logo-spark text-accent" />
      </svg>
    </div>
  );
}
