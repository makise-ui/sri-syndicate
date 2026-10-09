import React from 'react';
import { Target, Compass, HeartHandshake, Sparkles, CheckCircle2, Shield, Leaf, Truck } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

export const VisionMission: React.FC = () => {
  return (
    <section id="vision-mission" className="py-20 lg:py-28 bg-[#0a3d2e] text-white relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-lime-400/20 text-lime-300 border border-lime-400/30">
            <Sparkles className="w-3.5 h-3.5 text-lime-300" />
            Foundational Purpose &amp; Values
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-sans">
            Preserving Handloom Legacy.{' '}
            <span className="text-lime-300 block sm:inline">Empowering Retailers.</span>
          </h2>
          <p className="mt-4 text-emerald-100/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            At Sri Syndicate, we unite the master craftsmanship of Erode's historic weaving clusters with modern B2B transparency, ensuring retail businesses thrive on authentic quality and fair pricing.
          </p>
        </div>

        {/* Vision & Mission Dual Pillars (Apple Editorial Cards) */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
          {/* Mission Card */}
          <div className="apple-glass-dark p-8 sm:p-10 rounded-apple-3xl shadow-apple-card border border-emerald-500/20 relative group hover:border-lime-400/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-lime-400/20 text-lime-300 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-lime-400" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-lime-300 block mb-2">
              Our Mission
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Direct Loom Procurement for Every Indian Retailer
            </h3>
            
            <p className="text-emerald-100/85 text-sm sm:text-base leading-relaxed">
              To deliver superior, high-count combed cotton and hi-fancy sarees with ex-factory pricing to independent boutiques, regional showroom chains, and textile stockists across India. We eliminate unnecessary distributor margins and deliver guaranteed fabric consistency, reliable bale packaging, and frictionless B2B ordering.
            </p>

            <div className="mt-6 pt-6 border-t border-emerald-800/60 space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-lime-400 flex-shrink-0" />
                <span>Zero middlemen markups — direct mill-to-shop pricing</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-lime-400 flex-shrink-0" />
                <span>Strict 10-piece bundle &amp; 100-piece bale consistency</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-lime-400 flex-shrink-0" />
                <span>Instant dispatch through Erode’s established transport grid</span>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="apple-glass-dark p-8 sm:p-10 rounded-apple-3xl shadow-apple-card border border-blue-500/20 relative group hover:border-blue-400/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-300 flex items-center justify-center mb-6">
              <Compass className="w-6 h-6 text-blue-400" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-blue-300 block mb-2">
              Our Vision
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              The Digital Benchmark for Traditional South Indian Textiles
            </h3>

            <p className="text-emerald-100/85 text-sm sm:text-base leading-relaxed">
              To become India's most trusted wholesale manufacturing network for authentic cotton textiles. We envision a future where age-old pit-loom handweaving flourishes alongside streamlined digital procurement, sustaining artisanal livelihoods while granting retailers everywhere immediate access to Erode’s finest fabrics.
            </p>

            <div className="mt-6 pt-6 border-t border-emerald-800/60 space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Supporting over 220 weaver families in the Erode cluster</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Promoting 100% natural, skin-friendly, azo-free combed cotton</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Modern digital wholesale tools (Excel order sheets &amp; direct POs)</span>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Core Pillars Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-emerald-950/60 p-6 rounded-apple-2xl border border-emerald-800/50">
            <Shield className="w-8 h-8 text-lime-400 mb-4" />
            <h4 className="text-base font-bold text-white">Fabric Integrity</h4>
            <p className="text-xs text-emerald-200/70 mt-2 leading-relaxed">
              Only authentic 60s, 80s, and 100s yarn counts. Every meter is woven with true warp density and pre-tested zari borders.
            </p>
          </div>

          <div className="bg-emerald-950/60 p-6 rounded-apple-2xl border border-emerald-800/50">
            <HeartHandshake className="w-8 h-8 text-blue-400 mb-4" />
            <h4 className="text-base font-bold text-white">Ethical Artisan Welfare</h4>
            <p className="text-xs text-emerald-200/70 mt-2 leading-relaxed">
              Fair loom wages, continuous year-round yarn allocation, and direct livelihood stability for local weavers across Erode.
            </p>
          </div>

          <div className="bg-emerald-950/60 p-6 rounded-apple-2xl border border-emerald-800/50">
            <Leaf className="w-8 h-8 text-lime-400 mb-4" />
            <h4 className="text-base font-bold text-white">Sustainable Dyes</h4>
            <p className="text-xs text-emerald-200/70 mt-2 leading-relaxed">
              OEKO-TEX compliant fast dyeing methods that prevent chemical run-off, maintaining color fastness for hundreds of washes.
            </p>
          </div>

          <div className="bg-emerald-950/60 p-6 rounded-apple-2xl border border-emerald-800/50">
            <Truck className="w-8 h-8 text-blue-400 mb-4" />
            <h4 className="text-base font-bold text-white">Nationwide Reach</h4>
            <p className="text-xs text-emerald-200/70 mt-2 leading-relaxed">
              Dedicated logistics handling via Erode's central parcel lorries ensuring intact bale delivery anywhere in India within 48 hours.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
