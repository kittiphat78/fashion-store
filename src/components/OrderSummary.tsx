/**
 * OrderSummary Component
 * แสดงสรุปรายการสินค้า + ราคารวม ใน checkout
 */

'use client';

import th from '@/lib/th';
import type { CartItem } from '@/lib/cart-context';

interface OrderSummaryProps {
  items: CartItem[];
  totalPrice: number;
}

export default function OrderSummary({ items, totalPrice }: OrderSummaryProps) {
  return (
    <div className="order-summary">
      <h3 className="order-summary-title">{th.checkout.orderSummary}</h3>

      {/* รายการสินค้า */}
      <div className="order-summary-items">
        {items.map((item) => (
          <div key={item.product.id} className="order-summary-item">
            <div className="order-summary-item-info">
              <span className="order-summary-item-name">{item.product.name}</span>
              <span className="order-summary-item-qty">x{item.quantity}</span>
            </div>
            <span className="order-summary-item-price">
              ฿{(item.product.price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* เส้นแบ่ง */}
      <div className="order-summary-divider" />

      {/* จำนวนรวม */}
      <div className="order-summary-row">
        <span>{th.cart.quantity}</span>
        <span>
          {items.reduce((sum, item) => sum + item.quantity, 0)} {th.cart.itemUnit}
        </span>
      </div>

      {/* ค่าจัดส่ง */}
      <div className="order-summary-row">
        <span>ค่าจัดส่ง</span>
        <span className="order-summary-free">ฟรี</span>
      </div>

      {/* เส้นแบ่ง */}
      <div className="order-summary-divider" />

      {/* ราคารวมทั้งหมด */}
      <div className="order-summary-total">
        <span>{th.cart.total}</span>
        <span>฿{totalPrice.toLocaleString()}</span>
      </div>
    </div>
  );
}
