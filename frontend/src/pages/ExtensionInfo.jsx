import ExtensionHero from '../components/extension/ExtensionHero';
import InteractiveDemo from '../components/extension/InteractiveDemo';
import ProductDetection from '../components/extension/ProductDetection';
import OneClick from '../components/extension/OneClick';
import YourPhoto from '../components/extension/YourPhoto';
import AIResult from '../components/extension/AIResult';
import BenefitsGrid from '../components/extension/BenefitsGrid';
import ManualInstallGuide from '../components/extension/ManualInstallGuide';
import InstallCTA from '../components/ui/InstallCTA';

export default function ExtensionInfo() {
  return (
    <div className="flex flex-col">
      <ExtensionHero />
      <InteractiveDemo />
      <ProductDetection />
      <OneClick />
      <YourPhoto />
      <AIResult />
      <BenefitsGrid />
      <ManualInstallGuide />
      <InstallCTA
        headline="Your next outfit is one click away."
        subtitle="Install Shopping Buddy and turn your browser into a virtual fitting room."
        variant="warm"
      />
    </div>
  );
}
