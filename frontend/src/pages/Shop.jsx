import { useState, useMemo } from 'react';
import { products, categories } from '../data/mockCatalog';
import ProductGrid from '../components/products/ProductGrid';

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter(p => p.category === activeCategory || p.gender === activeCategory);
  }, [activeCategory]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-dark tracking-tight mb-4">Find your next look.</h1>
        <p className="text-lg text-text-secondary max-w-2xl">
          Explore Junaid Jamshed collections and try your favorites before you buy.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="font-semibold text-lg text-dark mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setActiveCategory(cat.id)}
                    className={`text-sm font-medium transition-colors ${
                      activeCategory === cat.id 
                        ? 'text-primary' 
                        : 'text-text-secondary hover:text-dark'
                    }`}
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <ProductGrid products={filteredProducts} loading={false} />
        </div>
      </div>
    </div>
  );
}
