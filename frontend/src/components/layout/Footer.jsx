import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-white/70 py-16 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        <div>
          <h3 className="text-white font-semibold mb-4">Shopping Buddy</h3>
          <ul className="space-y-3">
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            <li><Link to="/try-on" className="hover:text-white transition-colors">Try It On</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-white font-semibold mb-4">Explore</h3>
          <ul className="space-y-3">
            <li><Link to="/shop" className="hover:text-white transition-colors">Shop</Link></li>
            <li><a href="https://www.junaidjamshed.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Junaid Jamshed</a></li>
            <li><Link to="/shop?collection=new" className="hover:text-white transition-colors">New Arrivals</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="space-y-3">
            <li><Link to="/extension" className="hover:text-white transition-colors">Chrome Extension</Link></li>
            <li><Link to="/history" className="hover:text-white transition-colors">History</Link></li>
            <li><Link to="/saved" className="hover:text-white transition-colors">Saved Looks</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="space-y-3">
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p>© {new Date().getFullYear()} Shopping Buddy. All rights reserved.</p>
        <p className="text-white/50 text-xs text-center md:text-right max-w-sm">
          Shopping Buddy is an independent platform and is not affiliated with J. Junaid Jamshed.
        </p>
      </div>
    </footer>
  );
}
