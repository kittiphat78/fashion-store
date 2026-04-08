/**
 * OrderTable Component (Admin)
 * ตารางแสดงคำสั่งซื้อพร้อมเปลี่ยนสถานะ
 */

'use client';

import th from '@/lib/th';
import type { Order, OrderStatus } from '@/lib/constants';

interface OrderTableProps {
  orders: Order[];
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

/* แปลงสถานะเป็นภาษาไทย + สี */
const statusMap: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: th.admin.status.pending, className: 'adm-status-pending' },
  shipping: { label: th.admin.status.shipping, className: 'adm-status-shipping' },
  completed: { label: th.admin.status.completed, className: 'adm-status-completed' },
};

export default function OrderTable({ orders, onStatusChange }: OrderTableProps) {
  if (orders.length === 0) {
    return (
      <div className="adm-empty">{th.admin.orders.noOrders}</div>
    );
  }

  return (
    <div className="adm-table-wrap">
      <table className="adm-table">
        <thead>
          <tr>
            <th>{th.admin.orders.orderId}</th>
            <th>{th.admin.orders.customer}</th>
            <th>{th.admin.orders.items}</th>
            <th>{th.admin.orders.total}</th>
            <th>{th.admin.orders.date}</th>
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
                    <option value="pending">{th.admin.status.pending}</option>
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
  );
}
