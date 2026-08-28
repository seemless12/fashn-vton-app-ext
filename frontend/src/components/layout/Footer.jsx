import React from 'react';
import { Link } from 'react-router-dom';
import { CHROME_STORE_URL } from '../../lib/constants';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-lg font-semibold text-white">
            Shopping Buddy
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
            <Link to="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
            <Link to="/extension" className="hover:text-white transition-colors">Extension</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>

          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 text-white text-sm rounded-lg px-4 py-2 hover:bg-white/10 transition-colors"
          >
            Install Extension
          </a>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-white/60">
            &copy; {year} Shopping Buddy
          </div>
          <div className="text-xs text-white/40 text-center md:text-right">
            Shopping Buddy is an independent platform and is not affiliated with J. Junaid Jamshed.
          </div>
        </div>
      </div>
    </footer>
  );
}
