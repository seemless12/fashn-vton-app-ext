import Hero from '../components/landing/Hero';
import TrustStrip from '../components/landing/TrustStrip';
import ProblemSection from '../components/landing/ProblemSection';
import HowItWorks from '../components/landing/HowItWorks';
import ExtensionDemo from '../components/landing/ExtensionDemo';
import BeforeAfterSection from '../components/landing/BeforeAfterSection';
import HowItFeels from '../components/landing/HowItFeels';
import JJDemo from '../components/landing/JJDemo';
import FinalCTA from '../components/landing/FinalCTA';

export default function Landing() {
  return (
    <div className="flex flex-col">
      <Hero />
      <TrustStrip />
      <ProblemSection />
      <HowItWorks />
      <ExtensionDemo />
      <BeforeAfterSection />
      <HowItFeels />
      <JJDemo />
      <FinalCTA />
    </div>
  );
}
