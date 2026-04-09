/**
 * Admin Dashboard Page
 * แสดงการ์ดสรุปข้อมูลร้านค้า + คำสั่งซื้อล่าสุด
 * ใช้ข้อมูลจาก OrderContext (localStorage) แทน mockOrders
 */

'use client';

import Link from 'next/link';
import DashboardCard from '@/components/admin/DashboardCard';
import th from '@/lib/th';
import { products } from '@/lib/constants';
import { useOrder } from '@/lib/order-context';

export default function AdminDashboardPage() {
  const { orders } = useOrder();

  /* คำนวณสถิติ */
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const waitingCount = orders.filter((o) => o.status === 'waiting_payment').length;
  const paidCount = orders.filter((o) => o.status === 'paid').length;
  const uniqueCustomers = new Set(orders.map((o) => o.customerEmail)).size;

  return (
    <>
      {/* ข้อความต้อนรับ */}
      <p className="adm-subtitle">{th.admin.subtitle}</p>

      {/* การ์ดสรุป */}
      <div className="adm-cards-grid">
        <DashboardCard
          icon="💰"
          label={th.admin.dashboard.totalRevenue}
          value={`฿${totalRevenue.toLocaleString()}`}
          trend="+12% จากเดือนที่แล้ว"
        />
        <DashboardCard
          icon="📋"
          label={th.admin.dashboard.totalOrders}
          value={String(orders.length)}
          trend={`${waitingCount} รอชำระ · ${paidCount} รอตรวจสอบ`}
        />
        <DashboardCard
          icon="📦"
          label={th.admin.dashboard.totalProducts}
          value={String(products.length)}
        />
        <DashboardCard
          icon="👥"
          label={th.admin.dashboard.totalCustomers}
          value={String(uniqueCustomers)}
          trend="+8 สัปดาห์นี้"
        />
      </div>

      {/* คำสั่งซื้อล่าสุด */}
      <div className="adm-section">
        <div className="adm-section-header">
          <h2>{th.admin.dashboard.recentOrders}</h2>
          <Link href="/admin/orders" className="adm-section-link">
            {th.admin.dashboard.viewAll} →
          </Link>
        </div>

        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>{th.admin.orders.orderId}</th>
                <th>{th.admin.orders.customer}</th>
                <th>{th.admin.orders.total}</th>
                <th>{th.admin.orders.status}</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id}>
                  <td className="adm-table-name">{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>฿{order.total.toLocaleString()}</td>
                  <td>
                    <span
                      className={`adm-status adm-status-${order.status}`}
                    >
                      {th.admin.status[order.status]}
                    </span>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', color: '#999', padding: '24px' }}>
                    {th.admin.orders.noOrders}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
