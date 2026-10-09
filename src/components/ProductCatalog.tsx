import React, { useState } from 'react';
import { Product } from '../types';
import { WHOLESALE_PRODUCTS } from '../data/products';
import { Plus, Check, Eye, Package, Info, Sparkles, Filter } from 'lucide-react';

interface ProductCatalogProps {
  onAddToCart: (product: Product, bundles: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onAddToCart,
  onSelectProduct,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedBundleQty, setSelectedBundleQty] = useState<{ [id: string]: number }>({});
  const [addedAnimation, setAddedAnimation] = useState<{ [id: string]: boolean }>({});

  const categories = [
    { id: 'all', label: 'All Wholesale Lots' },
    { id: 'temple-border', label: 'Temple & Korvai Borders' },
    { id: 'handloom', label: 'Pure Handloom (80s & 100s)' },
    { id: 'hi-fancy', label: 'Hi-Fancy & Kalamkari' },
    { id: 'linen-cotton', label: 'Linen-Cotton Blends' },
    { id: 'daily-wear', label: 'Daily Wear Value Packs' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? WHOLESALE_PRODUCTS
    : WHOLESALE_PRODUCTS.filter(p => p.category === activeCategory);

  const handleQtyChange = (productId: string, delta: number) => {
    setSelectedBundleQty(prev => {
      const current = prev[productId] || 1;
      const updated = Math.max(1, current + delta);
      return { ...prev, [productId]: updated };
    });
  };

  const handleAddBundle = (product: Product) => {
    const qty = selectedBundleQty[product.id] || 1;
    onAddToCart(product, qty);
    
    // Trigger button checkmark animation
    setAddedAnimation(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedAnimation(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <section id="catalog" className="py-16 lg:py-24 bg-[#fbfbfd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
              Wholesale Saree Lots
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
              Curated Factory Bundles &amp; Bales
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#6e6e73] max-w-xl">
              Strictly packaged in wholesale assortments of 10 or 20 sarees. Rates are direct mill ex-factory with tiered bale volume discounts.
            </p>
          </div>

          {/* Wholesale Order Notice Pill */}
          <div className="apple-glass px-4 py-3 rounded-2xl border border-slate-200 flex items-center gap-3">
            <Package className="w-5 h-5 text-[#0d5940]" />
            <div className="text-xs">
              <span className="font-bold text-[#1d1d1f] block">Standard MOQ: 1 Bundle (10 Pcs)</span>
              <span className="text-[#6e6e73]">Volume discounts automatically apply at 50 &amp; 100 pcs</span>
            </div>
          </div>
        </div>

        {/* Category Pills (Apple Segmented Style) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#0d5940] text-white shadow-apple-sm'
                  : 'bg-white text-[#6e6e73] hover:text-[#1d1d1f] border border-slate-200/80 hover:bg-[#f5f5f7]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const currentQty = selectedBundleQty[product.id] || 1;
            const totalSareesForCard = currentQty * product.bundleSize;
            const pieceRateToUse = totalSareesForCard >= 100 
              ? product.tier100Rate 
              : totalSareesForCard >= 50 
                ? product.tier50Rate 
                : product.pieceRate;
            const cardTotalAmount = totalSareesForCard * pieceRateToUse;

            return (
              <div
                key={product.id}
                className="bg-white rounded-apple-2xl border border-slate-200/80 shadow-apple-sm hover:shadow-apple-card transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onSelectProduct(product); }}
                      className="px-3 py-1.5 rounded-full bg-white/90 text-[#1d1d1f] text-xs font-semibold backdrop-blur-md shadow flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Weave &amp; Swatches</span>
                    </button>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0a3d2e]/90 text-lime-300 backdrop-blur-md">
                      {product.code}
                    </span>
                    {product.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-600/90 text-white backdrop-blur-md">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-[#0d5940] shadow-sm">
                      {product.bundleSize} Pcs / Bundle
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      onClick={() => onSelectProduct(product)}
                      className="text-base font-bold text-[#1d1d1f] hover:text-[#0d5940] transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.title}
                    </h3>
                    
                    <p className="text-xs text-[#6e6e73] mt-1 line-clamp-1 font-medium">
                      {product.fabric} • {product.count}
                    </p>

                    {/* Color Assortment Preview */}
                    <div className="mt-3">
                      <span className="text-[11px] font-semibold text-[#6e6e73] block mb-1">
                        Assorted Colors in Bundle:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {product.colorsInBundle.slice(0, 3).map((col, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-[#f5f5f7] text-[#1d1d1f] font-medium border border-slate-200/60"
                          >
                            {col}
                          </span>
                        ))}
                        {product.colorsInBundle.length > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-50 text-[#0d5940] font-semibold">
                            +{product.colorsInBundle.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Wholesale Pricing Table */}
                    <div className="mt-4 p-3 rounded-xl bg-[#fbfbfd] border border-slate-200/80">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-xs text-[#6e6e73] font-medium block">Wholesale Piece Rate</span>
                          <span className="text-xl font-extrabold text-[#0d5940]">
                            ₹{pieceRateToUse}
                            <span className="text-xs font-normal text-[#6e6e73]"> / saree</span>
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] text-[#6e6e73] font-medium block">Bundle Total</span>
                          <span className="text-sm font-bold text-[#1d1d1f]">
                            ₹{cardTotalAmount.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Tier pricing pill */}
                      <div className="mt-2 pt-2 border-t border-slate-200/60 flex justify-between text-[10px] text-[#6e6e73]">
                        <span>50+ pcs: <strong className="text-emerald-700">₹{product.tier50Rate}</strong></span>
                        <span>•</span>
                        <span>100+ Bale: <strong className="text-blue-700">₹{product.tier100Rate}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Bundle Quantity Selector & Add Button */}
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
                    {/* Bundle Counter */}
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-[#f5f5f7]">
                      <button
                        onClick={() => handleQtyChange(product.id, -1)}
                        className="w-8 h-9 flex items-center justify-center text-sm font-bold text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-slate-200/70 transition-colors"
                        title="Decrease bundle"
                      >
                        -
                      </button>
                      <div className="w-10 text-center font-bold text-xs text-[#1d1d1f]">
                        {currentQty}
                        <span className="text-[9px] block text-[#6e6e73] font-normal leading-none">bdl</span>
                      </div>
                      <button
                        onClick={() => handleQtyChange(product.id, 1)}
                        className="w-8 h-9 flex items-center justify-center text-sm font-bold text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-slate-200/70 transition-colors"
                        title="Increase bundle"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Wholesale Cart Button */}
                    <button
                      onClick={() => handleAddBundle(product)}
                      className={`flex-1 h-9 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                        addedAnimation[product.id]
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#0d5940] hover:bg-[#0a3d2e] text-white shadow-sm'
                      }`}
                    >
                      {addedAnimation[product.id] ? (
                        <>
                          <Check className="w-4 h-4 text-lime-300" />
                          <span>Added {totalSareesForCard} Sarees!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 text-lime-300" />
                          <span>Add {totalSareesForCard} Sarees</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
