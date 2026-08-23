import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/mockCatalog';
import { Sparkles, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import Button from '../components/ui/Button';
import useStore from '../store/useStore';
import { formatPrice } from '../lib/utils';
import { motion } from 'framer-motion';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const setSelectedGarment = useStore(state => state.setSelectedGarment);

  const product = products.find(p => p.slug === slug);

  if (!product) {
    return <div className="container mx-auto py-20 text-center">Product not found.</div>;
  }

  const handleTryOn = () => {
    setSelectedGarment(product);
    navigate('/try-on');
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Left: Image Gallery */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <motion.div 
            className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-gray-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <img 
              src={product.primaryImage} 
              alt={product.name} 
              className="w-full h-full object-cover object-top"
            />
          </motion.div>
          <div className="flex items-center gap-2 text-sm text-primary bg-primary-tint px-4 py-3 rounded-lg border border-primary-soft">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">Recommended for AI Try-On</span>
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md"
          >
            <p className="text-sm text-text-muted uppercase tracking-wider font-semibold mb-2">
              From {product.source.replace('-', ' ')}
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight mb-4">{product.name}</h1>
            
            <div className="flex items-end gap-3 mb-8">
              {product.salePrice ? (
                <>
                  <span className="text-3xl font-bold text-primary">{formatPrice(product.salePrice, product.currency)}</span>
                  <span className="text-xl text-text-muted line-through mb-1">{formatPrice(product.price, product.currency)}</span>
                </>
              ) : (
                <span className="text-3xl font-bold text-dark">{formatPrice(product.price, product.currency)}</span>
              )}
            </div>

            <p className="text-text-secondary leading-relaxed mb-8">{product.description}</p>

            {product.sizes?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-medium text-dark mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button key={size} className="w-12 h-12 flex items-center justify-center rounded-lg border border-border text-dark hover:border-primary hover:text-primary transition-colors font-medium">
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4 mb-10">
              <Button size="lg" className="w-full text-lg h-14 shadow-lg" icon={Sparkles} onClick={handleTryOn}>
                ✨ Try It On
              </Button>
              <Button size="lg" variant="secondary" className="w-full h-14" icon={ArrowRight} onClick={() => window.open(product.productUrl, '_blank')}>
                View on Junaid Jamshed
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
              <div className="flex items-center gap-3 text-text-secondary text-sm">
                <Truck className="w-5 h-5 text-dark" /> Fast Delivery
              </div>
              <div className="flex items-center gap-3 text-text-secondary text-sm">
                <ShieldCheck className="w-5 h-5 text-dark" /> Authentic Product
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
