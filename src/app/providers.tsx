/**
 * Providers
 * รวม Context Providers ไว้ในที่เดียว — ใช้ 'use client' เพื่อไม่ให้ layout เป็น Client Component
 */

'use client';

import type { ReactNode } from 'react';
import { AuthProvider } from '@/lib/auth-context';
import { CartProvider } from '@/lib/cart-context';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
