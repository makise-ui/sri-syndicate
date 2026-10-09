import React, { useState } from 'react';
import { Calculator, TrendingUp, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ProfitCalculator: React.FC = () => {
  const [sareeCount, setSareeCount] = useState(100);
  const [retailSellPrice, setRetailSellPrice] = useState(790);

  // Compute rates
  const factoryPrice = sareeCount >= 100 ? 330 : sareeCount >= 50 ? 355 : 380;
  const middlemanPrice = 460; // typical broker / intermediate distributor price

  const totalFactoryCost = sareeCount * factoryPrice;
  const totalMiddlemanCost = sareeCount * middlemanPrice;
  const directFactorySavings = totalMiddlemanCost - totalFactoryCost;

  const totalRetailRevenue = sareeCount * retailSellPrice;
  const retailerGrossProfit = totalRetailRevenue - totalFactoryCost;
  const profitMarginPercent = Math.round((retailerGrossProfit / totalFactoryCost) * 100);

  return (
    <section id="calculator" className="py-16 lg:py-24 bg-[#f5f5f7] border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-[#0d5940]">
            B2B Economics
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
            Calculate Your Showroom Margin
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6e6e73]">
            See exactly how much profit your store generates by eliminating middleman distributors and buying directly from Sri Syndicate's Erode loom floor.
          </p>
        </div>

        <div className="bg-white rounded-apple-3xl shadow-apple-card border border-slate-200/90 max-w-4xl mx-auto p-6 sm:p-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            {/* Input Controls */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-[#1d1d1f]">
                    Planned Order Quantity (Sarees):
                  </label>
                  <span className="font-mono text-sm font-extrabold text-[#0d5940]">
                    {sareeCount} Sarees ({Math.ceil(sareeCount / 10)} Bundles)
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={sareeCount}
                  onChange={(e) => setSareeCount(parseInt(e.target.value))}
                  className="w-full accent-[#0d5940] h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#6e6e73] mt-1 font-mono">
                  <span>20 Pcs (2 Bdl)</span>
                  <span>100 Pcs (1 Master Bale)</span>
                  <span>500 Pcs (5 Bales)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-[#1d1d1f]">
                    Your Store Retail Selling Price:
                  </label>
                  <span className="font-mono text-sm font-extrabold text-[#1d4ed8]">
                    ₹{retailSellPrice} / saree
                  </span>
                </div>
                <input
                  type="range"
                  min="550"
                  max="1250"
                  step="20"
                  value={retailSellPrice}
                  onChange={(e) => setRetailSellPrice(parseInt(e.target.value))}
                  className="w-full accent-[#1d4ed8] h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#6e6e73] mt-1 font-mono">
                  <span>₹550 (Budget)</span>
                  <span>₹790 (Standard Boutique)</span>
                  <span>₹1,250 (Premium Showroom)</span>
                </div>
              </div>

              {/* Direct Comparison Badges */}
              <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#6e6e73]">Sri Syndicate Factory Rate:</span>
                  <span className="font-bold text-[#0d5940]">₹{factoryPrice} / pc</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6e6e73]">Regional Middleman Rate:</span>
                  <span className="line-through text-slate-400">₹{middlemanPrice} / pc</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-semibold text-emerald-700">
                  <span>Your Middleman Savings:</span>
                  <span>₹{directFactorySavings.toLocaleString('en-IN')} Saved</span>
                </div>
              </div>
            </div>

            {/* Results Bento Box */}
            <div className="rounded-apple-2xl bg-gradient-to-br from-[#0d5940] via-[#064e3b] to-[#1e3a8a] text-white p-6 sm:p-8 flex flex-col justify-between shadow-apple-card">
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-lime-400/20 text-lime-300 border border-lime-400/30">
                  Estimated Store Profits
                </span>
                
                <div className="mt-6">
                  <span className="text-xs text-emerald-200 block">Total Retailer Gross Margin:</span>
                  <div className="text-4xl font-extrabold text-white mt-1">
                    ₹{retailerGrossProfit.toLocaleString('en-IN')}
                  </div>
                  <span className="inline-block mt-1 text-xs font-bold text-lime-300">
                    +{profitMarginPercent}% Return on Inventory Investment
                  </span>
                </div>

                <div className="mt-6 pt-6 border-t border-emerald-700/60 space-y-2 text-xs">
                  <div className="flex justify-between text-emerald-100">
                    <span>Loom Floor Procurement:</span>
                    <span>₹{totalFactoryCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-emerald-100">
                    <span>Retail Revenue Projection:</span>
                    <span>₹{totalRetailRevenue.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-lime-300 font-bold pt-1">
                    <span>Direct Factory Advantage:</span>
                    <span>+₹{directFactorySavings.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-emerald-700/60 flex items-center gap-2 text-[11px] text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-lime-400 flex-shrink-0" />
                <span>Zero commission overheads. Transparent GST tax invoices.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
