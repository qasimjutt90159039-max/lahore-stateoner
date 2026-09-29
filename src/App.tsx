import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';
import { CartProvider } from './context/CartContext.js';
import { WishlistProvider } from './context/WishlistContext.js';

// Layout & Reusable
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { WhatsAppButton } from './components/WhatsAppButton.js';

// Pages
import { HomePage } from './pages/HomePage.js';
import { ShopPage } from './pages/ShopPage.js';
import { ProductDetailPage } from './pages/ProductDetailPage.js';
import { WholesalePage } from './pages/WholesalePage.js';
import { CartPage } from './pages/CartPage.js';
import { CheckoutPage } from './pages/CheckoutPage.js';
import { AboutPage } from './pages/AboutPage.js';
import { ContactPage } from './pages/ContactPage.js';
import { FAQPage } from './pages/FAQPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { RegisterPage } from './pages/RegisterPage.js';
import { AccountPage } from './pages/AccountPage.js';
import { OrdersPage } from './pages/OrdersPage.js';
import { WishlistPage } from './pages/WishlistPage.js';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard.js';
import { AdminProducts } from './pages/admin/AdminProducts.js';
import { AdminOrders } from './pages/admin/AdminOrders.js';
import { AdminWholesale } from './pages/admin/AdminWholesale.js';
import { AdminSettingsPage } from './pages/admin/AdminSettings.js';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#17202A]">
              <Navbar />

              <main className="flex-1">
                <Routes>
                  {/* Public Core Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/categories" element={<ShopPage />} />
                  <Route path="/category/:slug" element={<ShopPage />} />
                  <Route path="/products/:slug" element={<ProductDetailPage />} />

                  {/* Category Shortcuts */}
                  <Route path="/school-supplies" element={<ShopPage initialCategory="School Supplies" />} />
                  <Route path="/office-supplies" element={<ShopPage initialCategory="Office & Desk Accessories" />} />
                  <Route path="/writing" element={<ShopPage initialCategory="Pens & Writing" />} />
                  <Route path="/notebooks" element={<ShopPage initialCategory="Notebooks & Registers" />} />
                  <Route path="/art-craft" element={<ShopPage initialCategory="Art & Craft" />} />
                  <Route path="/paper" element={<ShopPage initialCategory="Paper Products" />} />
                  <Route path="/files-folders" element={<ShopPage initialCategory="Files & Folders" />} />

                  {/* Wholesale Portal */}
                  <Route path="/wholesale" element={<WholesalePage />} />

                  {/* Shopping & Checkout */}
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />

                  {/* Customer Account & Auth */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/orders" element={<OrdersPage />} />

                  {/* Institutional & Information Pages */}
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/faq" element={<FAQPage />} />

                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/products" element={<AdminProducts />} />
                  <Route path="/admin/categories" element={<AdminProducts />} />
                  <Route path="/admin/orders" element={<AdminOrders />} />
                  <Route path="/admin/customers" element={<AdminDashboard />} />
                  <Route path="/admin/wholesale" element={<AdminWholesale />} />
                  <Route path="/admin/settings" element={<AdminSettingsPage />} />

                  {/* 404 Fallback */}
                  <Route
                    path="*"
                    element={
                      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
                        <h2 className="text-2xl font-bold text-stone-800">404 - Page Not Found</h2>
                        <p className="text-xs text-stone-500">The requested stationery page does not exist.</p>
                        <a href="/" className="inline-block bg-[#173F5F] text-white text-xs font-bold px-4 py-2.5 rounded-lg">
                          Return to Home
                        </a>
                      </div>
                    }
                  />
                </Routes>
              </main>

              <Footer />

              {/* Floating WhatsApp Quick Action Button */}
              <WhatsAppButton variant="floating" type="general" />
            </div>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
