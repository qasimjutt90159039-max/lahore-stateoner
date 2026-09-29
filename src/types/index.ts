export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: string;
  subcategory: string;
  brand: string;
  description: string;
  shortDescription: string;
  price: number;
  wholesalePrice: number;
  compareAtPrice: number;
  discount?: number;
  stock: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  unit: string;
  packSize: string;
  minWholesaleQty?: number;
  images: string[];
  thumbnail: string;
  rating: number;
  reviewsCount: number;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  wholesaleAvailable: boolean;
  tags: string[];
  specifications: Record<string, string>;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  productCount: number;
  bannerImage: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  companyName?: string;
  address?: string;
  city?: string;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  isWholesaleTier?: boolean;
  unitPrice: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  packSize: string;
  thumbnail: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  area?: string;
  postalCode?: string;
  orderNotes?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'Cash on Delivery';
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Ready' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

export interface WholesaleRequest {
  id: string;
  buyerName: string;
  businessName: string;
  phone: string;
  email?: string;
  requiredProducts: string;
  quantityEstimate: string;
  message: string;
  status: 'New' | 'Contacted' | 'Quoted' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
}

export interface AdminSettings {
  storeName: string;
  phone: string;
  address: string;
  email: string;
  businessHours: string;
  facebookUrl: string;
  instagramUrl: string;
  announcementText: string;
  minimumWholesaleOrderValue: number;
  defaultDeliveryFee: number;
  freeDeliveryThreshold: number;
  priceNotice: string;
}
