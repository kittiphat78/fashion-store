/**
 * Providers
 * รวม Context Providers ไว้ในที่เดียว — ใช้ 'use client' เพื่อไม่ให้ layout เป็น Client Component
 */

'use client';

import type { ReactNode } from 'react';
import { AuthProvider } from '@/lib/auth-context';
import { CartProvider } from '@/lib/cart-context';
import { OrderProvider } from '@/lib/order-context';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>{children}</OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}
