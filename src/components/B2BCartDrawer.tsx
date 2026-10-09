import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types';
import { COMPANY_INFO } from '../data/products';
import { 
  X, 
  Trash2, 
  PhoneCall, 
  FileText, 
  Download, 
  Sparkles, 
  PackageCheck, 
  Truck, 
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import * as XLSX from 'xlsx';
import confetti from 'canvas-confetti';

interface B2BCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, bundles: number) => void;
  onRemoveItem: (productId: string) => void;
  onOpenInvoiceModal: (details: OrderDetails) => void;
}

export const B2BCartDrawer: React.FC<B2BCartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOpenInvoiceModal,
}) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    buyerName: '',
    businessName: '',
    gstNumber: '',
    phone: '',
    city: '',
    state: 'Tamil Nadu',
    dispatchTransport: 'VRL Logistics / ARC Lorry',
    notes: '',
  });

  if (!isOpen) return null;

  // Total Sarees and Bundles
  let totalSarees = 0;
  let totalBundles = 0;
  let subtotal = 0;
  let standardTotal = 0;

  cartItems.forEach(item => {
    const sarees = item.bundleQuantity * item.product.bundleSize;
    totalSarees += sarees;
    totalBundles += item.bundleQuantity;

    const appliedRate = sarees >= 100 
      ? item.product.tier100Rate 
      : sarees >= 50 
        ? item.product.tier50Rate 
        : item.product.pieceRate;
    
    subtotal += sarees * appliedRate;
    standardTotal += sarees * item.product.pieceRate;
  });

  const volumeSavings = standardTotal - subtotal;
  const gstAmount = Math.round(subtotal * 0.05); // 5% GST on cotton sarees
  const grandTotal = subtotal + gstAmount;

  // Export to Excel
  const handleExportCartExcel = () => {
    const list = cartItems.map(item => {
      const sarees = item.bundleQuantity * item.product.bundleSize;
      const appliedRate = sarees >= 100 
        ? item.product.tier100Rate 
        : sarees >= 50 
          ? item.product.tier50Rate 
          : item.product.pieceRate;
      
      return {
        'Design Code': item.product.code,
        'Description': item.product.title,
        'Fabric & Count': `${item.product.fabric} (${item.product.count})`,
        'Bundles': item.bundleQuantity,
        'Bundle Size (Pcs)': item.product.bundleSize,
        'Total Sarees': sarees,
        'Applied Rate / Pc (₹)': appliedRate,
        'Subtotal (₹)': sarees * appliedRate,
      };
    });

    const ws = XLSX.utils.json_to_sheet(list);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Wholesale_Cart');
    XLSX.writeFile(wb, `Sri_Syndicate_Cart_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // WhatsApp Order Submission
  const handleSendWhatsAppOrder = () => {
    if (!orderDetails.phone && !orderDetails.businessName) {
      alert('Please enter your Store Name and Phone Number so our factory can prepare your bale dispatch.');
      return;
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    let message = `*SRI SYNDICATE - B2B WHOLESALE ORDER INQUIRY*\n`;
    message += `------------------------------------\n`;
    message += `*Store / Buyer:* ${orderDetails.businessName || 'Retail Buyer'}\n`;
    message += `*Contact Person:* ${orderDetails.buyerName || 'N/A'}\n`;
    message += `*Phone:* ${orderDetails.phone}\n`;
    message += `*Destination City:* ${orderDetails.city || 'Tamil Nadu'}\n`;
    if (orderDetails.gstNumber) message += `*GSTIN:* ${orderDetails.gstNumber}\n`;
    message += `*Preferred Transport:* ${orderDetails.dispatchTransport}\n\n`;

    message += `*ORDERED LOTS & BALES:*\n`;
    cartItems.forEach((item, idx) => {
      const sarees = item.bundleQuantity * item.product.bundleSize;
      const appliedRate = sarees >= 100 
        ? item.product.tier100Rate 
        : sarees >= 50 
          ? item.product.tier50Rate 
          : item.product.pieceRate;
      message += `${idx + 1}. *[${item.product.code}]* ${item.product.title}\n`;
      message += `   ↳ ${item.bundleQuantity} Bundles (${sarees} Sarees) @ ₹${appliedRate}/pc = ₹${(sarees * appliedRate).toLocaleString('en-IN')}\n`;
    });

    message += `\n------------------------------------\n`;
    message += `*Total Sarees:* ${totalSarees} Pcs (${totalBundles} Bundles)\n`;
    message += `*Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n`;
    message += `*Estimated GST (5%):* ₹${gstAmount.toLocaleString('en-IN')}\n`;
    message += `*Total Order Value:* ₹${grandTotal.toLocaleString('en-IN')}\n`;
    message += `\n_Please confirm stock availability and send payment bank details for dispatch._`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Drawer Header */}
        <div className="px-6 py-5 bg-[#fbfbfd] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0d5940] text-lime-400 flex items-center justify-center shadow-md">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1d1d1f]">
                Wholesale Order Cart
              </h3>
              <p className="text-xs text-[#6e6e73]">
                {totalBundles} Bundles • {totalSarees} Cotton Sarees
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

        {/* Volume Tier Progress Banner */}
        <div className="px-6 py-3 bg-emerald-50/80 border-b border-emerald-200 text-xs">
          {totalSarees >= 100 ? (
            <div className="flex items-center gap-2 text-emerald-800 font-semibold">
              <Sparkles className="w-4 h-4 text-lime-600" />
              <span>Master Bale Tier Active! Best ex-factory rates applied across all lots.</span>
            </div>
          ) : totalSarees >= 50 ? (
            <div className="flex items-center justify-between text-emerald-800 font-semibold">
              <span>50+ Bulk Tier Active! Add {100 - totalSarees} more for Master Bale rate.</span>
              <span className="text-[10px] text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">Save more</span>
            </div>
          ) : (
            <div className="flex items-center justify-between text-[#0d5940] font-medium">
              <span>Add {50 - totalSarees} more sarees to unlock 50+ bulk piece discount.</span>
              <span className="text-[10px] text-emerald-700 font-bold bg-white px-2 py-0.5 rounded-full border border-emerald-200">Tier 1</span>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <PackageCheck className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-[#1d1d1f]">Your wholesale cart is empty</h4>
              <p className="text-xs text-[#6e6e73] max-w-xs mx-auto mt-1">
                Add bundles from the catalog or load presets from the Dexigmatic Excel Matrix to begin.
              </p>
            </div>
          ) : (
            cartItems.map((item) => {
              const itemSarees = item.bundleQuantity * item.product.bundleSize;
              const appliedRate = itemSarees >= 100 
                ? item.product.tier100Rate 
                : itemSarees >= 50 
                  ? item.product.tier50Rate 
                  : item.product.pieceRate;
              const itemTotal = itemSarees * appliedRate;

              return (
                <div
                  key={item.product.id}
                  className="p-4 rounded-2xl border border-slate-200/90 bg-[#fbfbfd] shadow-sm flex items-center gap-4 group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-[#0d5940]">
                        {item.product.code}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h4 className="text-xs font-bold text-[#1d1d1f] truncate">
                      {item.product.title}
                    </h4>

                    <div className="mt-1 flex items-center justify-between text-xs">
                      <span className="text-[#6e6e73]">
                        {itemSarees} Sarees @ ₹{appliedRate}/pc
                      </span>
                      <span className="font-extrabold text-[#0d5940]">
                        ₹{itemTotal.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Stepper */}
                    <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-[11px] text-[#6e6e73]">Bundles ({item.product.bundleSize} pcs each):</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.bundleQuantity - 1)}
                          className="w-6 h-6 rounded-md bg-white border border-slate-200 hover:bg-slate-100 text-[#1d1d1f] font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#1d1d1f]">
                          {item.bundleQuantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.bundleQuantity + 1)}
                          className="w-6 h-6 rounded-md bg-white border border-slate-200 hover:bg-slate-100 text-[#1d1d1f] font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Consignee / Retailer Details Form */}
          {cartItems.length > 0 && (
            <div className="mt-6 p-4 rounded-2xl bg-[#f5f5f7] border border-slate-200 text-xs space-y-3">
              <h5 className="font-bold text-[#1d1d1f] flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#0d5940]" />
                <span>Store Consignee &amp; Transport Details</span>
              </h5>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[#6e6e73] font-semibold block mb-0.5">Showroom / Store Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Meenakshi Silks"
                    value={orderDetails.businessName}
                    onChange={(e) => setOrderDetails({ ...orderDetails, businessName: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#6e6e73] font-semibold block mb-0.5">Contact Number *</label>
                  <input
                    type="text"
                    placeholder="e.g. 98401 23456"
                    value={orderDetails.phone}
                    onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[#6e6e73] font-semibold block mb-0.5">Destination City *</label>
                  <input
                    type="text"
                    placeholder="e.g. Coimbatore / Bengaluru"
                    value={orderDetails.city}
                    onChange={(e) => setOrderDetails({ ...orderDetails, city: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#6e6e73] font-semibold block mb-0.5">GST Number (Optional)</label>
                  <input
                    type="text"
                    placeholder="33AAAAA0000A1Z5"
                    value={orderDetails.gstNumber}
                    onChange={(e) => setOrderDetails({ ...orderDetails, gstNumber: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Order Summary & CTAs */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-[#fbfbfd] border-t border-slate-200 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#6e6e73]">
                <span>Total Quantity:</span>
                <span className="font-semibold text-[#1d1d1f]">{totalSarees} Sarees ({totalBundles} Bundles)</span>
              </div>
              <div className="flex justify-between text-[#6e6e73]">
                <span>Ex-Mill Subtotal:</span>
                <span className="font-semibold text-[#1d1d1f]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {volumeSavings > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Volume Bale Savings:</span>
                  <span>-₹{volumeSavings.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-[#6e6e73]">
                <span>GST (5% Textile Code 5208):</span>
                <span className="font-semibold text-[#1d1d1f]">₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#6e6e73]">
                <span>Bale Strapping &amp; Packaging:</span>
                <span className="font-semibold text-emerald-700">FREE</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-[#1d1d1f]">Estimated Payable:</span>
                <span className="text-xl font-extrabold text-[#0d5940]">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleSendWhatsAppOrder}
                className="w-full py-3.5 rounded-full bg-[#0d5940] hover:bg-[#0a3d2e] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-apple-card transition-all"
              >
                <PhoneCall className="w-4 h-4 text-lime-300" />
                <span>Send Order to Factory WhatsApp</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenInvoiceModal(orderDetails)}
                  className="py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#1d1d1f] font-semibold text-xs border border-slate-300 shadow-sm flex items-center justify-center gap-1.5 transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-[#1d4ed8]" />
                  <span>Proforma Invoice</span>
                </button>

                <button
                  onClick={handleExportCartExcel}
                  className="py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#1d1d1f] font-semibold text-xs border border-slate-300 shadow-sm flex items-center justify-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Export Excel</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
