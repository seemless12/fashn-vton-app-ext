import { Download, Shield, Zap } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';

export default function ManualInstallGuide() {
  return (
    <section id="developer-install" className="py-24 md:py-32 bg-surface px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading 
          overline="Developer Mode" 
          title="Manual Installation Guide" 
          subtitle="Since the extension is currently in beta, follow these steps to install it locally on your browser."
          centered={true}
        />

        <div className="mt-16 bg-surface-alt border border-border rounded-3xl p-8 md:p-12 shadow-soft">
          <div className="flex flex-col md:flex-row gap-12 mb-12">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-dark mb-4">1. Download the Extension</h3>
              <p className="text-text-secondary mb-6 leading-relaxed">
                Download the zipped source code containing the Shopping Buddy Chrome extension files to your computer.
              </p>
              <a 
                href="/fashn-extension.zip" 
                download 
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-deep text-white h-12 px-6 rounded-xl font-semibold shadow-md transition-colors"
              >
                <Download className="w-5 h-5" />
                Download Source (v1.0)
              </a>
            </div>
            <div className="flex-1">
              <div className="bg-white border border-border rounded-xl p-4 shadow-sm flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-tint text-primary flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-dark">Instant Try-On</div>
                  <div className="text-xs text-text-secondary">One click virtual fitting</div>
                </div>
              </div>
              <div className="bg-white border border-border rounded-xl p-4 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-tint text-primary flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-dark">Privacy First</div>
                  <div className="text-xs text-text-secondary">Photos stay local to your browser</div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-border my-12" />

          <div className="space-y-12">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-primary/20">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-bold text-dark mb-2">Extract the zip file</h4>
                  <p className="text-text-secondary mb-4">Unzip the downloaded file. You should now have a folder named <code className="bg-gray-100 text-dark px-2 py-1 rounded border border-gray-200 font-mono text-sm">fashn-extension</code>.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-primary/20">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-bold text-dark mb-2">Enable Developer Mode</h4>
                  <p className="text-text-secondary mb-4">Open Chrome and navigate to <code className="bg-gray-100 text-dark px-2 py-1 rounded border border-gray-200 font-mono text-sm">chrome://extensions/</code>. Toggle the <strong>Developer mode</strong> switch in the top right corner to ON.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-primary/20">
                  4
                </div>
                <div>
                  <h4 className="text-lg font-bold text-dark mb-2">Load the extension</h4>
                  <p className="text-text-secondary mb-4">Click the <strong>"Load unpacked"</strong> button in the top left and select the <code className="bg-gray-100 text-dark px-2 py-1 rounded border border-gray-200 font-mono text-sm">fashn-extension</code> folder you extracted earlier.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
