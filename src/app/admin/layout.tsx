/**
 * Admin Layout
 * Layout แยกเฉพาะหน้า admin — มี Sidebar + Header + Protected Route
 * ไม่ใช้ Header/Footer ของฝั่ง user
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import th from '@/lib/th';
import { useAuth } from '@/lib/auth-context';
import { adminNavItems } from '@/lib/constants';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, isAdmin, logout } = useAuth();

  /* Protected: เฉพาะ admin เท่านั้น */
  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push('/');
    }
  }, [user, isLoading, isAdmin, router]);

  if (isLoading) {
    return (
      <div className="adm-loading">
        <p>กำลังตรวจสอบสิทธิ์...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="adm-loading">
        <h2>🔒 {th.admin.unauthorized}</h2>
        <p>{th.admin.unauthorizedDesc}</p>
      </div>
    );
  }

  return (
    <div className="adm-layout">
      {/* ===== Sidebar ===== */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-brand">
          <span className="adm-sidebar-logo">FC</span>
          <span className="adm-sidebar-title">Admin</span>
        </div>

        <nav className="adm-sidebar-nav">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`adm-sidebar-link ${
                pathname === item.href ? 'active' : ''
              }`}
            >
              {/* ไอคอนง่ายๆ */}
              <span className="adm-sidebar-icon">
                {item.href === '/admin' && '📊'}
                {item.href === '/admin/products' && '📦'}
                {item.href === '/admin/orders' && '🧾'}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="adm-sidebar-footer">
          <Link href="/" className="adm-sidebar-back">
            {th.admin.backToSite}
          </Link>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <div className="adm-main">
        {/* Admin Header */}
        <header className="adm-header">
          <h1 className="adm-header-title">
            {adminNavItems.find((n) => n.href === pathname)?.label ||
              th.admin.title}
          </h1>
          <div className="adm-header-user">
            <span className="adm-header-name">{user.name}</span>
            <button className="adm-header-logout" onClick={logout}>
              {th.auth.logout}
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="adm-content">{children}</main>
      </div>
    </div>
  );
}
