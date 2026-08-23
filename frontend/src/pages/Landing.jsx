import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Landing() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Left Text */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-tint border border-primary-soft text-primary text-sm font-semibold tracking-wide uppercase mb-6"
            >
              <Sparkles className="w-4 h-4" /> AI Powered Virtual Try-On
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-dark tracking-tight leading-[1.1] mb-6"
            >
              Try it before <br className="hidden md:block" />
              <span className="text-primary">you buy it.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-xl"
            >
              See how your favorite clothes look on you before placing the order. Shopping Buddy brings AI-powered virtual try-on directly into your shopping experience.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link to="/try-on" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg shadow-xl shadow-primary/20" icon={Sparkles}>
                  ✨ Try It On
                </Button>
              </Link>
              <Link to="/shop" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto h-14 px-8 text-lg" icon={ArrowRight}>
                  Explore Collection
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Image Composition */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full lg:w-1/2 relative z-10"
          >
            <div className="relative w-full max-w-lg mx-auto aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80" 
                alt="Fashion Model" 
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
              
              {/* Floating UI Element */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-xl flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-primary-tint rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark">Perfect Fit Generated</p>
                  <p className="text-xs text-text-secondary">AI mapped the garment in 7.2s</p>
                </div>
              </motion.div>
            </div>
            
            {/* Background decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary-soft rounded-full blur-3xl -z-10 opacity-60" />
          </motion.div>
        </div>
      </section>

      {/* Value Strip */}
      <section className="border-y border-border bg-surface-alt">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
            {[
              { title: 'Discover', desc: 'Find your style' },
              { title: 'Try', desc: 'Upload your photo' },
              { title: 'Compare', desc: 'See the results' },
              { title: 'Shop', desc: 'Buy with confidence' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center px-4">
                <span className="text-lg font-bold text-dark">{item.title}</span>
                <span className="text-sm text-text-secondary mt-1">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight mb-4">How it works</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">Three simple steps to transform your online shopping experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { num: '01', title: 'Choose', desc: 'Find a garment you love from the Junaid Jamshed collection.' },
              { num: '02', title: 'Upload', desc: 'Add a clear, well-lit photo of yourself standing naturally.' },
              { num: '03', title: 'Try', desc: 'See yourself wearing the garment in seconds with our AI.' }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-surface-alt rounded-full flex items-center justify-center text-2xl font-black text-border mb-6 group-hover:bg-primary-tint group-hover:text-primary transition-colors">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{step.title}</h3>
                <p className="text-text-secondary leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-dark text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">See it on you.</h2>
          <p className="text-xl text-white/70 mb-10">Stop guessing. Start trying.</p>
          <Link to="/try-on">
            <Button size="lg" className="h-16 px-10 text-lg">
              ✨ Try It On Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
