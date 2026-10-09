import React, { useRef } from 'react';
import { CartItem, OrderDetails } from '../types';
import { COMPANY_INFO } from '../data/products';
import { X, Printer, Download, CheckCircle, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProformaInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  orderDetails: OrderDetails;
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
  totalSarees: number;
}

export const ProformaInvoiceModal: React.FC<ProformaInvoiceModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  orderDetails,
  subtotal,
  gstAmount,
  grandTotal,
  totalSarees,
}) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const invoiceNumber = `SS-PO-${Math.floor(100000 + Math.random() * 900000)}`;
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const handlePrint = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-apple-3xl shadow-2xl border border-slate-200/90 w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden">
        
        {/* Top Action Bar */}
        <div className="px-6 py-4 bg-[#fbfbfd] border-b border-slate-200 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#0d5940]" />
            <h3 className="text-base font-bold text-[#1d1d1f]">
              Official Wholesale Proforma Invoice &amp; Quotation
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-full bg-[#0d5940] hover:bg-[#0a3d2e] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-slate-200 text-[#6e6e73] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div ref={invoiceRef} className="p-8 sm:p-12 overflow-y-auto text-xs font-sans text-slate-800 bg-white">
          
          {/* Letterhead */}
          <div className="border-b-2 border-[#0d5940] pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0a3d2e] flex items-center justify-center border-2 border-lime-400">
                <span className="font-serif text-white font-extrabold text-2xl">SS</span>
              </div>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-[#0a3d2e]">
                  {COMPANY_INFO.name}
                </h1>
                <p className="text-xs font-semibold text-[#15803d]">
                  {COMPANY_INFO.tagline}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {COMPANY_INFO.address}
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-[#0d5940] font-bold text-xs border border-emerald-200">
                PROFORMA INVOICE
              </span>
              <p className="font-mono text-xs font-bold text-slate-700 mt-2">
                Invoice No: {invoiceNumber}
              </p>
              <p className="text-slate-500 text-[11px]">Date: {currentDate}</p>
              <p className="font-mono text-[11px] font-semibold text-slate-600 mt-1">
                GSTIN: <span className="font-bold text-slate-900">{COMPANY_INFO.gstin}</span>
              </p>
            </div>
          </div>

          {/* Buyer & Consignee Info */}
          <div className="grid grid-cols-2 gap-6 my-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Consignee / B2B Buyer:
              </p>
              <p className="text-sm font-bold text-slate-900 mt-1">
                {orderDetails.businessName || 'Valued Retail Partner'}
              </p>
              <p className="text-xs text-slate-600">
                Contact: {orderDetails.buyerName || 'Store Representative'} ({orderDetails.phone || 'Contact provided'})
              </p>
              <p className="text-xs text-slate-600">
                Destination: {orderDetails.city || 'Store City'}, {orderDetails.state || 'India'}
              </p>
              {orderDetails.gstNumber && (
                <p className="text-xs font-mono font-semibold text-slate-700 mt-1">
                  Buyer GST: {orderDetails.gstNumber}
                </p>
              )}
            </div>

            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Dispatch &amp; Logistics Hub:
              </p>
              <p className="text-xs font-semibold text-slate-800 mt-1">
                Lorry Transport: {orderDetails.dispatchTransport || 'Erode Goods Central Booking'}
              </p>
              <p className="text-xs text-slate-500">
                Delivery: Door Delivery / Godown Delivery as per LR
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Packaging: Gunny Bales with Waterproof Liner
              </p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full text-left border-collapse border border-slate-200 my-4 text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-2.5">S.No</th>
                <th className="p-2.5">Design Code &amp; Description</th>
                <th className="p-2.5">Fabric Specification</th>
                <th className="p-2.5 text-center">Bundles</th>
                <th className="p-2.5 text-center">Sarees</th>
                <th className="p-2.5 text-right">Rate / Pc</th>
                <th className="p-2.5 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {cartItems.map((item, index) => {
                const itemSarees = item.bundleQuantity * item.product.bundleSize;
                const appliedRate = itemSarees >= 100 
                  ? item.product.tier100Rate 
                  : itemSarees >= 50 
                    ? item.product.tier50Rate 
                    : item.product.pieceRate;
                const rowTotal = itemSarees * appliedRate;

                return (
                  <tr key={item.product.id}>
                    <td className="p-2.5 text-slate-500">{index + 1}</td>
                    <td className="p-2.5 font-medium text-slate-900">
                      <span className="font-mono font-bold text-[#0d5940] mr-1">
                        [{item.product.code}]
                      </span>
                      {item.product.title}
                    </td>
                    <td className="p-2.5 text-slate-600">
                      {item.product.fabric} ({item.product.count})
                    </td>
                    <td className="p-2.5 text-center font-semibold">
                      {item.bundleQuantity}
                    </td>
                    <td className="p-2.5 text-center font-bold text-slate-900">
                      {itemSarees}
                    </td>
                    <td className="p-2.5 text-right font-medium">
                      ₹{appliedRate}
                    </td>
                    <td className="p-2.5 text-right font-bold text-slate-900">
                      ₹{rowTotal.toLocaleString('en-IN')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Calculations / Summary */}
          <div className="flex justify-end my-6">
            <div className="w-72 space-y-2 border-t border-slate-200 pt-3">
              <div className="flex justify-between text-slate-600">
                <span>Total Sarees:</span>
                <span className="font-bold text-slate-900">{totalSarees} Pcs</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Ex-Mill Subtotal:</span>
                <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (5% Textile Code 5208):</span>
                <span className="font-semibold text-slate-900">₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Bale Strapping &amp; Packaging:</span>
                <span className="font-semibold text-emerald-700">FREE</span>
              </div>
              <div className="flex justify-between pt-2 border-t-2 border-slate-900 text-sm font-extrabold text-[#0d5940]">
                <span>Total Payable:</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Terms & Bank Details */}
          <div className="mt-8 pt-6 border-t border-slate-200 grid sm:grid-cols-2 gap-6 text-[11px] text-slate-500">
            <div>
              <p className="font-bold text-slate-700 uppercase tracking-wider mb-1">
                Bank &amp; Payment Details:
              </p>
              <p>Account Name: SRI SYNDICATE</p>
              <p>Bank: State Bank of India / HDFC Bank, Erode Branch</p>
              <p>Payment Mode: RTGS / NEFT / IMPS / UPI</p>
              <p>Cell Contact: +91 99655 90376</p>
            </div>

            <div>
              <p className="font-bold text-slate-700 uppercase tracking-wider mb-1">
                Wholesale Dispatch Terms:
              </p>
              <p>1. 100% advance or LR against payment for outstation delivery.</p>
              <p>2. Goods dispatched via buyer's preferred parcel transport.</p>
              <p>3. Subject to Erode Jurisdiction.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
