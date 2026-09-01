import ExtensionHero from '../components/extension/ExtensionHero';
import ManualInstallGuide from '../components/extension/ManualInstallGuide';
import InstallCTA from '../components/ui/InstallCTA';

export default function ExtensionInfo() {
  return (
    <div className="flex flex-col">
      <ExtensionHero />
      <ManualInstallGuide />
      <InstallCTA
        headline="Your next outfit is one click away."
        subtitle="Install Shopping Buddy and turn your browser into a virtual fitting room."
        variant="warm"
      />
    </div>
  );
}
