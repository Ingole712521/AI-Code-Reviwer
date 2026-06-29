export function HeroBackground() {
  return (
    <>
      <div className="grid-bg animate-grid-drift absolute inset-0" />
      <div className="glow-orb animate-pulse-glow absolute top-16 left-1/2 h-[520px] w-[820px] -translate-x-1/2" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
    </>
  );
}
