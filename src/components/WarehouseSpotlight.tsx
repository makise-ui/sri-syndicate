import React, { useState } from 'react';
import { Eye, ShieldCheck, Layers, PackageCheck, Award, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

export const WarehouseSpotlight: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const hotspots = [
    {
      id: 1,
      x: '28%',
      y: '58%',
      title: 'Bulk Folding & Weave Inspection',
      desc: 'Our master craftsmen fold and cross-check weave density, zari borders, and color consistency for every individual piece.'
    },
    {
      id: 2,
      x: '75%',
      y: '50%',
      title: 'Ready Wholesale Stacked Bales',
      desc: 'Over 15,000 sarees in sorted color assortments stacked ready for immediate palletizing and lorry parcel loading.'
    },
    {
      id: 3,
      x: '64%',
      y: '38%',
      title: 'Hydraulic Bale Compression Unit',
      desc: 'Heavy-duty textile press ensuring compact, moisture-resistant packaging for safe cross-country transportation.'
    }
  ];

  return (
    <section id="warehouse" className="py-16 lg:py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Apple style) */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-[#0d5940] border border-emerald-200">
            Real Manufacturing Floor • Erode, TN
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
            Inside Sri Syndicate's Wholesale Operations
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#6e6e73] leading-relaxed">
            We are not traders or brokers. Every single bale originates from our weaving clusters and passes through our central warehouse in Kottai, Erode before reaching your showroom.
          </p>
        </div>

        {/* Hero Interactive Warehouse Image */}
        <div className="relative rounded-apple-3xl overflow-hidden shadow-apple-card border border-slate-200/80 group">
          <img
            src="/images/warehouse.jpeg"
            alt="Sri Syndicate Wholesale Saree Warehouse Floor in Erode"
            className="w-full h-[380px] sm:h-[500px] lg:h-[600px] object-cover group-hover:scale-101 transition-transform duration-700"
          />

          {/* Frosted Glass Overlay Badge */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 apple-glass px-4 py-2.5 rounded-2xl shadow-apple-sm flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-600 animate-ping"></div>
            <div>
              <p className="text-xs font-bold text-[#0d5940] uppercase tracking-wider">
                Live Facility • Kottai, Erode
              </p>
              <p className="text-[11px] text-[#6e6e73]">
                Daily Bale Packaging &amp; Despatch Center
              </p>
            </div>
          </div>

          {/* Interactive Hotspots */}
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              style={{ left: spot.x, top: spot.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              onMouseEnter={() => setActiveHotspot(spot.id)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              <button
                onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                className="relative group/btn"
                aria-label={spot.title}
              >
                <span className="absolute -inset-2 rounded-full bg-lime-400/50 animate-ping"></span>
                <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#0d5940] text-white font-bold text-xs shadow-lg border-2 border-white ring-2 ring-lime-400">
                  {spot.id}
                </span>
              </button>

              {/* Tooltip Card */}
              {activeHotspot === spot.id && (
                <div className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 sm:w-72 apple-glass p-3.5 rounded-2xl shadow-apple-hover border border-white text-left animate-fadeIn">
                  <p className="text-xs font-bold text-[#0d5940]">{spot.title}</p>
                  <p className="text-[11px] text-[#6e6e73] mt-1 leading-normal">{spot.desc}</p>
                </div>
              )}
            </div>
          ))}

          {/* Bottom Bar Info */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-lime-400" />
              <span>51, A.K. Complex, Muniyappan Kovil Street, Kottai, Erode</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold text-emerald-300">
              <span>GST Registered</span>
              <span>•</span>
              <span>Live Stock Verification</span>
              <span>•</span>
              <span>Buyers Welcome to Visit</span>
            </div>
          </div>
        </div>

        {/* Apple Style 3-Column Pillars */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#fbfbfd] p-6 rounded-apple-xl border border-slate-200/80 shadow-apple-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-[#0d5940] mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#1d1d1f]">Master Bale Standardization</h3>
            <p className="text-xs text-[#6e6e73] mt-2 leading-relaxed">
              Carefully sorted in 10-saree bundles (assorted colorways) packed into 50 or 100 saree bales with moisture-proof wrapping.
            </p>
          </div>

          <div className="bg-[#fbfbfd] p-6 rounded-apple-xl border border-slate-200/80 shadow-apple-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-[#1d4ed8] mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#1d1d1f]">Zero-Defect Quality Check</h3>
            <p className="text-xs text-[#6e6e73] mt-2 leading-relaxed">
              Every fold inspected for warp threads, weft snags, and even zari borders. Damaged pieces are rejected before packing.
            </p>
          </div>

          <div className="bg-[#fbfbfd] p-6 rounded-apple-xl border border-slate-200/80 shadow-apple-sm">
            <div className="w-10 h-10 rounded-xl bg-lime-100 flex items-center justify-center text-[#65a30d] mb-4">
              <PackageCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#1d1d1f]">Direct Factory Savings</h3>
            <p className="text-xs text-[#6e6e73] mt-2 leading-relaxed">
              Save 25% to 35% compared to purchasing from wholesale middlemen or regional brokers. Boost your store retail margins.
            </p>
          </div>

          <div className="bg-[#fbfbfd] p-6 rounded-apple-xl border border-slate-200/80 shadow-apple-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-[#0d5940] mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#1d1d1f]">Erode Handloom Heritage</h3>
            <p className="text-xs text-[#6e6e73] mt-2 leading-relaxed">
              High-count 80s and 100s combed cottons renowned throughout South India for cooling comfort and durable colorfastness.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
