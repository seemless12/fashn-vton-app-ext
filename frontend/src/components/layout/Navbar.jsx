import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Shop', path: '/shop' },
    { name: 'Try It On', path: '/try-on' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'Extension', path: '/extension' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight text-dark flex items-center gap-2">
          <span className="text-primary">✦</span> Shopping Buddy
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors relative',
                  isActive ? 'text-primary' : 'text-text-secondary hover:text-dark'
                )}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-text-secondary hover:text-dark transition-colors hidden md:block">
            <Search className="w-5 h-5" />
          </button>
          <Link to="/saved" className="p-2 text-text-secondary hover:text-dark transition-colors hidden md:block">
            <Heart className="w-5 h-5" />
          </Link>
          <div className="hidden md:block ml-2">
            <Link to="/try-on">
              <Button size="sm" icon={Sparkles}>Try It On</Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-dark"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-surface overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-dark py-2"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-border my-2" />
              <Link to="/saved" onClick={() => setMobileOpen(false)} className="text-lg font-medium text-dark py-2 flex items-center gap-3">
                <Heart className="w-5 h-5" /> Saved Looks
              </Link>
              <Link to="/try-on" onClick={() => setMobileOpen(false)} className="mt-2">
                <Button className="w-full" size="lg" icon={Sparkles}>Try It On</Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
