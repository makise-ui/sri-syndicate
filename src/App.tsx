import React, { useState } from 'react';
import { Product, CartItem, OrderDetails } from './types';
import { WHOLESALE_PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WarehouseSpotlight } from './components/WarehouseSpotlight';
import { ProductCatalog } from './components/ProductCatalog';
import { DexigmaticBulkMatrix } from './components/DexigmaticBulkMatrix';
import { ProductDetailModal } from './components/ProductDetailModal';
import { B2BCartDrawer } from './components/B2BCartDrawer';
import { ProformaInvoiceModal } from './components/ProformaInvoiceModal';
import { VisionMission } from './components/VisionMission';
import { ProfitCalculator } from './components/ProfitCalculator';
import { Footer } from './components/Footer';

export function App() {
  // Preload a sample bundle in the cart for immediate visual impact
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: WHOLESALE_PRODUCTS[0], // Erode 80s Combed Cotton Temple Border
      bundleQuantity: 2, // 2 bundles = 20 sarees
    },
    {
      product: WHOLESALE_PRODUCTS[1], // Hi-Fancy Hand Block Floral Cotton
      bundleQuantity: 1, // 1 bundle = 10 sarees
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const [currentOrderDetails, setCurrentOrderDetails] = useState<OrderDetails>({
    buyerName: 'K. Rajagopalan',
    businessName: 'Sri Krishna Textiles & Silks',
    gstNumber: '33AABCS1234F1Z9',
    phone: '98401 23456',
    city: 'Madurai',
    state: 'Tamil Nadu',
    dispatchTransport: 'VRL Logistics / ARC Goods Booking',
  });

  // Calculate totals
  let totalSarees = 0;
  let subtotal = 0;
  cartItems.forEach(item => {
    const sarees = item.bundleQuantity * item.product.bundleSize;
    totalSarees += sarees;
    const appliedRate = sarees >= 100 
      ? item.product.tier100Rate 
      : sarees >= 50 
        ? item.product.tier50Rate 
        : item.product.pieceRate;
    subtotal += sarees * appliedRate;
  });
  const gstAmount = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gstAmount;

  // Cart operations
  const handleAddToCart = (product: Product, bundles: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, bundleQuantity: item.bundleQuantity + bundles }
            : item
        );
      }
      return [...prev, { product, bundleQuantity: bundles }];
    });
  };

  const handleAddMultipleToCart = (orders: { product: Product; bundles: number }[]) => {
    setCartItems(prev => {
      const updated = [...prev];
      orders.forEach(order => {
        const index = updated.findIndex(item => item.product.id === order.product.id);
        if (index > -1) {
          updated[index].bundleQuantity += order.bundles;
        } else {
          updated.push({ product: order.product, bundleQuantity: order.bundles });
        }
      });
      return updated;
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, bundles: number) => {
    if (bundles <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, bundleQuantity: bundles } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleOpenInvoiceModal = (details: OrderDetails) => {
    setCurrentOrderDetails(details);
    setIsInvoiceModalOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfd] text-[#1d1d1f]">
      {/* Apple-grade Frosted Navbar */}
      <Navbar
        cartCount={cartItems.length}
        totalSarees={totalSarees}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMatrix={() => setIsMatrixOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreCatalog={() => handleNavigate('catalog')}
          onOpenMatrix={() => setIsMatrixOpen(true)}
          onViewWarehouse={() => handleNavigate('warehouse')}
        />

        {/* Real Warehouse & Factory Tour Section */}
        <WarehouseSpotlight />

        {/* Wholesale Product Catalog */}
        <ProductCatalog
          onAddToCart={handleAddToCart}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />

        {/* Vision & Mission Section */}
        <VisionMission />

        {/* B2B Margin & Bale Savings Calculator */}
        <ProfitCalculator />
      </main>

      {/* Footer */}
      <Footer
        onOpenMatrix={() => setIsMatrixOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Dexigmatic Excel Matrix Modal */}
      <DexigmaticBulkMatrix
        isOpen={isMatrixOpen}
        onClose={() => setIsMatrixOpen(false)}
        onAddMultipleToCart={handleAddMultipleToCart}
      />

      {/* Product Detail & Spec Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* B2B Cart Drawer */}
      <B2BCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenInvoiceModal={handleOpenInvoiceModal}
      />

      {/* Official Proforma Invoice Sheet Modal */}
      <ProformaInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        cartItems={cartItems}
        orderDetails={currentOrderDetails}
        subtotal={subtotal}
        gstAmount={gstAmount}
        grandTotal={grandTotal}
        totalSarees={totalSarees}
      />
    </div>
  );
}

export default App;
