import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types/index.js';
import { useAuth } from './AuthContext.js';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  generateWhatsAppCartLink: (customerName?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, token } = useAuth();
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lsm_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('lsm_cart', JSON.stringify(items));
    if (user && token) {
      // Sync with server
      fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          items: items.map(i => ({ productId: i.productId, quantity: i.quantity }))
        })
      }).catch(err => console.error('Cart sync error:', err));
    }
  }, [items, user, token]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === product.id);
      const newQty = existing ? existing.quantity + quantity : quantity;
      const minWholesale = product.minWholesaleQty || 10;
      const isWholesaleTier = newQty >= minWholesale && product.wholesaleAvailable;
      const unitPrice = isWholesaleTier ? product.wholesalePrice : product.price;

      if (existing) {
        return prev.map(i =>
          i.productId === product.id
            ? { ...i, quantity: newQty, isWholesaleTier, unitPrice }
            : i
        );
      }
      return [...prev, { productId: product.id, product, quantity: newQty, isWholesaleTier, unitPrice }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(i => {
        if (i.productId === productId) {
          const minWholesale = i.product.minWholesaleQty || 10;
          const isWholesaleTier = quantity >= minWholesale && i.product.wholesaleAvailable;
          const unitPrice = isWholesaleTier ? i.product.wholesalePrice : i.product.price;
          return { ...i, quantity, isWholesaleTier, unitPrice };
        }
        return i;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(i => i.productId !== productId));
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    setDiscountPercent(0);
  };

  const applyCoupon = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'URDUBAZAR10') {
      setCouponCode('URDUBAZAR10');
      setDiscountPercent(10);
      return true;
    } else if (trimmed === 'WHOLESALE5') {
      setCouponCode('WHOLESALE5');
      setDiscountPercent(5);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + (i.unitPrice * i.quantity), 0);
  const discount = Math.round(subtotal * (discountPercent / 100));
  const deliveryFee = subtotal >= 4000 || subtotal === 0 ? 0 : 200;
  const total = subtotal - discount + deliveryFee;

  const generateWhatsAppCartLink = (customerName?: string): string => {
    const phone = '923234304600';
    let text = `*New Order Inquiry - Lahore Stationers Mall*\n\n`;
    if (customerName) {
      text += `*Customer:* ${customerName}\n`;
    }
    text += `*Location:* Lahore / Urdu Bazar Delivery\n\n`;
    text += `*Items:*\n`;

    items.forEach((item, idx) => {
      text += `${idx + 1}. ${item.product.name} (SKU: ${item.product.sku})\n   Qty: ${item.quantity} ${item.product.unit}s @ PKR ${item.unitPrice} each = PKR ${item.quantity * item.unitPrice}\n`;
    });

    text += `\n*Subtotal:* PKR ${subtotal.toLocaleString()}`;
    if (discount > 0) {
      text += `\n*Discount:* -PKR ${discount.toLocaleString()}`;
    }
    text += `\n*Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : `PKR ${deliveryFee}`}`;
    text += `\n*Total Payable:* PKR ${total.toLocaleString()}`;
    text += `\n\n_Please confirm stock availability and dispatch time. Thank you!_`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        discount,
        deliveryFee,
        total,
        couponCode,
        applyCoupon,
        removeCoupon,
        generateWhatsAppCartLink
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
