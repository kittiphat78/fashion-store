/**
 * Cart Context
 * จัดการตะกร้าสินค้า — เก็บข้อมูลลง localStorage อัตโนมัติ
 */

'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { Product } from './constants';

// ========== Types ==========
export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
}

// ========== Storage Key ==========
const CART_STORAGE_KEY = 'fashion_co_cart';

// ========== Context ==========
const CartContext = createContext<CartContextType | undefined>(undefined);

// ========== Provider ==========
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  /* โหลดตะกร้าจาก localStorage เมื่อเริ่มต้น */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ถ้า parse ไม่ได้ ก็เริ่มตะกร้าว่าง
    }
    setIsHydrated(true);
  }, []);

  /* บันทึกตะกร้าลง localStorage ทุกครั้งที่เปลี่ยน */
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isHydrated]);

  /* คำนวณจำนวนสินค้ารวม */
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  /* คำนวณราคารวม */
  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  /* เพิ่มสินค้าลงตะกร้า */
  const addToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        // ถ้ามีอยู่แล้ว เพิ่มจำนวน +1
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // ถ้ายังไม่มี เพิ่มใหม่
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  /* ลบสินค้าออกจากตะกร้า */
  const removeFromCart = useCallback((productId: number) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  /* อัปเดตจำนวนสินค้า */
  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  /* ล้างตะกร้าทั้งหมด */
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  /* ตรวจสอบว่าสินค้าอยู่ในตะกร้าหรือไม่ */
  const isInCart = useCallback(
    (productId: number) => items.some((item) => item.product.id === productId),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ========== Hook ==========
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart ต้องใช้ภายใน CartProvider');
  }
  return context;
}
