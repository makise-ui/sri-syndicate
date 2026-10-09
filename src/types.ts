export interface Product {
  id: string;
  code: string;
  title: string;
  category: 'handloom' | 'hi-fancy' | 'temple-border' | 'linen-cotton' | 'daily-wear';
  fabric: string;
  count: string;
  length: string;
  blouse: string;
  colorsInBundle: string[];
  pieceRate: number; // e.g. 380 per saree
  bundleSize: number; // e.g. 10 sarees per bundle
  bundleRate: number; // e.g. 3800
  tier50Rate: number; // rate per piece for 50+ pcs
  tier100Rate: number; // rate per piece for 100+ pcs (bale)
  moq: number; // minimum order quantity in bundles
  image: string;
  badge?: string;
  description: string;
  inStockBales: number;
}

export interface CartItem {
  product: Product;
  bundleQuantity: number; // number of bundles ordered
  selectedColorOption?: string;
}

export interface OrderDetails {
  buyerName: string;
  businessName: string;
  gstNumber?: string;
  phone: string;
  city: string;
  state: string;
  dispatchTransport?: string;
  notes?: string;
}
