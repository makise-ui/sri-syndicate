import React from 'react';
import { ShoppingBag, FileSpreadsheet, PhoneCall, ShieldCheck, Factory } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

interface NavbarProps {
  cartCount: number;
  totalSarees: number;
  onOpenCart: () => void;
  onOpenMatrix: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  totalSarees,
  onOpenCart,
  onOpenMatrix,
  activeSection,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Wholesale B2B Utility Bar */}
      <div className="bg-[#0a3d2e] text-emerald-100 text-xs py-1.5 px-4 sm:px-8 border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-[11px] tracking-wide border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse"></span>
              STRICTLY B2B WHOLESALE
            </span>
            <span className="hidden sm:inline text-emerald-200/75">
              Direct Manufacturer • Erode Loom Floor Rates
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] tracking-wide">
            <span className="hidden md:inline font-mono text-emerald-300/90">
              GSTIN: <span className="text-white font-semibold">{COMPANY_INFO.gstin}</span>
            </span>
            <span className="text-emerald-200/50 hidden sm:inline">|</span>
            <a 
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hi%20Sri%20Syndicate,%20I%20am%20a%20retailer%20interested%20in%20wholesale%20cotton%20sarees.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-lime-300 hover:text-white font-medium transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-lime-400" />
              <span>Wholesale Cell: {COMPANY_INFO.phone1}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Apple-style Frosted Main Header */}
      <nav className="apple-glass border-b border-slate-200/60 shadow-sm backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Identity */}
          <div 
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0d5940] via-[#064e3b] to-[#1e3a8a] p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-[14px] bg-[#0a3d2e] flex items-center justify-center border border-lime-400/30">
                <span className="font-serif text-white font-extrabold text-xl tracking-tight">SS</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-lime-500 border-2 border-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0a3d2e] font-sans">
                  SRI SYNDICATE
                </span>
                <span className="hidden md:inline-block px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-blue-50 text-blue-700 rounded border border-blue-200">
                  ERODE
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#6e6e73] font-medium tracking-tight">
                Mfrs. of Hi-Fancy & Hand Loom Cotton Sarees
              </p>
            </div>
          </div>

          {/* Navigation Anchors (Apple pill tabs) */}
          <div className="hidden lg:flex items-center bg-[#f5f5f7]/80 p-1.5 rounded-full border border-slate-200/70">
            <button
              onClick={() => onNavigate('catalog')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                activeSection === 'catalog'
                  ? 'bg-white text-[#0d5940] shadow-sm'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              Wholesale Catalog
            </button>
            <button
              onClick={() => onNavigate('warehouse')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                activeSection === 'warehouse'
                  ? 'bg-white text-[#0d5940] shadow-sm'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              Factory & Loom Floor
            </button>
            <button
              onClick={() => onNavigate('vision-mission')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                activeSection === 'vision-mission'
                  ? 'bg-white text-[#0d5940] shadow-sm'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              Vision & Mission
            </button>
            <button
              onClick={() => onNavigate('calculator')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                activeSection === 'calculator'
                  ? 'bg-white text-[#0d5940] shadow-sm'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              Bale Savings
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                activeSection === 'contact'
                  ? 'bg-white text-[#0d5940] shadow-sm'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              Kottai Facility
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dexigmatic Excel Matrix CTA */}
            <button
              onClick={onOpenMatrix}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold bg-emerald-50 text-[#0d5940] border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-all shadow-sm group"
              title="Open spreadsheet-style bulk ordering matrix"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#0d5940] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-medium">Bulk Matrix</span>
              <span className="px-1.5 py-0.2 bg-[#0d5940] text-white text-[10px] rounded-full">Excel</span>
            </button>

            {/* B2B Cart & Quotation Trigger */}
            <button
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-full text-xs font-semibold bg-[#0d5940] hover:bg-[#0a3d2e] text-white shadow-md hover:shadow-lg transition-all active:scale-95 group"
            >
              <ShoppingBag className="w-4 h-4 text-lime-400 group-hover:scale-110 transition-transform" />
              <div className="text-left leading-tight hidden xs:block">
                <span className="font-bold">B2B Cart</span>
                {totalSarees > 0 && (
                  <span className="block text-[10px] text-emerald-200">
                    {totalSarees} Sarees
                  </span>
                )}
              </div>
              
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </nav>
    </header>
  );
};
