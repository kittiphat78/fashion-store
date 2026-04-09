/**
 * Admin Orders Page
 * จัดการคำสั่งซื้อ — ดูรายการ + เปลี่ยนสถานะ + ดูสลิป
 * ใช้ข้อมูลจาก OrderContext
 */

'use client';

import OrderTable from '@/components/admin/OrderTable';
import th from '@/lib/th';
import { useOrder } from '@/lib/order-context';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useOrder();

  /* สรุปจำนวนตามสถานะ */
  const waiting = orders.filter((o) => o.status === 'waiting_payment').length;
  const paid = orders.filter((o) => o.status === 'paid').length;
  const shipping = orders.filter((o) => o.status === 'shipping').length;
  const completed = orders.filter((o) => o.status === 'completed').length;

  return (
    <>
      {/* สรุปสถานะ */}
      <div className="adm-status-summary">
        <div className="adm-status-chip adm-status-waiting_payment">
          {th.admin.status.waiting_payment}: {waiting}
        </div>
        <div className="adm-status-chip adm-status-paid">
          {th.admin.status.paid}: {paid}
        </div>
        <div className="adm-status-chip adm-status-shipping">
          {th.admin.status.shipping}: {shipping}
        </div>
        <div className="adm-status-chip adm-status-completed">
          {th.admin.status.completed}: {completed}
        </div>
      </div>

      {/* ตารางคำสั่งซื้อ */}
      <OrderTable orders={orders} onStatusChange={updateOrderStatus} />
    </>
  );
}
