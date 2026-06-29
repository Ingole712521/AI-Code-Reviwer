import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { ReviewScope } from './components/ReviewScope';
import { Architecture } from './components/Architecture';
import { TechStack } from './components/TechStack';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-surface text-slate-100">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <ReviewScope />
        <Architecture />
        <TechStack />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
