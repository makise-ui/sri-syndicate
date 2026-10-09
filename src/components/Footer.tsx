import React from 'react';
import { COMPANY_INFO } from '../data/products';
import { Phone, Mail, MapPin, ShieldCheck, Clock, FileSpreadsheet, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenMatrix: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenMatrix, onNavigate }) => {
  return (
    <footer id="contact" className="bg-[#1d1d1f] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0d5940] flex items-center justify-center border border-lime-400">
                <span className="font-serif text-white font-extrabold text-xl">SS</span>
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  {COMPANY_INFO.name}
                </span>
                <p className="text-xs text-lime-400 font-medium">
                  {COMPANY_INFO.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Established manufacturing house in Erode, Tamil Nadu. Producing high-count pure combed cotton, Chettinad borders, and hi-fancy sarees for showroom retailers nationwide.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Cell: {COMPANY_INFO.phone1} | Tel: {COMPANY_INFO.phone2}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-mono">GSTIN: {COMPANY_INFO.gstin}</span>
              </div>
            </div>
          </div>

          {/* Quick Wholesale Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Wholesale Navigation
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">
                  Wholesale Saree Catalog
                </button>
              </li>
              <li>
                <button onClick={onOpenMatrix} className="hover:text-white transition-colors flex items-center gap-1.5 text-lime-400">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Dexigmatic Excel Matrix</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('warehouse')} className="hover:text-white transition-colors">
                  Kottai Warehouse &amp; Loom Floor
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('vision-mission')} className="hover:text-white transition-colors">
                  Vision &amp; Mission Statements
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('calculator')} className="hover:text-white transition-colors">
                  Retailer Margin Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Fabrics & Weaves */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Weave Specializations
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>80s x 80s Combed Mercerized Cotton</li>
              <li>100s Featherlight Kottai Handloom</li>
              <li>Traditional Temple Korvai Borders</li>
              <li>Chettinad Kandaangi Bold Checks</li>
              <li>Hi-Fancy Mulmul Botanical Prints</li>
              <li>Linen-Cotton Fusion Office Wear</li>
              <li>Madurai &amp; Erode Hybrid Sungudi</li>
            </ul>
          </div>

          {/* Factory Visiting & Dispatch */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Factory Visiting Info
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Outstation wholesale buyers arriving at <strong>Erode Junction (ED)</strong> or Central Bus Stand can visit our Kottai office within 10 minutes.
            </p>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-lime-300">
                <Clock className="w-3.5 h-3.5" />
                <span>Operating Hours:</span>
              </div>
              <p>Monday - Saturday: 9:00 AM – 8:30 PM</p>
              <p>Sunday: By Appointment for Bale Buyers</p>
            </div>
          </div>

        </div>

        {/* Wholesale Clarification Notice */}
        <div className="py-6 border-b border-slate-800/80 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-4">
          <p>
            <strong>Strictly Wholesale Policy:</strong> Sri Syndicate manufactures exclusively for wholesale distribution. We do not retail individual sarees or process single-piece orders. Minimum Order Quantity is 1 Bundle (10 Sarees).
          </p>
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%20Sri%20Syndicate,%20I%20want%20to%20visit%20your%20Kottai%20warehouse%20in%20Erode.`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            <span>Book Showroom Visit via WhatsApp</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SRI SYNDICATE, Erode. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Mfrs. of Hi-Fancy &amp; Hand Loom Cotton Sarees</span>
            <span>•</span>
            <span>GST Registered B2B Enterprise</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
