export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="grid-bg animate-grid-drift absolute inset-0" />
      <div className="glow-orb animate-pulse-glow absolute top-24 left-1/2 h-[480px] w-[760px] -translate-x-1/2" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
    </div>
  );
}
