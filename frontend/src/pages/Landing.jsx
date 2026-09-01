import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import JJDemo from '../components/landing/JJDemo';
import FinalCTA from '../components/landing/FinalCTA';

export default function Landing() {
  return (
    <div className="flex flex-col">
      <Hero />
      <HowItWorks />
      <JJDemo />
      <FinalCTA />
    </div>
  );
}
