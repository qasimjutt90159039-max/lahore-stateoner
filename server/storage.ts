import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { Product, Category, User, Order, WholesaleRequest, Review, AdminSettings } from '../src/types/index.js';
import { getAllSeedProducts } from './data/allProducts.js';
import { initialCategories } from './data/categoriesData.js';

const isVercel = process.env.VERCEL === '1' || Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);
const DATA_DIR = isVercel
  ? path.resolve('/tmp', 'lsm-data')
  : path.resolve(process.cwd(), 'data');

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    // Silently continue with in-memory storage if filesystem is read-only
  }
}

function readJSON<T>(filename: string, defaultValue: T): T {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      try {
        fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf-8');
      } catch {
        // Disk write failed, fallback in-memory
      }
      return defaultValue;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

function writeJSON<T>(filename: string, data: T): void {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch {
    // Disk write failed, in-memory array already holds state
  }
}

export interface UserRecord extends User {
  passwordHash: string;
}

export interface StoredCartItem {
  userId: string;
  productId: string;
  quantity: number;
}

// Default Admin Settings strictly obeying the business rule
const defaultSettings: AdminSettings = {
  storeName: 'Lahore Stationers Mall',
  phone: '+92 323 4304600',
  address: 'Kabeer Street, Urdu Bazar, Lahore 54000, Pakistan',
  email: '', // Configurable by admin, not invented
  businessHours: 'Mon - Sat: 9:00 AM - 8:30 PM (Sunday Closed)',
  facebookUrl: '',
  instagramUrl: '',
  announcementText: 'Wholesale Stationery • Kabeer Street, Urdu Bazar Lahore • Cash on Delivery & Bulk Quotations Available',
  minimumWholesaleOrderValue: 5000,
  defaultDeliveryFee: 200,
  freeDeliveryThreshold: 4000,
  priceNotice: 'Prices and availability may change. Please confirm before final purchase.'
};

class Storage {
  private products: Product[] = [];
  private categories: Category[] = [];
  private users: UserRecord[] = [];
  private orders: Order[] = [];
  private wholesaleRequests: WholesaleRequest[] = [];
  private reviews: Review[] = [];
  private settings: AdminSettings = defaultSettings;
  private carts: StoredCartItem[] = [];

  constructor() {
    this.init();
  }

  private init() {
    ensureDataDir();
    
    // 1. Categories
    this.categories = readJSON<Category[]>('categories.json', initialCategories);
    if (!this.categories || this.categories.length === 0) {
      this.categories = initialCategories;
      writeJSON('categories.json', this.categories);
    }

    // 2. Products (Seed all 151 products)
    const seedProds = getAllSeedProducts();
    const storedProds = readJSON<Product[]>('products.json', []);
    if (!storedProds || storedProds.length < 130) {
      this.products = seedProds;
      writeJSON('products.json', this.products);
      console.log(`[Storage] Seeded ${this.products.length} stationery products.`);
    } else {
      this.products = storedProds;
    }

    // 3. Settings
    this.settings = readJSON<AdminSettings>('settings.json', defaultSettings);

    // 4. Users & Admin Seed
    this.users = readJSON<UserRecord[]>('users.json', []);
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@lahorestationers.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'AdminLahore2026!';

    const hasAdmin = this.users.find(u => u.role === 'admin' || u.email === adminEmail);
    if (!hasAdmin) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(adminPassword, salt);
      const adminUser: UserRecord = {
        id: 'usr-admin-1',
        name: 'Urdu Bazar Store Admin',
        email: adminEmail,
        phone: '+92 323 4304600',
        role: 'admin',
        companyName: 'Lahore Stationers Mall',
        address: 'Kabeer Street, Urdu Bazar',
        city: 'Lahore',
        createdAt: new Date().toISOString(),
        passwordHash: hash
      };
      this.users.push(adminUser);
      writeJSON('users.json', this.users);
      console.log(`[Storage] Created default admin account: ${adminEmail}`);
    }

    // 5. Orders
    this.orders = readJSON<Order[]>('orders.json', [
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
          },
          {
            productId: 'lsm-048',
            productName: 'A4 Copy Paper 70 GSM',
            sku: 'LSM-PAP-A470-048',
            unitPrice: 1350,
            quantity: 2,
            totalPrice: 2700,
            packSize: '500 Sheets Ream',
            thumbnail: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=700&q=80'
          }
        ],
        subtotal: 3000,
        discount: 0,
        deliveryFee: 200,
        total: 3200,
        paymentMethod: 'Cash on Delivery',
        status: 'Delivered',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
      }
    ]);

    // 6. Wholesale Requests
    this.wholesaleRequests = readJSON<WholesaleRequest[]>('wholesale.json', [
      {
        id: 'whs-001',
        buyerName: 'Akhtar Hussain',
        businessName: 'Al-Hadi Grammar School & Academy',
        phone: '+92 321 9876543',
        email: 'principal@alhadi.edu.pk',
        requiredProducts: '500x Bahdur A4 Notebooks, 100x Dux Geometry Boxes, 20x Reams Copy Paper',
        quantityEstimate: 'Bulk Academic Session Requirement',
        message: 'Looking for best wholesale rates for our upcoming 2026 school term. Need delivery at Allama Iqbal Town campus.',
        status: 'Quoted',
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
      }
    ]);

    // 7. Reviews
    this.reviews = readJSON<Review[]>('reviews.json', [
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
    ]);

    // 8. Carts
    this.carts = readJSON<StoredCartItem[]>('cart.json', []);
  }

  // --- PRODUCTS ---
  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id || p.slug === id);
  }

  createProduct(data: Omit<Product, 'id' | 'createdAt'>): Product {
    const id = 'lsm-' + String(Date.now()).slice(-6);
    const newProduct: Product = {
      ...data,
      id,
      createdAt: new Date().toISOString()
    };
    this.products.unshift(newProduct);
    writeJSON('products.json', this.products);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.products[idx] = { ...this.products[idx], ...updates };
    writeJSON('products.json', this.products);
    return this.products[idx];
  }

  deleteProduct(id: string): boolean {
    const initialLen = this.products.length;
    this.products = this.products.filter(p => p.id !== id);
    if (this.products.length !== initialLen) {
      writeJSON('products.json', this.products);
      return true;
    }
    return false;
  }

  // --- CATEGORIES ---
  getCategories(): Category[] {
    return this.categories;
  }

  createCategory(category: Category): Category {
    this.categories.push(category);
    writeJSON('categories.json', this.categories);
    return category;
  }

  updateCategory(id: string, updates: Partial<Category>): Category | null {
    const idx = this.categories.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.categories[idx] = { ...this.categories[idx], ...updates };
    writeJSON('categories.json', this.categories);
    return this.categories[idx];
  }

  deleteCategory(id: string): boolean {
    const initialLen = this.categories.length;
    this.categories = this.categories.filter(c => c.id !== id);
    if (this.categories.length !== initialLen) {
      writeJSON('categories.json', this.categories);
      return true;
    }
    return false;
  }

  // --- USERS ---
  getUsers(): User[] {
    return this.users.map(({ passwordHash, ...rest }) => rest);
  }

  getUserByEmail(email: string): UserRecord | undefined {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id: string): UserRecord | undefined {
    return this.users.find(u => u.id === id);
  }

  createUser(name: string, email: string, passwordHash: string, role: 'customer' | 'admin' = 'customer', extra?: Partial<User>): UserRecord {
    const id = 'usr-' + Date.now();
    const newUser: UserRecord = {
      id,
      name,
      email,
      role,
      passwordHash,
      createdAt: new Date().toISOString(),
      ...extra
    };
    this.users.push(newUser);
    writeJSON('users.json', this.users);
    return newUser;
  }

  // --- ORDERS ---
  getOrders(): Order[] {
    return this.orders;
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find(o => o.id === id || o.orderNumber === id);
  }

  getOrdersByUserId(userId: string): Order[] {
    return this.orders.filter(o => o.userId === userId);
  }

  createOrder(data: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order {
    const orderCount = this.orders.length + 1;
    const orderNumber = `LSM-2026-${String(orderCount).padStart(5, '0')}`;
    const id = 'ord-' + Date.now();
    const newOrder: Order = {
      ...data,
      id,
      orderNumber,
      createdAt: new Date().toISOString()
    };
    this.orders.unshift(newOrder);
    writeJSON('orders.json', this.orders);
    return newOrder;
  }

  updateOrderStatus(id: string, status: Order['status']): Order | null {
    const order = this.orders.find(o => o.id === id || o.orderNumber === id);
    if (!order) return null;
    order.status = status;
    writeJSON('orders.json', this.orders);
    return order;
  }

  // --- WHOLESALE ---
  getWholesaleRequests(): WholesaleRequest[] {
    return this.wholesaleRequests;
  }

  createWholesaleRequest(data: Omit<WholesaleRequest, 'id' | 'status' | 'createdAt'>): WholesaleRequest {
    const id = 'whs-' + Date.now();
    const newReq: WholesaleRequest = {
      ...data,
      id,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    this.wholesaleRequests.unshift(newReq);
    writeJSON('wholesale.json', this.wholesaleRequests);
    return newReq;
  }

  updateWholesaleStatus(id: string, status: WholesaleRequest['status']): WholesaleRequest | null {
    const req = this.wholesaleRequests.find(r => r.id === id);
    if (!req) return null;
    req.status = status;
    writeJSON('wholesale.json', this.wholesaleRequests);
    return req;
  }

  // --- REVIEWS ---
  getReviews(productId: string): Review[] {
    return this.reviews.filter(r => r.productId === productId);
  }

  addReview(productId: string, userName: string, rating: number, comment: string): Review {
    const newRev: Review = {
      id: 'rev-' + Date.now(),
      productId,
      userName,
      rating,
      comment,
      verifiedPurchase: true,
      createdAt: new Date().toISOString()
    };
    this.reviews.unshift(newRev);
    writeJSON('reviews.json', this.reviews);
    
    // Update product rating average
    const prod = this.products.find(p => p.id === productId);
    if (prod) {
      const prodReviews = this.reviews.filter(r => r.productId === productId);
      const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
      prod.rating = Number(avg.toFixed(1));
      prod.reviewsCount = prodReviews.length;
      writeJSON('products.json', this.products);
    }

    return newRev;
  }

  // --- SETTINGS ---
  getSettings(): AdminSettings {
    return this.settings;
  }

  updateSettings(updates: Partial<AdminSettings>): AdminSettings {
    this.settings = { ...this.settings, ...updates };
    writeJSON('settings.json', this.settings);
    return this.settings;
  }

  // --- CART ---
  getUserCart(userId: string): StoredCartItem[] {
    return this.carts.filter(c => c.userId === userId);
  }

  setUserCart(userId: string, items: { productId: string; quantity: number }[]): StoredCartItem[] {
    this.carts = this.carts.filter(c => c.userId !== userId);
    for (const item of items) {
      this.carts.push({ userId, productId: item.productId, quantity: item.quantity });
    }
    writeJSON('cart.json', this.carts);
    return this.getUserCart(userId);
  }
}

export const storage = new Storage();
