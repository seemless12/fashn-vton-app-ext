import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import useStore from '../../store/useStore';
import { formatPrice } from '../../lib/utils';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const setSelectedGarment = useStore(state => state.setSelectedGarment);

  const handleTryOn = (e) => {
    e.stopPropagation();
    setSelectedGarment(product);
    navigate('/try-on');
  };

  const handleCardClick = () => {
    navigate(`/product/${product.slug}`);
  };

  return (
    <motion.div 
      className="group relative cursor-pointer"
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 mb-4">
        <img 
          src={product.primaryImage} 
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        
        <button 
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="w-5 h-5" />
        </button>

        <div className="absolute bottom-4 left-0 right-0 px-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button 
            className="w-full shadow-lg" 
            variant="primary" 
            icon={Sparkles}
            onClick={handleTryOn}
          >
            Try It On
          </Button>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-text-muted uppercase tracking-wider font-medium">{product.category.replace('-', ' ')}</p>
        <h3 className="text-sm font-medium text-text-primary line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2">
          {product.salePrice ? (
            <>
              <span className="text-sm font-semibold text-primary">{formatPrice(product.salePrice, product.currency)}</span>
              <span className="text-xs text-text-muted line-through">{formatPrice(product.price, product.currency)}</span>
            </>
          ) : (
            <span className="text-sm font-medium text-text-primary">{formatPrice(product.price, product.currency)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
