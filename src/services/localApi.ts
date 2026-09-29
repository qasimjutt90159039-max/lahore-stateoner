import { Product, Category, Order, WholesaleRequest, Review, AdminSettings, User } from '../types/index.js';
import { getAllSeedProducts } from '../data/allProducts.js';
import { initialCategories } from '../data/categoriesData.js';

// Default Admin Settings
const defaultSettings: AdminSettings = {
  storeName: 'Lahore Stationers Mall',
  phone: '+92 323 4304600',
  address: 'Kabeer Street, Urdu Bazar, Lahore 54000, Pakistan',
  email: 'admin@lahorestationers.com',
  businessHours: 'Mon - Sat: 9:00 AM - 8:30 PM (Sunday Closed)',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  announcementText: 'Wholesale Stationery • Kabeer Street, Urdu Bazar Lahore • Cash on Delivery & Bulk Quotations Available',
  minimumWholesaleOrderValue: 5000,
  defaultDeliveryFee: 200,
  freeDeliveryThreshold: 4000,
  priceNotice: 'Prices and availability may change. Please confirm before final purchase.'
};

const defaultOrders: Order[] = [
  {
    id: 'ord-001',
    orderNumber: 'LSM-2026-00001',
    customerName: 'Muhammad Tariq',
    phone: '+92 300 1234567',
    email: 'customer.sample@gmail.com',
    address: 'House 14-B, Street 3, Model Town',
    city: 'Lahore',
    area: 'Model Town',
    postalCode: '54700',
    orderNotes: 'Please deliver during office hours.',
    items: [
      {
        productId: 'lsm-001',
        productName: 'Dollar Ball Pen',
        sku: 'LSM-PEN-DOL-001',
        unitPrice: 30,
        quantity: 10,
        totalPrice: 300,
        packSize: '10 Pieces Pack',
        thumbnail: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=700&q=80'
      }
    ],
    subtotal: 300,
    discount: 0,
    deliveryFee: 200,
    total: 500,
    paymentMethod: 'Cash on Delivery',
    status: 'Delivered',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

const defaultReviews: Review[] = [
  {
    id: 'rev-001',
    productId: 'lsm-001',
    userName: 'Hamza Khan',
    rating: 5,
    comment: 'Genuine Dollar pens received in pristine packaging. Best price in Urdu Bazar.',
    verifiedPurchase: true,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'rev-002',
    productId: 'lsm-048',
    userName: 'Zubair Printing Press',
    rating: 5,
    comment: 'High quality copy paper with zero jam on heavy office laser copier. Will order in cartons next time.',
    verifiedPurchase: true,
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
  }
];

const defaultWholesale: WholesaleRequest[] = [
  {
    id: 'whs-001',
    buyerName: 'Akhtar Hussain',
    businessName: 'Al-Hadi Grammar School & Academy',
    phone: '+92 321 9876543',
    email: 'principal@alhadi.edu.pk',
    requiredProducts: '500x Bahdur A4 Notebooks, 100x Dux Geometry Boxes, 20x Reams Copy Paper',
    quantityEstimate: 'Bulk Academic Session Requirement',
    message: 'Looking for best wholesale rates for our upcoming 2026 school term.',
    status: 'Quoted',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  }
];

// Helper to safely read from localStorage
function getLocal<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(`lsm_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

// Helper to safely write to localStorage
function setLocal<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`lsm_${key}`, JSON.stringify(data));
  } catch (err) {
    console.warn(`[LocalApi] Failed to save ${key} to localStorage:`, err);
  }
}

class LocalApiService {
  private products: Product[] = [];
  private categories: Category[] = initialCategories;

  constructor() {
    this.init();
  }

  private init() {
    const seed = getAllSeedProducts();
    // Invalidate old cache so visitors immediately see new realistic images
    try {
      if (typeof window !== 'undefined' && localStorage.getItem('lsm_products_v3') !== 'true') {
        localStorage.removeItem('lsm_products');
        localStorage.setItem('lsm_products_v3', 'true');
      }
    } catch {}

    const stored = getLocal<Product[]>('products', []);
    if (!stored || stored.length < 130) {
      this.products = seed;
      setLocal('products', this.products);
    } else {
      this.products = stored;
    }
  }

  // --- PRODUCTS ---
  getProducts(query: Record<string, string | null | undefined> = {}) {
    let list = [...this.products];

    const category = query.category;
    const brand = query.brand;
    const search = query.search;
    const minPrice = query.minPrice;
    const maxPrice = query.maxPrice;
    const stockStatus = query.stockStatus;
    const wholesaleAvailable = query.wholesaleAvailable;
    const featured = query.featured;
    const bestSeller = query.bestSeller;
    const newArrival = query.newArrival;
    const sort = query.sort;
    const page = parseInt(query.page || '1', 10) || 1;
    const limit = parseInt(query.limit || '24', 10) || 24;

    // Filter Category
    if (category) {
      const catLower = category.toLowerCase();
      list = list.filter(p =>
        p.category.toLowerCase().includes(catLower) ||
        p.slug.toLowerCase().includes(catLower)
      );
    }

    // Filter Brand
    if (brand) {
      list = list.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    }

    // Search
    if (search) {
      const q = search.toLowerCase().trim();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Price
    if (minPrice) {
      list = list.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      list = list.filter(p => p.price <= Number(maxPrice));
    }

    // Stock Status
    if (stockStatus) {
      list = list.filter(p => p.stockStatus === stockStatus);
    }

    // Wholesale Available
    if (wholesaleAvailable === 'true') {
      list = list.filter(p => p.wholesaleAvailable);
    }

    // Badges
    if (featured === 'true') {
      list = list.filter(p => p.featured);
    }
    if (bestSeller === 'true') {
      list = list.filter(p => p.bestSeller);
    }
    if (newArrival === 'true') {
      list = list.filter(p => p.newArrival);
    }

    // Sorting
    if (sort === 'price_asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'best_seller') {
      list.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
    }

    const total = list.length;
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + limit);

    return {
      products: paginated,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  getProductByIdOrSlug(idOrSlug: string): Product | null {
    const prod = this.products.find(p => p.slug === idOrSlug || p.id === idOrSlug);
    return prod || null;
  }

  createProduct(data: Omit<Product, 'id' | 'createdAt'>): Product {
    const newProd: Product = {
      ...data,
      id: 'lsm-' + String(Date.now()).slice(-6),
      createdAt: new Date().toISOString()
    };
    this.products.unshift(newProd);
    setLocal('products', this.products);
    return newProd;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.products[idx] = { ...this.products[idx], ...updates };
    setLocal('products', this.products);
    return this.products[idx];
  }

  deleteProduct(id: string): boolean {
    const initLen = this.products.length;
    this.products = this.products.filter(p => p.id !== id);
    if (this.products.length !== initLen) {
      setLocal('products', this.products);
      return true;
    }
    return false;
  }

  // --- CATEGORIES ---
  getCategories(): Category[] {
    return this.categories;
  }

  // --- REVIEWS ---
  getReviews(productId: string): Review[] {
    const all = getLocal<Review[]>('reviews', defaultReviews);
    return all.filter(r => r.productId === productId);
  }

  addReview(productId: string, userName: string, rating: number, comment: string): Review {
    const all = getLocal<Review[]>('reviews', defaultReviews);
    const newRev: Review = {
      id: 'rev-' + Date.now(),
      productId,
      userName,
      rating,
      comment,
      verifiedPurchase: true,
      createdAt: new Date().toISOString()
    };
    all.unshift(newRev);
    setLocal('reviews', all);

    // Update product rating
    const prod = this.products.find(p => p.id === productId);
    if (prod) {
      const prodReviews = all.filter(r => r.productId === productId);
      const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
      prod.rating = Number(avg.toFixed(1));
      prod.reviewsCount = prodReviews.length;
      setLocal('products', this.products);
    }
    return newRev;
  }

  // --- ORDERS ---
  getOrders(userId?: string): Order[] {
    const all = getLocal<Order[]>('orders', defaultOrders);
    if (userId) {
      return all.filter(o => o.userId === userId);
    }
    return all;
  }

  getOrderById(id: string): Order | null {
    const all = getLocal<Order[]>('orders', defaultOrders);
    return all.find(o => o.id === id || o.orderNumber === id) || null;
  }

  createOrder(data: any): Order {
    const all = getLocal<Order[]>('orders', defaultOrders);
    const orderNumber = `LSM-2026-${String(all.length + 1).padStart(5, '0')}`;
    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber,
      paymentMethod: 'Cash on Delivery',
      status: 'Pending',
      createdAt: new Date().toISOString(),
      ...data
    };
    all.unshift(newOrder);
    setLocal('orders', all);
    return newOrder;
  }

  updateOrderStatus(id: string, status: Order['status']): Order | null {
    const all = getLocal<Order[]>('orders', defaultOrders);
    const ord = all.find(o => o.id === id || o.orderNumber === id);
    if (!ord) return null;
    ord.status = status;
    setLocal('orders', all);
    return ord;
  }

  // --- WHOLESALE ---
  getWholesaleRequests(): WholesaleRequest[] {
    return getLocal<WholesaleRequest[]>('wholesale', defaultWholesale);
  }

  createWholesaleRequest(data: any): WholesaleRequest {
    const all = getLocal<WholesaleRequest[]>('wholesale', defaultWholesale);
    const newReq: WholesaleRequest = {
      id: 'whs-' + Date.now(),
      status: 'New',
      createdAt: new Date().toISOString(),
      ...data
    };
    all.unshift(newReq);
    setLocal('wholesale', all);
    return newReq;
  }

  updateWholesaleStatus(id: string, status: WholesaleRequest['status']): WholesaleRequest | null {
    const all = getLocal<WholesaleRequest[]>('wholesale', defaultWholesale);
    const req = all.find(r => r.id === id);
    if (!req) return null;
    req.status = status;
    setLocal('wholesale', all);
    return req;
  }

  // --- SETTINGS ---
  getSettings(): AdminSettings {
    return getLocal<AdminSettings>('settings', defaultSettings);
  }

  updateSettings(updates: Partial<AdminSettings>): AdminSettings {
    const current = this.getSettings();
    const updated = { ...current, ...updates };
    setLocal('settings', updated);
    return updated;
  }

  // --- ADMIN STATS ---
  getAdminStats() {
    const prods = this.products;
    const ords = this.getOrders();
    const wholesale = this.getWholesaleRequests();
    const users = getLocal<User[]>('users', []);

    return {
      totalProducts: prods.length,
      totalOrders: ords.length,
      totalCustomers: users.length || 1,
      pendingOrders: ords.filter(o => o.status === 'Pending').length,
      completedOrders: ords.filter(o => o.status === 'Delivered').length,
      totalRevenue: ords.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + (o.total || 0), 0),
      lowStock: prods.filter(p => p.stock < 100).length,
      wholesaleRequestsCount: wholesale.length
    };
  }

  // --- AUTH MOCK ---
  login(email: string, _password: string) {
    if (email.toLowerCase() === 'admin@lahorestationers.com') {
      const user: User = {
        id: 'usr-admin-1',
        name: 'Urdu Bazar Store Admin',
        email: 'admin@lahorestationers.com',
        role: 'admin',
        createdAt: new Date().toISOString()
      };
      return { user, token: 'mock-admin-token-' + Date.now() };
    }
    const user: User = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0],
      email,
      role: 'customer',
      createdAt: new Date().toISOString()
    };
    return { user, token: 'mock-user-token-' + Date.now() };
  }
}

export const localApi = new LocalApiService();
