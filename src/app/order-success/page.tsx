/**
 * หน้าสั่งซื้อสำเร็จ (Order Success)
 * แสดงเลขที่คำสั่งซื้อ + QR PromptPay + แนบสลิป
 * Wrapped in Suspense boundary for useSearchParams()
 */

'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import PromptPayQR from '@/components/PromptPayQR';
import th from '@/lib/th';
import { useAuth } from '@/lib/auth-context';
import { useOrder } from '@/lib/order-context';
import type { Order } from '@/lib/constants';

/* =====================================================
   Main Content — ต้องห่อด้วย Suspense (Next.js 16 rule)
   ===================================================== */
function OrderSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading: authLoading } = useAuth();
  const { getOrderById, updateOrderSlip, latestOrderId } = useOrder();

  const [order, setOrder] = useState<Order | null>(null);
  const [slipUploaded, setSlipUploaded] = useState(false);

  /* ดึง order จาก URL params หรือ latestOrderId */
  useEffect(() => {
    const orderId = searchParams.get('id') || latestOrderId;
    if (orderId) {
      const found = getOrderById(orderId);
      if (found) {
        setOrder(found);
        if (found.slipImage) {
          setSlipUploaded(true);
        }
      }
    }
  }, [searchParams, latestOrderId, getOrderById]);

  /* Protected Route */
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  /* จัดการอัปโหลดสลิป */
  const handleSlipUpload = (base64: string) => {
    if (order) {
      updateOrderSlip(order.id, base64);
      setSlipUploaded(true);
      setOrder((prev) =>
        prev ? { ...prev, slipImage: base64, status: 'paid' } : null
      );
    }
  };

  /* Loading */
  if (authLoading) {
    return (
      <section className="section">
        <div className="container">
          <div className="cart-loading">กำลังโหลด...</div>
        </div>
      </section>
    );
  }

  /* ไม่พบคำสั่งซื้อ */
  if (!order) {
    return (
      <section className="section">
        <div className="container">
          <div className="order-success-empty">
            <div className="order-success-icon">📋</div>
            <h2>{th.orderSuccess.noOrder}</h2>
            <p>{th.orderSuccess.noOrderDesc}</p>
            <Button href="/products" variant="primary" size="lg">
              {th.orderSuccess.continueShopping}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="order-success-page">
          {/* ส่วนหัว — เครื่องหมายถูก + ข้อความ */}
          <div className="order-success-header">
            <div className="order-success-check">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="#059669" />
                <path
                  d="M14 24l7 7 13-13"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="order-success-title">{th.orderSuccess.title}</h1>
            <p className="order-success-subtitle">{th.orderSuccess.subtitle}</p>
          </div>

          {/* เลขที่คำสั่งซื้อ */}
          <div className="order-success-id-card">
            <span className="order-success-id-label">
              {th.orderSuccess.orderId}
            </span>
            <span className="order-success-id-value">{order.id}</span>
          </div>

          {/* เนื้อหา */}
          <div className="order-success-content">
            {/* PromptPay QR + สลิป */}
            <div className="order-success-payment">
              {slipUploaded ? (
                <div className="order-success-paid-badge">
                  <span>✓</span>
                  <p>{th.orderSuccess.paidAlready}</p>
                </div>
              ) : (
                <p className="order-success-reminder">
                  {th.orderSuccess.paymentReminder}
                </p>
              )}
              <PromptPayQR
                amount={order.total}
                onSlipUpload={handleSlipUpload}
                existingSlip={order.slipImage}
              />
            </div>

            {/* สรุปรายการ */}
            <div className="order-success-details">
              <div className="order-success-detail-card">
                <h3>{th.checkout.orderSummary}</h3>
                <div className="order-success-items">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="order-success-item">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>
                        ฿{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="order-success-total-row">
                  <span>{th.cart.total}</span>
                  <span>฿{order.total.toLocaleString()}</span>
                </div>
              </div>

              {/* ข้อมูลจัดส่ง */}
              <div className="order-success-detail-card">
                <h3>{th.checkout.shippingInfo}</h3>
                <div className="order-success-shipping">
                  <p>
                    <strong>{th.checkout.recipientName}:</strong>{' '}
                    {order.customerName}
                  </p>
                  <p>
                    <strong>{th.checkout.address}:</strong> {order.address}
                  </p>
                  <p>
                    <strong>{th.checkout.phone}:</strong> {order.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ปุ่มลิงก์ */}
          <div className="order-success-actions">
            <Button href="/" variant="primary" size="lg">
              {th.orderSuccess.backToHome}
            </Button>
            <Link href="/products" className="order-success-continue-link">
              {th.orderSuccess.continueShopping} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   Page Export — Suspense wrapper
   ===================================================== */
export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <section className="section">
          <div className="container">
            <div className="cart-loading">กำลังโหลด...</div>
          </div>
        </section>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
