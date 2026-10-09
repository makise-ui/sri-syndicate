import React, { useState } from 'react';
import { Product } from '../types';
import { WHOLESALE_PRODUCTS, COMPANY_INFO } from '../data/products';
import { 
  FileSpreadsheet, 
  Download, 
  ShoppingCart, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  X,
  Plus,
  Minus
} from 'lucide-react';
import * as XLSX from 'xlsx';

interface DexigmaticBulkMatrixProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMultipleToCart: (orders: { product: Product; bundles: number }[]) => void;
}

export const DexigmaticBulkMatrix: React.FC<DexigmaticBulkMatrixProps> = ({
  isOpen,
  onClose,
  onAddMultipleToCart,
}) => {
  // Store bundle quantities per product ID
  const [quantities, setQuantities] = useState<{ [productId: string]: number }>({
    'prod-01': 2,
    'prod-02': 1,
    'prod-03': 0,
    'prod-04': 1,
    'prod-05': 0,
    'prod-06': 0,
    'prod-07': 0,
    'prod-08': 0,
  });

  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleQtyChange = (productId: string, val: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, val)
    }));
  };

  const handleQuickPreset = (type: 'bale' | 'sample' | 'clear') => {
    const updated: { [key: string]: number } = {};
    WHOLESALE_PRODUCTS.forEach(p => {
      if (type === 'bale') {
        // 10 bundles of 10 = 100 sarees bale
        updated[p.id] = Math.ceil(100 / p.bundleSize);
      } else if (type === 'sample') {
        // 1 bundle of each
        updated[p.id] = 1;
      } else {
        updated[p.id] = 0;
      }
    });
    setQuantities(updated);
  };

  // Compute live calculations
  let grandTotalSarees = 0;
  let grandTotalBundles = 0;
  let grandSubtotalAmount = 0;

  const rowsData = WHOLESALE_PRODUCTS.map(product => {
    const bundles = quantities[product.id] || 0;
    const sarees = bundles * product.bundleSize;
    
    // Tiered pricing
    const appliedPieceRate = sarees >= 100
      ? product.tier100Rate
      : sarees >= 50
        ? product.tier50Rate
        : product.pieceRate;
    
    const rowTotal = sarees * appliedPieceRate;

    grandTotalSarees += sarees;
    grandTotalBundles += bundles;
    grandSubtotalAmount += rowTotal;

    return {
      product,
      bundles,
      sarees,
      appliedPieceRate,
      rowTotal,
    };
  });

  // Export to authentic Excel (.xlsx) file
  const handleExportExcel = () => {
    const activeRows = rowsData.filter(r => r.bundles > 0);
    const exportList = (activeRows.length > 0 ? activeRows : rowsData).map(r => ({
      'Item Code': r.product.code,
      'Product Description': r.product.title,
      'Fabric & Weave': `${r.product.fabric} (${r.product.count})`,
      'Bundle Size (Pcs)': r.product.bundleSize,
      'Standard Rate/Pc (₹)': r.product.pieceRate,
      'Applied Rate/Pc (₹)': r.appliedPieceRate,
      'Ordered Bundles': r.bundles,
      'Total Sarees': r.sarees,
      'Estimated Amount (₹)': r.rowTotal,
    }));

    const ws = XLSX.utils.json_to_sheet(exportList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Wholesale_Order_Sheet');
    
    XLSX.writeFile(wb, `Sri_Syndicate_Bulk_Order_${new Date().toISOString().split('T')[0]}.xlsx`);

    setNotification('Excel Order Sheet generated and downloaded successfully!');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleApplyToCart = () => {
    const itemsToAdd = rowsData
      .filter(r => r.bundles > 0)
      .map(r => ({ product: r.product, bundles: r.bundles }));

    if (itemsToAdd.length === 0) {
      alert('Please specify at least 1 bundle in the table before transferring to cart.');
      return;
    }

    onAddMultipleToCart(itemsToAdd);
    setNotification(`Transferred ${grandTotalSarees} sarees across ${itemsToAdd.length} designs to your B2B Cart.`);
    setTimeout(() => {
      setNotification(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-apple-3xl shadow-2xl border border-slate-200/90 w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-slate-200 bg-[#fbfbfd] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0d5940] text-lime-400 flex items-center justify-center shadow-md">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-[#1d1d1f]">
                  Dexigmatic Bulk Order Matrix
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-[#0d5940]">
                  Live Spreadsheet Engine
                </span>
              </div>
              <p className="text-xs text-[#6e6e73]">
                Direct spreadsheet procurement. Enter bundle counts across designs and instantly export Excel or sync with B2B Cart.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f5f5f7] hover:bg-slate-200 text-[#6e6e73] hover:text-[#1d1d1f] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls & Presets */}
        <div className="px-6 py-3 bg-[#f5f5f7] border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#6e6e73] font-semibold">Quick Matrix Presets:</span>
            <button
              onClick={() => handleQuickPreset('sample')}
              className="px-3 py-1 rounded-full bg-white hover:bg-emerald-50 text-[#0d5940] font-semibold border border-slate-200 shadow-sm transition-all"
            >
              1 Bundle Sample of Each (80 Pcs)
            </button>
            <button
              onClick={() => handleQuickPreset('bale')}
              className="px-3 py-1 rounded-full bg-white hover:bg-blue-50 text-blue-700 font-semibold border border-slate-200 shadow-sm transition-all"
            >
              100-Pc Master Bale Assortment
            </button>
            <button
              onClick={() => handleQuickPreset('clear')}
              className="px-2.5 py-1 rounded-full text-[#6e6e73] hover:text-red-600 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportExcel}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-emerald-50 text-[#0d5940] font-semibold border border-emerald-300 shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Excel (.xlsx)</span>
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="mx-6 mt-3 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Spreadsheet Table View */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 bg-slate-50 text-[#6e6e73] uppercase font-bold text-[11px] tracking-wider">
                <th className="py-3 px-3">Design Code</th>
                <th className="py-3 px-3">Fabric &amp; Weave</th>
                <th className="py-3 px-3 text-center">Bundle Size</th>
                <th className="py-3 px-3 text-right">Standard Rate</th>
                <th className="py-3 px-3 text-center">Order Bundles</th>
                <th className="py-3 px-3 text-center">Total Sarees</th>
                <th className="py-3 px-3 text-right">Applied Rate</th>
                <th className="py-3 px-3 text-right">Line Total (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rowsData.map(({ product, bundles, sarees, appliedPieceRate, rowTotal }) => (
                <tr 
                  key={product.id}
                  className={`hover:bg-slate-50/80 transition-colors ${bundles > 0 ? 'bg-emerald-50/30' : ''}`}
                >
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-[#0d5940] block">
                      {product.code}
                    </span>
                    <span className="text-[#1d1d1f] font-semibold block text-xs">
                      {product.title}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-[#6e6e73]">
                    <span className="block text-[#1d1d1f]">{product.fabric}</span>
                    <span className="text-[11px]">{product.count}</span>
                  </td>

                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 rounded-md bg-[#f5f5f7] text-[#1d1d1f] font-semibold border border-slate-200/80">
                      {product.bundleSize} Pcs
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right font-medium text-[#6e6e73]">
                    ₹{product.pieceRate}
                  </td>

                  {/* Bundles Input Stepper */}
                  <td className="py-3 px-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleQtyChange(product.id, bundles - 1)}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-[#6e6e73]"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={bundles}
                        onChange={(e) => handleQtyChange(product.id, parseInt(e.target.value) || 0)}
                        className="w-12 h-7 text-center font-bold text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                      />
                      <button
                        onClick={() => handleQtyChange(product.id, bundles + 1)}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-[#6e6e73]"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-center">
                    <span className={`font-bold ${sarees > 0 ? 'text-[#0d5940]' : 'text-slate-400'}`}>
                      {sarees}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <span className="font-semibold text-[#1d1d1f]">
                      ₹{appliedPieceRate}
                    </span>
                    {appliedPieceRate < product.pieceRate && (
                      <span className="block text-[10px] text-emerald-600 font-bold">
                        Bale Discount!
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-right">
                    <span className={`font-extrabold ${rowTotal > 0 ? 'text-[#0d5940] text-sm' : 'text-slate-400'}`}>
                      ₹{rowTotal.toLocaleString('en-IN')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Summary & Cart Sync */}
        <div className="px-6 py-4 bg-[#fbfbfd] border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-[11px] text-[#6e6e73] uppercase font-bold tracking-wider block">Total Bundles</span>
              <span className="text-xl font-extrabold text-[#1d1d1f]">{grandTotalBundles}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#6e6e73] uppercase font-bold tracking-wider block">Total Sarees</span>
              <span className="text-xl font-extrabold text-[#0d5940]">{grandTotalSarees}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#6e6e73] uppercase font-bold tracking-wider block">Estimated Total</span>
              <span className="text-2xl font-extrabold text-[#1d1d1f]">
                ₹{grandSubtotalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportExcel}
              className="px-4 py-2.5 rounded-full bg-white hover:bg-[#f5f5f7] text-[#1d1d1f] font-semibold text-xs border border-slate-300 shadow-sm flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
              <span>Download Excel</span>
            </button>

            <button
              onClick={handleApplyToCart}
              disabled={grandTotalSarees === 0}
              className={`px-6 py-2.5 rounded-full font-semibold text-xs shadow-md flex items-center gap-2 transition-all ${
                grandTotalSarees > 0
                  ? 'bg-[#0d5940] hover:bg-[#0a3d2e] text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-4 h-4 text-lime-300" />
              <span>Sync {grandTotalSarees} Sarees to B2B Cart</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
