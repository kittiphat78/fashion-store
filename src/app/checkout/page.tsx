/**
 * หน้า Checkout (ชำระเงิน)
 * Protected Route — ต้อง login + มีสินค้าในตะกร้า
 * แสดงฟอร์มข้อมูลจัดส่ง + วิธีชำระเงิน + สรุปรายการ
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';
import CheckoutForm, { type ShippingInfo } from '@/components/CheckoutForm';
import OrderSummary from '@/components/OrderSummary';
import PaymentMethod, { type PaymentMethodType } from '@/components/PaymentMethod';
import Button from '@/components/Button';
import th from '@/lib/th';
import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/lib/cart-context';
import { useOrder } from '@/lib/order-context';

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const { createOrder, isSubmitting } = useOrder();

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '',
    address: '',
    phone: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('promptpay');
  const [error, setError] = useState('');

  /* Protected Route: redirect ถ้ายังไม่ login */
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  /* ถ้าตะกร้าว่าง redirect กลับ cart */
  useEffect(() => {
    if (!authLoading && user && items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, authLoading, user, router]);

  /* รับข้อมูลจาก CheckoutForm */
  const handleDataChange = useCallback((data: ShippingInfo, isValid: boolean) => {
    setShippingInfo(data);
    setIsFormValid(isValid);
  }, []);

  /* ยืนยันการสั่งซื้อ */
  const handlePlaceOrder = useCallback(() => {
    setError('');

    // ตรวจสอบข้อมูล
    if (!user) {
      setError(th.checkout.errors.loginRequired);
      return;
    }
    if (items.length === 0) {
      setError(th.checkout.errors.cartEmpty);
      return;
    }
    if (!isFormValid) {
      setError('กรุณากรอกข้อมูลจัดส่งให้ครบถ้วน');
      return;
    }

    // สร้าง order
    const order = createOrder({
      userId: user.id,
      customerName: shippingInfo.name,
      customerEmail: user.email,
      items: items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.image,
      })),
      total: totalPrice,
      address: shippingInfo.address,
      phone: shippingInfo.phone,
      paymentMethod,
    });

    // ล้างตะกร้า + redirect ไปหน้า success
    clearCart();
    router.push(`/order-success?id=${order.id}`);
  }, [
    user,
    items,
    isFormValid,
    shippingInfo,
    paymentMethod,
    totalPrice,
    createOrder,
    clearCart,
    router,
  ]);

  /* Loading state */
  if (authLoading) {
    return (
      <section className="section">
        <div className="container">
          <div className="cart-loading">กำลังโหลด...</div>
        </div>
      </section>
    );
  }

  /* ถ้ายังไม่ login */
  if (!user) {
    return (
      <section className="section">
        <div className="container">
          <div className="cart-empty">
            <h2>🔒</h2>
            <p>{th.checkout.errors.loginRequired}</p>
            <Button href="/login" variant="primary" size="lg">
              {th.cart.loginToContinue}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  /* ถ้าตะกร้าว่าง */
  if (items.length === 0) {
    return (
      <section className="section">
        <div className="container">
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h3>{th.cart.empty}</h3>
            <p>{th.checkout.errors.cartEmpty}</p>
            <Button href="/products" variant="primary" size="lg">
              {th.cart.continueShopping}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <SectionTitle title={th.checkout.title} subtitle={th.checkout.subtitle} />

        <div className="checkout-layout">
          {/* ฝั่งซ้าย: ฟอร์ม + วิธีชำระเงิน */}
          <div className="checkout-form-section">
            {/* ข้อมูลจัดส่ง */}
            <CheckoutForm onDataChange={handleDataChange} />

            {/* วิธีชำระเงิน */}
            <PaymentMethod selected={paymentMethod} onChange={setPaymentMethod} />

            {/* Error message */}
            {error && <div className="form-error">{error}</div>}

            {/* ปุ่มยืนยัน */}
            <div className="checkout-actions">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handlePlaceOrder}
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? th.checkout.processing : th.checkout.placeOrder}
              </Button>

              <Link href="/cart" className="checkout-back-link">
                ← {th.cart.title}
              </Link>
            </div>
          </div>

          {/* ฝั่งขวา: สรุปรายการ */}
          <div className="checkout-summary-section">
            <OrderSummary items={items} totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    </section>
  );
}
