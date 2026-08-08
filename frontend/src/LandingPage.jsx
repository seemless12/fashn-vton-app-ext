import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShoppingBag, Globe, ArrowRight, Wand2 } from 'lucide-react';
import './LandingPage.css';

const LandingPage = ({ onTryNow, onGetExtension }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 15 }
    }
  };

  return (
    <div className="landing-container">
      {/* Immersive Background Elements */}
      <div className="bg-orb top-left"></div>
      <div className="bg-orb bottom-right"></div>
      <div className="bg-grid"></div>

      <nav className="landing-nav glass-nav">
        <div className="logo-container">
          <div className="logo-mark"><ShoppingBag size={20} /></div>
          <h1>Shopping Buddy</h1>
        </div>
        <div className="nav-actions">
          <button className="secondary-btn glow-hover" onClick={onGetExtension}>
            <Globe size={16} /> Get Extension
          </button>
        </div>
      </nav>

      <main className="landing-main">
        <motion.div 
          className="hero-section"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="pill-badge glass" variants={itemVariants}>
            <Sparkles size={14} className="sparkle-icon" />
            <span>Powered by Next-Gen AI</span>
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            Never Guess Your <br />
            <span className="text-gradient">Perfect Fit</span> Again.
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            Experience the future of fashion. Try on any garment from anywhere on the web instantly with studio-quality realism.
          </motion.p>

          <motion.div className="hero-cta" variants={itemVariants}>
            <button className="primary-btn pulse-btn" onClick={onTryNow}>
              Try Web App <ArrowRight size={18} />
            </button>
          </motion.div>
        </motion.div>

        <motion.section 
          className="features-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div className="feature-card glass-card" variants={itemVariants}>
            <div className="feature-icon-wrapper blue">
              <Globe size={24} />
            </div>
            <h3>1. Get the Extension</h3>
            <p>Download our Chrome extension to inject the magic "Try On" button into your favorite stores like Zara, H&M, and ASOS.</p>
          </motion.div>

          <motion.div className="feature-card glass-card" variants={itemVariants}>
            <div className="feature-icon-wrapper purple">
              <ShoppingBag size={24} />
            </div>
            <h3>2. Browse Anywhere</h3>
            <p>Shop normally. When you see a garment you love, simply click the Try On button that appears over the product image.</p>
          </motion.div>

          <motion.div className="feature-card glass-card" variants={itemVariants}>
            <div className="feature-icon-wrapper pink">
              <Wand2 size={24} />
            </div>
            <h3>3. Magic Happens</h3>
            <p>Our advanced diffusion AI seamlessly drapes the garment onto your photo, respecting your unique body shape and lighting.</p>
          </motion.div>
        </motion.section>
      </main>
      
      <footer className="landing-footer glass">
        <p>© 2026 Shopping Buddy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
