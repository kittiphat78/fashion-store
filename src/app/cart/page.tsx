/**
 * หน้าตะกร้าสินค้า (Cart Page)
 * Protected Route — ต้อง login ก่อนถึงเข้าได้
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';
import CartItem from '@/components/CartItem';
import Button from '@/components/Button';
import th from '@/lib/th';
import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { items, totalPrice, clearCart } = useCart();

  /* Protected Route: redirect ถ้ายังไม่ login */
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  /* แสดง loading ขณะตรวจสอบ session */
  if (authLoading) {
    return (
      <section className="section">
        <div className="container">
          <div className="cart-loading">กำลังโหลด...</div>
        </div>
      </section>
    );
  }

  /* ถ้ายังไม่ login ไม่แสดงเนื้อหา */
  if (!user) {
    return (
      <section className="section">
        <div className="container">
          <div className="cart-empty">
            <h2>🔒</h2>
            <p>{th.cart.loginRequired}</p>
            <Button href="/login" variant="primary" size="lg">
              {th.cart.loginToContinue}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <SectionTitle title={th.cart.title} />

        {items.length === 0 ? (
          /* ตะกร้าว่าง */
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h3>{th.cart.empty}</h3>
            <p>{th.cart.emptySubtitle}</p>
            <Button href="/products" variant="primary" size="lg">
              {th.cart.continueShopping}
            </Button>
          </div>
        ) : (
          /* มีสินค้าในตะกร้า */
          <div className="cart-layout">
            {/* รายการสินค้า */}
            <div className="cart-items">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            {/* สรุปราคา */}
            <div className="cart-summary">
              <h3>{th.cart.subtotal}</h3>

              <div className="cart-summary-row">
                <span>{th.cart.quantity}</span>
                <span>
                  {items.reduce((sum, item) => sum + item.quantity, 0)}{' '}
                  {th.cart.itemUnit}
                </span>
              </div>

              <div className="cart-summary-total">
                <span>{th.cart.total}</span>
                <span>฿{totalPrice.toLocaleString()}</span>
              </div>

              <Button variant="primary" size="lg" fullWidth>
                {th.cart.checkout}
              </Button>

              <button className="cart-clear-btn" onClick={clearCart}>
                {th.cart.clearCart}
              </button>

              <Link href="/products" className="cart-continue-link">
                ← {th.cart.continueShopping}
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
