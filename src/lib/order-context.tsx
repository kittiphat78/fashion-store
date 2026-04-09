/**
 * Order Context
 * จัดการคำสั่งซื้อ — สร้าง order, อัปเดตสถานะ, อัปโหลดสลิป
 * เก็บข้อมูลลง localStorage (พร้อมเปลี่ยนเป็น Supabase ได้)
 */

'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Order, OrderStatus, OrderItem } from './constants';
import { mockOrders } from './constants';

// ========== Types ==========
interface CreateOrderInput {
  userId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  address: string;
  phone: string;
  paymentMethod: 'promptpay';
}

interface OrderContextType {
  orders: Order[];
  isSubmitting: boolean;
  createOrder: (input: CreateOrderInput) => Order;
  getOrdersByUser: (userId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateOrderSlip: (orderId: string, slipImage: string) => void;
  latestOrderId: string | null;
}

// ========== Storage Key ==========
const ORDERS_STORAGE_KEY = 'fashion_co_orders';
const LATEST_ORDER_KEY = 'fashion_co_latest_order';

// ========== Context ==========
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// ========== สร้างเลขที่คำสั่งซื้อ ==========
function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `ORD-${timestamp}${random}`;
}

// ========== Provider ==========
export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latestOrderId, setLatestOrderId] = useState<string | null>(null);

  /* โหลด orders จาก localStorage เมื่อเริ่มต้น */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        setOrders(JSON.parse(saved));
      } else {
        // ถ้าไม่มี orders ใน localStorage ใช้ mockOrders
        setOrders(mockOrders);
      }
      const savedLatest = localStorage.getItem(LATEST_ORDER_KEY);
      if (savedLatest) {
        setLatestOrderId(savedLatest);
      }
    } catch {
      setOrders(mockOrders);
    }
    setIsHydrated(true);
  }, []);

  /* บันทึก orders ลง localStorage ทุกครั้งที่เปลี่ยน */
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    }
  }, [orders, isHydrated]);

  /* บันทึก latestOrderId */
  useEffect(() => {
    if (isHydrated && latestOrderId) {
      localStorage.setItem(LATEST_ORDER_KEY, latestOrderId);
    }
  }, [latestOrderId, isHydrated]);

  /* สร้างคำสั่งซื้อใหม่ */
  const createOrder = useCallback((input: CreateOrderInput): Order => {
    setIsSubmitting(true);

    const newOrder: Order = {
      id: generateOrderId(),
      userId: input.userId,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      items: input.items,
      total: input.total,
      status: 'waiting_payment',
      date: new Date().toISOString().split('T')[0],
      address: input.address,
      phone: input.phone,
      paymentMethod: input.paymentMethod,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrderId(newOrder.id);
    setIsSubmitting(false);

    return newOrder;
  }, []);

  /* ดึงคำสั่งซื้อตาม userId */
  const getOrdersByUser = useCallback(
    (userId: string) => orders.filter((o) => o.userId === userId),
    [orders]
  );

  /* ดึงคำสั่งซื้อตาม orderId */
  const getOrderById = useCallback(
    (orderId: string) => orders.find((o) => o.id === orderId),
    [orders]
  );

  /* เปลี่ยนสถานะคำสั่งซื้อ */
  const updateOrderStatus = useCallback(
    (orderId: string, status: OrderStatus) => {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o))
      );
    },
    []
  );

  /* อัปโหลดสลิปการโอนเงิน */
  const updateOrderSlip = useCallback(
    (orderId: string, slipImage: string) => {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, slipImage, status: 'paid' as OrderStatus } : o
        )
      );
    },
    []
  );

  return (
    <OrderContext.Provider
      value={{
        orders,
        isSubmitting,
        createOrder,
        getOrdersByUser,
        getOrderById,
        updateOrderStatus,
        updateOrderSlip,
        latestOrderId,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

// ========== Hook ==========
export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder ต้องใช้ภายใน OrderProvider');
  }
  return context;
}
