/**
 * Admin Orders Page
 * จัดการคำสั่งซื้อ — ดูรายการ + เปลี่ยนสถานะ
 */

'use client';

import { useState, useCallback } from 'react';
import OrderTable from '@/components/admin/OrderTable';
import {
  mockOrders,
  type Order,
  type OrderStatus,
} from '@/lib/constants';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  /* เปลี่ยนสถานะคำสั่งซื้อ */
  const handleStatusChange = useCallback(
    (orderId: string, newStatus: OrderStatus) => {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: newStatus } : o
        )
      );
    },
    []
  );

  /* สรุปจำนวนตามสถานะ */
  const pending = orders.filter((o) => o.status === 'pending').length;
  const shipping = orders.filter((o) => o.status === 'shipping').length;
  const completed = orders.filter((o) => o.status === 'completed').length;

  return (
    <>
      {/* สรุปสถานะ */}
      <div className="adm-status-summary">
        <div className="adm-status-chip adm-status-pending">
          รอดำเนินการ: {pending}
        </div>
        <div className="adm-status-chip adm-status-shipping">
          กำลังจัดส่ง: {shipping}
        </div>
        <div className="adm-status-chip adm-status-completed">
          สำเร็จ: {completed}
        </div>
      </div>

      {/* ตารางคำสั่งซื้อ */}
      <OrderTable orders={orders} onStatusChange={handleStatusChange} />
    </>
  );
}
