import React from 'react';
import { Download, Shield, Zap } from 'lucide-react';

const ExtensionInfo = ({ onBack }) => {
  return (
    <div className="ext-info-container glass" style={{ maxWidth: '860px', margin: '40px auto', padding: '40px', borderRadius: '16px', color: 'white' }}>
      <div className="ext-info-header" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
        <button className="secondary-btn" onClick={onBack} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'white', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ fontSize: '24px', margin: 0 }}>Get the Chrome Extension</h2>
      </div>
      
      <div className="ext-info-content" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Top Section: Info + Features */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <div className="ext-info-left">
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Shopping Buddy Extension v1.0.0</h3>
            <p className="subtitle" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '32px' }}>Bring AI try-on to every store on the internet.</p>
            
            <div className="features-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              <div className="feature-item" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>
                  <Zap size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>Instant Try-On</strong>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>One click to see any garment on yourself.</p>
                </div>
              </div>
              <div className="feature-item" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>
                  <Shield size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>Privacy First</strong>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Your photos stay private and secure.</p>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px' }}>
              <p style={{ marginBottom: '16px' }}><strong>Status:</strong> Unpublished (Developer Mode)</p>
              <a href="/fashn-extension.zip" download className="primary-btn glow-hover" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '8px', background: '#3b82f6', color: 'white', fontWeight: 'bold' }}>
                <Download size={18} /> Download Extension Source
              </a>
            </div>
          </div>

          <div className="ext-info-right" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', minHeight: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', padding: '20px' }}>
              <span>Extension Demo Screenshot</span>
            </div>
          </div>
        </div>

        {/* Installation Guide with Screenshots */}
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '28px', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>📦 Installation Guide</h3>
          
          {/* Step 1 */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', flexShrink: 0 }}>1</div>
              <h4 style={{ margin: 0, fontSize: '16px' }}>Download & Extract the extension zip file</h4>
            </div>
            <p style={{ margin: '0 0 12px 44px', color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>After downloading, extract the zip. You should see the <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 8px', borderRadius: '4px' }}>fashn-extension</code> folder:</p>
            <div style={{ marginLeft: '44px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <img src="/ext-step-folder.png" alt="Extension folder" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', flexShrink: 0 }}>2</div>
              <h4 style={{ margin: 0, fontSize: '16px' }}>Open Chrome Extensions & Enable Developer Mode</h4>
            </div>
            <p style={{ margin: '0 0 12px 44px', color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Go to <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 8px', borderRadius: '4px' }}>chrome://extensions/</code> and toggle <strong>Developer mode</strong> ON in the top right corner:</p>
            <div style={{ marginLeft: '44px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <img src="/ext-step-devmode.png" alt="Developer mode enabled" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', flexShrink: 0 }}>3</div>
              <h4 style={{ margin: 0, fontSize: '16px' }}>Click "Load unpacked"</h4>
            </div>
            <p style={{ margin: '0 0 0 44px', color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Click the <strong>"Load unpacked"</strong> button (visible in the screenshot above) and select the extracted <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 8px', borderRadius: '4px' }}>fashn-extension</code> folder.</p>
          </div>

          {/* Step 4 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', flexShrink: 0 }}>✓</div>
              <h4 style={{ margin: 0, fontSize: '16px' }}>Done! Start using Shopping Buddy</h4>
            </div>
            <p style={{ margin: '0 0 0 44px', color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>The extension icon will appear in your toolbar. Click it on any shopping site to try on garments instantly!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtensionInfo;
