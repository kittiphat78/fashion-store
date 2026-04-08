/**
 * Header Component
 * แถบนำทางแบบ Sticky — แสดงตะกร้า, สถานะล็อกอิน, เมนูมือถือ
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navigationItems } from '@/lib/constants';
import th from '@/lib/th';
import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/lib/cart-context';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="header">
      <nav className="container header-inner">
        {/* Logo */}
        <Link href="/" className="header-logo">
          Fashion Co.
        </Link>

        {/* Desktop Navigation */}
        <ul className="header-nav">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="header-nav-link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Header Actions (Desktop) */}
        <div className="header-actions">
          {/* ตะกร้าสินค้า */}
          <Link href="/cart" className="header-cart" aria-label={th.cart.title}>
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="header-cart-badge">{totalItems}</span>
            )}
          </Link>

          {/* สถานะล็อกอิน */}
          {user ? (
            <div className="header-user">
              <span className="header-greeting">
                {th.auth.greeting}, {user.name}
              </span>
              <button className="header-logout-btn" onClick={logout}>
                {th.auth.logout}
              </button>
            </div>
          ) : (
            <Link href="/login" className="header-login-btn">
              {th.auth.login}
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="header-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="เปิด/ปิดเมนูนำทาง"
          aria-expanded={isMenuOpen}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation */}
      <ul className={`header-mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        {navigationItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="header-mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </li>
        ))}

        {/* Mobile: ตะกร้า + ล็อกอิน */}
        <li className="header-mobile-divider" />
        <li>
          <Link
            href="/cart"
            className="header-mobile-link"
            onClick={() => setIsMenuOpen(false)}
          >
            🛒 {th.cart.title}
            {totalItems > 0 && ` (${totalItems})`}
          </Link>
        </li>
        {user ? (
          <>
            <li className="header-mobile-greeting">
              {th.auth.greeting}, {user.name}
            </li>
            <li>
              <button
                className="header-mobile-link header-mobile-logout"
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
              >
                {th.auth.logout}
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              href="/login"
              className="header-mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {th.auth.login}
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}
