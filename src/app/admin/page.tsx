/**
 * Admin Dashboard Page
 * แสดงการ์ดสรุปข้อมูลร้านค้า + คำสั่งซื้อล่าสุด
 */

'use client';

import Link from 'next/link';
import DashboardCard from '@/components/admin/DashboardCard';
import th from '@/lib/th';
import { products, mockOrders } from '@/lib/constants';

export default function AdminDashboardPage() {
  /* คำนวณสถิติ */
  const totalRevenue = mockOrders.reduce((sum, o) => sum + o.total, 0);
  const pendingCount = mockOrders.filter((o) => o.status === 'pending').length;

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
          value={String(mockOrders.length)}
          trend={`${pendingCount} รอดำเนินการ`}
        />
        <DashboardCard
          icon="📦"
          label={th.admin.dashboard.totalProducts}
          value={String(products.length)}
        />
        <DashboardCard
          icon="👥"
          label={th.admin.dashboard.totalCustomers}
          value="128"
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
              {mockOrders.slice(0, 3).map((order) => (
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
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
