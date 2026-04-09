/**
 * OrderTable Component (Admin)
 * ตารางแสดงคำสั่งซื้อพร้อมเปลี่ยนสถานะ + ดูสลิป
 */

'use client';

import { useState } from 'react';
import th from '@/lib/th';
import type { Order, OrderStatus } from '@/lib/constants';

interface OrderTableProps {
  orders: Order[];
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

/* แปลงสถานะเป็นภาษาไทย + สี */
const statusMap: Record<OrderStatus, { label: string; className: string }> = {
  waiting_payment: {
    label: th.admin.status.waiting_payment,
    className: 'adm-status-waiting_payment',
  },
  paid: {
    label: th.admin.status.paid,
    className: 'adm-status-paid',
  },
  shipping: {
    label: th.admin.status.shipping,
    className: 'adm-status-shipping',
  },
  completed: {
    label: th.admin.status.completed,
    className: 'adm-status-completed',
  },
};

export default function OrderTable({ orders, onStatusChange }: OrderTableProps) {
  const [slipModal, setSlipModal] = useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <div className="adm-empty">{th.admin.orders.noOrders}</div>
    );
  }

  return (
    <>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>{th.admin.orders.orderId}</th>
              <th>{th.admin.orders.customer}</th>
              <th>{th.admin.orders.items}</th>
              <th>{th.admin.orders.total}</th>
              <th>{th.admin.orders.date}</th>
              <th>{th.admin.orders.slip}</th>
              <th>{th.admin.orders.status}</th>
              <th>{th.admin.orders.actions}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const st = statusMap[order.status];
              return (
                <tr key={order.id}>
                  <td className="adm-table-name">{order.id}</td>
                  <td>
                    <div>{order.customerName}</div>
                    <div className="adm-table-sub">{order.customerEmail}</div>
                    <div className="adm-table-sub">{order.phone}</div>
                  </td>
                  <td>{order.items.length} รายการ</td>
                  <td>฿{order.total.toLocaleString()}</td>
                  <td>
                    {new Date(order.date).toLocaleDateString('th-TH', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td>
                    {order.slipImage ? (
                      <button
                        className="adm-btn-edit"
                        onClick={() => setSlipModal(order.slipImage!)}
                      >
                        🧾 {th.admin.orders.viewSlip}
                      </button>
                    ) : (
                      <span className="adm-table-sub">{th.admin.orders.noSlip}</span>
                    )}
                  </td>
                  <td>
                    <span className={`adm-status ${st.className}`}>
                      {st.label}
                    </span>
                  </td>
                  <td>
                    <select
                      className="adm-status-select"
                      value={order.status}
                      onChange={(e) =>
                        onStatusChange(order.id, e.target.value as OrderStatus)
                      }
                    >
                      <option value="waiting_payment">{th.admin.status.waiting_payment}</option>
                      <option value="paid">{th.admin.status.paid}</option>
                      <option value="shipping">{th.admin.status.shipping}</option>
                      <option value="completed">{th.admin.status.completed}</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Slip Modal Overlay */}
      {slipModal && (
        <div className="adm-slip-overlay" onClick={() => setSlipModal(null)}>
          <div className="adm-slip-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-slip-modal-header">
              <h3>🧾 {th.admin.orders.slip}</h3>
              <button
                className="adm-slip-close"
                onClick={() => setSlipModal(null)}
              >
                ✕
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slipModal} alt="สลิปการโอนเงิน" className="adm-slip-image" />
          </div>
        </div>
      )}
    </>
  );
}
