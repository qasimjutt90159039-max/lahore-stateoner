import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { storage } from './server/storage.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const JWT_SECRET = process.env.JWT_SECRET || 'lahore_stationers_mall_secure_jwt_secret_key_2026';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json({ limit: '10mb' }));

// Auth Middleware
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'customer' | 'admin';
  };
}

function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = decoded;
    next();
  });
}

function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  authenticateToken(req, res, () => {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'Admin privileges required' });
    }
    next();
  });
}

// ---------------- REST API ROUTES ----------------

// --- AUTH ---
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password, phone, companyName, address, city } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    const existing = storage.getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const newUser = storage.createUser(name, email, passwordHash, 'customer', {
      phone,
      companyName,
      address,
      city
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { passwordHash: _, ...userWithoutPass } = newUser;
    return res.status(201).json({ user: userWithoutPass, token });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Registration failed' });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = storage.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { passwordHash: _, ...userWithoutPass } = user;
    return res.json({ user: userWithoutPass, token });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Login failed' });
  }
});

app.get('/api/auth/me', authenticateToken, (req: AuthRequest, res) => {
  const user = storage.getUserById(req.user!.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const { passwordHash: _, ...userWithoutPass } = user;
  return res.json({ user: userWithoutPass });
});

// --- PRODUCTS ---
app.get('/api/products', (req, res) => {
  let products = storage.getProducts();

  const {
    category,
    brand,
    search,
    minPrice,
    maxPrice,
    stockStatus,
    wholesaleAvailable,
    featured,
    bestSeller,
    newArrival,
    sort,
    page = '1',
    limit = '24'
  } = req.query;

  // Filter category
  if (category) {
    const catStr = String(category).toLowerCase();
    products = products.filter(p =>
      p.category.toLowerCase().includes(catStr) ||
      p.slug.toLowerCase().includes(catStr)
    );
  }

  // Filter brand
  if (brand) {
    products = products.filter(p => p.brand.toLowerCase() === String(brand).toLowerCase());
  }

  // Search keyword (name, sku, brand, tags, category)
  if (search) {
    const q = String(search).toLowerCase().trim();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  // Filter price range
  if (minPrice) {
    products = products.filter(p => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    products = products.filter(p => p.price <= Number(maxPrice));
  }

  // Stock status
  if (stockStatus) {
    products = products.filter(p => p.stockStatus === stockStatus);
  }

  // Wholesale available
  if (wholesaleAvailable === 'true') {
    products = products.filter(p => p.wholesaleAvailable);
  }

  // Badges
  if (featured === 'true') {
    products = products.filter(p => p.featured);
  }
  if (bestSeller === 'true') {
    products = products.filter(p => p.bestSeller);
  }
  if (newArrival === 'true') {
    products = products.filter(p => p.newArrival);
  }

  // Sorting
  if (sort === 'price_asc') {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_desc') {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === 'newest') {
    products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sort === 'rating') {
    products.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'best_seller') {
    products.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
  }

  const total = products.length;
  const pageNum = parseInt(String(page), 10) || 1;
  const limitNum = parseInt(String(limit), 10) || 24;
  const startIndex = (pageNum - 1) * limitNum;
  const paginated = products.slice(startIndex, startIndex + limitNum);

  return res.json({
    products: paginated,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum)
  });
});

app.get('/api/products/:id', (req, res) => {
  const prod = storage.getProductById(req.params.id);
  if (!prod) {
    return res.status(404).json({ error: 'Product not found' });
  }
  return res.json(prod);
});

app.post('/api/products', requireAdmin, (req, res) => {
  try {
    const newProd = storage.createProduct(req.body);
    return res.status(201).json(newProd);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

app.put('/api/products/:id', requireAdmin, (req, res) => {
  const updated = storage.updateProduct(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Product not found' });
  }
  return res.json(updated);
});

app.delete('/api/products/:id', requireAdmin, (req, res) => {
  const success = storage.deleteProduct(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Product not found' });
  }
  return res.json({ success: true, message: 'Product deleted' });
});

// --- CATEGORIES ---
app.get('/api/categories', (_req, res) => {
  return res.json(storage.getCategories());
});

app.post('/api/categories', requireAdmin, (req, res) => {
  const cat = storage.createCategory(req.body);
  return res.status(201).json(cat);
});

app.put('/api/categories/:id', requireAdmin, (req, res) => {
  const cat = storage.updateCategory(req.params.id, req.body);
  if (!cat) return res.status(404).json({ error: 'Category not found' });
  return res.json(cat);
});

app.delete('/api/categories/:id', requireAdmin, (req, res) => {
  const success = storage.deleteCategory(req.params.id);
  if (!success) return res.status(404).json({ error: 'Category not found' });
  return res.json({ success: true });
});

// --- CART (Sync for Logged In User) ---
app.get('/api/cart', authenticateToken, (req: AuthRequest, res) => {
  const items = storage.getUserCart(req.user!.id);
  return res.json(items);
});

app.post('/api/cart', authenticateToken, (req: AuthRequest, res) => {
  const items = storage.setUserCart(req.user!.id, req.body.items || []);
  return res.json(items);
});

// --- ORDERS ---
app.post('/api/orders', (req, res) => {
  try {
    const {
      customerName,
      phone,
      email,
      address,
      city,
      area,
      postalCode,
      orderNotes,
      items,
      subtotal,
      discount = 0,
      deliveryFee = 200,
      userId
    } = req.body;

    if (!customerName || !phone || !address || !city || !items || items.length === 0) {
      return res.status(400).json({ error: 'Please provide all required delivery details and at least one product.' });
    }

    const total = subtotal - discount + deliveryFee;

    const newOrder = storage.createOrder({
      userId,
      customerName,
      phone,
      email,
      address,
      city,
      area,
      postalCode,
      orderNotes,
      items,
      subtotal,
      discount,
      deliveryFee,
      total,
      paymentMethod: 'Cash on Delivery',
      status: 'Pending'
    });

    return res.status(201).json(newOrder);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Order placement failed' });
  }
});

app.get('/api/orders', authenticateToken, (req: AuthRequest, res) => {
  if (req.user?.role === 'admin') {
    return res.json(storage.getOrders());
  }
  return res.json(storage.getOrdersByUserId(req.user!.id));
});

app.get('/api/orders/:id', (req, res) => {
  const order = storage.getOrderById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  return res.json(order);
});

app.put('/api/orders/:id/status', requireAdmin, (req, res) => {
  const updated = storage.updateOrderStatus(req.params.id, req.body.status);
  if (!updated) return res.status(404).json({ error: 'Order not found' });
  return res.json(updated);
});

// --- WHOLESALE PORTAL & BULK QUOTATIONS ---
app.post('/api/wholesale', (req, res) => {
  try {
    const { buyerName, businessName, phone, email, requiredProducts, quantityEstimate, message } = req.body;
    if (!buyerName || !phone || !requiredProducts) {
      return res.status(400).json({ error: 'Buyer name, phone, and required products are required.' });
    }

    const reqRecord = storage.createWholesaleRequest({
      buyerName,
      businessName: businessName || 'Individual Wholesale Buyer',
      phone,
      email,
      requiredProducts,
      quantityEstimate: quantityEstimate || 'Bulk requirement',
      message: message || ''
    });

    return res.status(201).json({
      success: true,
      message: 'Wholesale inquiry received. Our Urdu Bazar team will get in touch shortly.',
      request: reqRecord
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/wholesale', requireAdmin, (_req, res) => {
  return res.json(storage.getWholesaleRequests());
});

app.put('/api/wholesale/:id', requireAdmin, (req, res) => {
  const updated = storage.updateWholesaleStatus(req.params.id, req.body.status);
  if (!updated) return res.status(404).json({ error: 'Wholesale request not found' });
  return res.json(updated);
});

// --- REVIEWS ---
app.get('/api/products/:id/reviews', (req, res) => {
  return res.json(storage.getReviews(req.params.id));
});

app.post('/api/products/:id/reviews', (req, res) => {
  const { userName, rating, comment } = req.body;
  if (!userName || !rating || !comment) {
    return res.status(400).json({ error: 'Name, rating, and review comment are required' });
  }
  const review = storage.addReview(req.params.id, userName, Number(rating), comment);
  return res.status(201).json(review);
});

// --- SETTINGS ---
app.get('/api/settings', (_req, res) => {
  return res.json(storage.getSettings());
});

app.put('/api/settings', requireAdmin, (req, res) => {
  const updated = storage.updateSettings(req.body);
  return res.json(updated);
});

// --- ADMIN STATS DASHBOARD ---
app.get('/api/admin/stats', (_req, res) => {
  const products = storage.getProducts();
  const orders = storage.getOrders();
  const users = storage.getUsers();
  const wholesale = storage.getWholesaleRequests();

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalCustomers = users.filter(u => u.role === 'customer').length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const completedOrders = orders.filter(o => o.status === 'Delivered').length;
  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0);
  const lowStock = products.filter(p => p.stock < 100).length;
  const wholesaleRequestsCount = wholesale.length;

  return res.json({
    totalProducts,
    totalOrders,
    totalCustomers,
    pendingOrders,
    completedOrders,
    totalRevenue,
    lowStock,
    wholesaleRequestsCount
  });
});

// --- CONTACT FORM ---
app.post('/api/contact', (req, res) => {
  const { name, phone, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }
  return res.json({
    success: true,
    message: 'Thank you for reaching out to Lahore Stationers Mall. We will respond promptly.'
  });
});

// ---------------- SERVER & VITE INTEGRATION ----------------
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[Lahore Stationers Mall] Server running on port ${PORT}`);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
});
