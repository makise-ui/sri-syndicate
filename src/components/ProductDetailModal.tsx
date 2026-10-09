import React, { useState } from 'react';
import { Product } from '../types';
import { X, Check, Package, Sparkles, ShieldCheck, Ruler, Scissors, Award } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, bundles: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [bundleQty, setBundleQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const totalSarees = bundleQty * product.bundleSize;
  const pieceRate = totalSarees >= 100 
    ? product.tier100Rate 
    : totalSarees >= 50 
      ? product.tier50Rate 
      : product.pieceRate;
  const totalAmount = totalSarees * pieceRate;

  const handleAdd = () => {
    onAddToCart(product, bundleQty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-apple-3xl shadow-2xl border border-slate-200/90 w-full max-w-4xl overflow-hidden flex flex-col md:flex-row relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1d1d1f] shadow-md flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="md:w-1/2 relative bg-slate-100 min-h-[300px] md:min-h-[500px]">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 apple-glass p-3 rounded-2xl shadow-sm text-xs">
            <span className="font-bold text-[#0d5940] block">{product.code} • Wholesale Lot</span>
            <span className="text-[#6e6e73]">Guaranteed authentic Erode cotton handloom weave</span>
          </div>
        </div>

        {/* Right: Technical Specs & Bundle Selector */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-[#0d5940]">
                {product.code}
              </span>
              {product.badge && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800">
                  {product.badge}
                </span>
              )}
            </div>

            <h3 className="text-2xl font-bold text-[#1d1d1f]">
              {product.title}
            </h3>

            <p className="text-xs text-[#6e6e73] mt-2 leading-relaxed">
              {product.description}
            </p>

            {/* Technical Specifications Grid */}
            <div className="mt-6 space-y-3 p-4 rounded-2xl bg-[#fbfbfd] border border-slate-200/80 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#6e6e73] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Fabric &amp; Yarn
                </span>
                <span className="font-semibold text-[#1d1d1f]">{product.fabric}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6e6e73] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  Weave Count
                </span>
                <span className="font-semibold text-[#1d1d1f]">{product.count}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6e6e73] flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-lime-600" />
                  Saree Cut
                </span>
                <span className="font-semibold text-[#1d1d1f]">{product.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6e6e73] flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-purple-600" />
                  Blouse Detail
                </span>
                <span className="font-semibold text-[#1d1d1f]">{product.blouse}</span>
              </div>
            </div>

            {/* Color Assortment in Bundle */}
            <div className="mt-5">
              <label className="text-xs font-bold text-[#1d1d1f] block mb-2">
                Color Assortment in 1 Bundle ({product.bundleSize} Sarees):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {product.colorsInBundle.map((c, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-[#f5f5f7] border border-slate-200 text-xs font-medium text-[#1d1d1f]"
                  >
                    {c} (2 pcs)
                  </span>
                ))}
              </div>
            </div>

            {/* Tiered Price Table */}
            <div className="mt-5 p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <span className="text-[11px] font-bold text-[#0d5940] uppercase tracking-wider block mb-1.5">
                B2B Wholesale Price Schedule
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-white border border-emerald-100">
                  <span className="text-[10px] text-[#6e6e73] block">1-4 Bundles</span>
                  <span className="font-bold text-[#1d1d1f]">₹{product.pieceRate} / pc</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-emerald-100">
                  <span className="text-[10px] text-[#6e6e73] block">5+ Bundles (50 pcs)</span>
                  <span className="font-bold text-emerald-800">₹{product.tier50Rate} / pc</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-emerald-100">
                  <span className="text-[10px] text-[#6e6e73] block">10+ (100 Bale)</span>
                  <span className="font-bold text-blue-700">₹{product.tier100Rate} / pc</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bundle Stepper & Total CTA */}
          <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-[#6e6e73] block">Order Quantity</span>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => setBundleQty(Math.max(1, bundleQty - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm text-[#1d1d1f] px-2">
                    {bundleQty} {bundleQty === 1 ? 'Bundle' : 'Bundles'} ({totalSarees} Sarees)
                  </span>
                  <button
                    onClick={() => setBundleQty(bundleQty + 1)}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-[#6e6e73] block">Estimated Amount</span>
                <span className="text-xl font-extrabold text-[#0d5940]">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className={`w-full py-3.5 rounded-full font-semibold text-xs flex items-center justify-center gap-2 shadow-apple-card transition-all ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#0d5940] hover:bg-[#0a3d2e] text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-lime-300" />
                  <span>Added {totalSarees} Sarees to Order!</span>
                </>
              ) : (
                <>
                  <Package className="w-4 h-4 text-lime-300" />
                  <span>Confirm &amp; Add {totalSarees} Sarees to Cart</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
