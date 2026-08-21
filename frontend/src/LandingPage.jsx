import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onTryNow, onGetExtension }) => {
  return (
    <div className="relative min-h-screen antialiased selection:bg-secondary-container selection:text-on-secondary-container" style={{backgroundColor: '#05050a', color: '#d4e4fa', fontFamily: 'Plus Jakarta Sans, sans-serif'}}>
      
      {/* Background Shader */}
      <div className="fixed inset-0 z-0 pointer-events-none"></div>
      
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-surface/40 dark:bg-surface/40 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-indigo-500/15">
        <div className="flex justify-between items-center px-gutter h-16 w-full max-w-container-max mx-auto">
          <div className="flex items-center gap-3">
            <img className="w-8 h-8 rounded-full object-cover border border-white/20" alt="Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh2a7XFc0J90x0M2cbccc7kcz8n3UBZDx8wuVsiqdD1LzNb7uS7mrmMu9NgOrsmNScn42AGty7I3ERCzD6-kdwXdqOOmHFlu_4qtiHzLMS7vWYAmx6SYtAg-ZKLgVGKcoE1t4N82nWFvZz04Wbp6TFP0gnWki5WHaNPJBfRVJHPqlUXdsanbN1BWA32-aq5I8gi9yYGZd6uA6rDY_KpHERFURRX9E8nn2KSj1CZAxcqlj_Rj20MMND"/>
            <span className="font-display-lg-mobile text-[24px] font-extrabold bg-gradient-to-br from-primary to-tertiary bg-clip-text text-transparent">Shopping Buddy</span>
          </div>
          <button onClick={onGetExtension} className="glass-button-primary rounded-full px-6 py-2 font-headline-sm text-[16px] text-primary-fixed inline-flex items-center gap-2">
            <span>Get Extension</span>
          </button>
        </div>
      </nav>

      {/* Main Canvas */}
      <main className="relative z-10 pt-32 pb-40 px-gutter max-w-container-max mx-auto flex flex-col items-center">
        
        {/* Hero Section */}
        <section className="w-full text-center max-w-4xl mx-auto mb-24 fade-in-up">
          <h1 className="font-display-lg-mobile md:font-display-lg text-gradient mb-6 leading-tight text-[40px] md:text-[64px] font-extrabold">
            Never Guess Your<br/>Perfect Fit Again
          </h1>
          <p className="font-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto text-[18px]">
            Experience high-end luxury fashion styling powered by cutting-edge artificial intelligence. Your private orbital lounge awaits.
          </p>
          <button onClick={onTryNow} className="glass-button-primary rounded-full px-8 py-4 font-headline-sm text-[20px] text-primary-fixed inline-flex items-center gap-2 delay-200">
            <span>Try Web App</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </section>

        {/* Bento Box Features */}
        <section className="w-full grid grid-cols-4 md:grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-4 md:col-span-4 glass-panel rounded-xl p-6 relative overflow-hidden shimmer-card fade-in-up delay-100 group">
            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-tertiary group-hover:text-secondary-fixed transition-colors">
              <span className="material-symbols-outlined text-[28px]" style={{fontVariationSettings: "'FILL' 1"}}>extension</span>
            </div>
            <h3 className="font-headline-sm text-[24px] font-semibold text-primary mb-3">1. Get Extension</h3>
            <p className="font-body-md text-on-surface-variant">Install our lightweight, high-tech browser integration seamlessly.</p>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary-container/20 blur-3xl rounded-full"></div>
          </div>
          
          <div className="col-span-4 md:col-span-4 glass-panel rounded-xl p-6 relative overflow-hidden shimmer-card fade-in-up delay-200 group">
            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-tertiary group-hover:text-secondary-fixed transition-colors">
              <span className="material-symbols-outlined text-[28px]" style={{fontVariationSettings: "'FILL' 1"}}>shopping_bag</span>
            </div>
            <h3 className="font-headline-sm text-[24px] font-semibold text-primary mb-3">2. Browse</h3>
            <p className="font-body-md text-on-surface-variant">Explore luxury fashion across your favorite digital boutiques.</p>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-tertiary/10 blur-3xl rounded-full"></div>
          </div>

          <div className="col-span-4 md:col-span-4 glass-panel rounded-xl p-6 relative overflow-hidden shimmer-card fade-in-up delay-300 group">
            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-tertiary group-hover:text-secondary-fixed transition-colors">
              <span className="material-symbols-outlined text-[28px]" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
            </div>
            <h3 className="font-headline-sm text-[24px] font-semibold text-primary mb-3">3. Magic Happens</h3>
            <p className="font-body-md text-on-surface-variant">Our AI lens instantly visualizes your perfect fit in real-time.</p>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary-fixed/20 blur-3xl rounded-full"></div>
          </div>
        </section>

        {/* Showcase Image Area */}
        <section className="w-full mt-6 grid grid-cols-4 md:grid-cols-12 gap-6 fade-in-up delay-400">
          <div className="col-span-4 md:col-span-12 glass-panel rounded-xl p-2 h-96 relative flex items-center justify-center group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent z-10 pointer-events-none opacity-60"></div>
            <div className="absolute inset-0 bg-cover bg-center w-full h-full opacity-70 group-hover:scale-105 transition-transform duration-700" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDeVoHb2fIavDTTgTmTRRCmdLMk-CqrrzoPcpbZ_q_CSU9v54T6qn0mTKKPcN-v1dRSuup31ENwpFvfHjoX8e6kpjW8Nc-SMZeA2mnNEpVpY5Nn4Zz1FsE-5TXLbFSTeJSaWejtxWaGTdDY7p2iTxteqZU6Tjlk521qXSxXkOC_Trr25N_PRwMDTRR6He402nJqNy_ElXMAZNn35nMBZ3NK9hc2kCpPiWNTpFFK-S4NfJno1RURUux2')"}}></div>
            <div className="relative z-20 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4 bg-black/40 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse"></div>
                <span className="font-label-caps text-[12px] font-bold tracking-widest text-tertiary-fixed">AI Ready</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
