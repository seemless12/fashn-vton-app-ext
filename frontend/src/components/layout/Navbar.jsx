import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { CHROME_STORE_URL } from '../../lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' && location.hash === '';
    if (path === '/#how-it-works') return location.hash === '#how-it-works';
    return location.pathname === path;
  };

  const navLinks = [
    { label: 'How It Works', path: '/#how-it-works' },
    { label: 'Extension', path: '/extension' }
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border backdrop-blur-lg',
        scrolled ? 'h-16 bg-surface/95' : 'h-[72px] bg-surface/80'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
          <img src="/logo.png" alt="Shopping Buddy" className="w-8 h-8 rounded-sm" />
          <span className="font-bold text-xl text-dark tracking-tight">Shopping Buddy</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    isActive(link.path) ? 'text-primary' : 'text-text-secondary hover:text-dark'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-10 px-4 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-deep transition-colors shadow-sm hover:shadow-md"
          >
            Install Extension
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-dark"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-surface border-b border-border shadow-lg p-6 flex flex-col gap-6 md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={closeMenu}
                    className={cn(
                      'text-base font-medium block',
                      isActive(link.path) ? 'text-primary' : 'text-text-secondary'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center h-12 rounded-lg bg-primary text-white text-base font-semibold hover:bg-primary-deep transition-colors shadow-sm"
              onClick={closeMenu}
            >
              Install Extension
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
