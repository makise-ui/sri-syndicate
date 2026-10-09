import React, { useState } from 'react';
import { 
  ArrowRight, 
  FileSpreadsheet, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  PhoneCall, 
  MapPin, 
  Copy, 
  Check 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenMatrix: () => void;
  onViewWarehouse: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalog,
  onOpenMatrix,
  onViewWarehouse,
}) => {
  const [copiedGst, setCopiedGst] = useState(false);

  const handleCopyGst = () => {
    navigator.clipboard.writeText(COMPANY_INFO.gstin);
    setCopiedGst(true);
    setTimeout(() => setCopiedGst(false), 2000);
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Soft Subtle Glows matching brand colors */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none -z-10">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute top-40 left-1/3 w-80 h-80 bg-lime-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple Style Pill Notice */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200 shadow-apple-sm text-xs font-medium text-[#1d1d1f] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></span>
            <span className="font-semibold text-[#0d5940]">Direct Erode Factory:</span>
            <span className="text-[#6e6e73]">Festive & Summer 2026 Cotton Saree Bales Open for Booking</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0d5940]" />
          </div>
        </div>

        {/* Hero Headings */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1d1d1f] font-sans leading-[1.14]">
            Erode Handloom Cotton Sarees.{' '}
            <span className="block mt-2 bg-gradient-to-r from-[#0d5940] via-[#1d4ed8] to-[#15803d] bg-clip-text text-transparent">
              Direct Factory Wholesale.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-[#6e6e73] font-normal max-w-2xl mx-auto leading-relaxed">
            Direct loom-floor pricing for showrooms and boutiques. Zero middlemen, ex-factory rates, and standard 10-piece bundles.
          </p>

          {/* Action CTAs */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onExploreCatalog}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#0d5940] hover:bg-[#0a3d2e] text-white text-sm font-semibold shadow-apple-card hover:shadow-apple-hover transition-all active:scale-95"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-4 h-4 text-lime-300" />
            </button>

            <button
              onClick={onOpenMatrix}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#f5f5f7] text-[#1d1d1f] text-sm font-semibold border border-slate-300/80 shadow-apple-sm transition-all active:scale-95 group"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#1d4ed8]" />
              <span>Bulk Order (Excel Matrix)</span>
            </button>

            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Sri%20Syndicate,%20please%20send%20the%20latest%20wholesale%20cotton%20saree%20catalog.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#0d5940] text-sm font-semibold border border-emerald-200 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#15803d]" />
              <span>WhatsApp: {COMPANY_INFO.phone1}</span>
            </a>
          </div>

          {/* Clean Single Trust Row */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-[#6e6e73]">
            <span>MOQ: 10 Sarees</span>
            <span className="text-slate-300">•</span>
            <span>Ex-Factory Rates</span>
            <span className="text-slate-300">•</span>
            <span>Nationwide Lorry Dispatch</span>
          </div>
        </div>

        {/* Bento Grid: Clean, Balanced & Spacious */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Apple Clean Identity & Pillars */}
          <div className="md:col-span-2 lg:col-span-2 bg-white rounded-apple-2xl p-7 border border-slate-200/80 shadow-apple-card flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#0a3d2e] border border-lime-400/30 flex items-center justify-center shadow-sm">
                    <span className="font-serif text-white font-extrabold text-lg">SS</span>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0a3d2e] tracking-tight font-sans">
                      SRI SYNDICATE
                    </h3>
                    <p className="text-xs font-semibold text-[#15803d]">
                      Mfrs. of Hi-Fancy &amp; Hand Loom Cotton Sarees
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-50 text-[#0d5940] border border-emerald-200">
                  Erode, Tamil Nadu
                </span>
              </div>

              {/* 3 Core Value Pillars */}
              <div className="grid sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-slate-100">
                  <span className="text-[10px] font-bold text-[#6e6e73] uppercase tracking-wider block mb-1">
                    Pricing
                  </span>
                  <p className="text-sm font-bold text-[#1d1d1f]">Direct Mill Rates</p>
                  <p className="text-xs text-[#6e6e73] mt-0.5">Zero distributor margin</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-slate-100">
                  <span className="text-[10px] font-bold text-[#6e6e73] uppercase tracking-wider block mb-1">
                    Packaging
                  </span>
                  <p className="text-sm font-bold text-[#1d1d1f]">10-Pc Bundles</p>
                  <p className="text-xs text-[#6e6e73] mt-0.5">Assorted colors &amp; bales</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-slate-100">
                  <span className="text-[10px] font-bold text-[#6e6e73] uppercase tracking-wider block mb-1">
                    Weave Count
                  </span>
                  <p className="text-sm font-bold text-[#1d1d1f]">60s, 80s &amp; 100s</p>
                  <p className="text-xs text-[#6e6e73] mt-0.5">Pure combed cotton</p>
                </div>
              </div>
            </div>

            {/* Quiet Footer Line */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-[#6e6e73] gap-2">
              <span>51, A.K. Complex, Kottai, Erode - 638 001</span>
              <span className="font-mono text-slate-700 font-medium">GST: {COMPANY_INFO.gstin}</span>
            </div>
          </div>

          {/* Card 2: Warehouse Preview CTA */}
          <div 
            onClick={onViewWarehouse}
            className="bg-gradient-to-br from-[#0d5940] to-[#064e3b] text-white rounded-apple-2xl p-7 shadow-apple-card cursor-pointer hover:shadow-apple-hover transition-all relative overflow-hidden group flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-36 h-36 bg-lime-400/20 rounded-full blur-2xl group-hover:scale-125 transition-transform"></div>
            <div className="relative z-10">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-lime-300 text-[10px] font-bold uppercase tracking-wider mb-3">
                Live Facility
              </span>
              <h4 className="text-xl font-bold text-white">
                Kottai Warehouse &amp; Bales
              </h4>
              <p className="text-xs text-emerald-100/80 mt-2 leading-relaxed">
                Ready stock sorted into master bales for same-day dispatch.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-emerald-700/60 text-xs font-semibold text-lime-300">
              <span className="group-hover:underline">Tour Warehouse</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Key Volume Metrics */}
          <div className="bg-[#f5f5f7] rounded-apple-2xl p-7 border border-slate-200/80 shadow-apple-card flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                Monthly Scale
              </span>
              <div className="mt-4">
                <div className="text-3xl font-extrabold text-[#1d1d1f]">
                  50,000+
                </div>
                <div className="text-xs text-[#6e6e73] mt-1">
                  Sarees woven monthly across Erode cluster
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200">
                <div className="text-2xl font-bold text-[#0d5940]">
                  100% Wholesale
                </div>
                <div className="text-xs text-[#6e6e73] mt-0.5">
                  Bundles &amp; bales exclusively
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Same-Day Lorry Booking</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

