/**
 * Footer Component
 * ส่วนท้ายเว็บไซต์ — เมนู, ข้อมูลติดต่อ, โซเชียลมีเดีย
 */

import Link from 'next/link';
import th from '@/lib/th';
import {
  navigationItems,
  socialLinks,
  contactInfo,
} from '@/lib/constants';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        {/* Footer Grid */}
        <div className="footer-grid">
          {/* แบรนด์ */}
          <div className="footer-brand">
            <h3 className="header-logo">{th.brand}</h3>
            <p>{th.brandTagline}</p>
          </div>

          {/* เมนูนำทาง */}
          <div>
            <h4 className="footer-heading">{th.footer.navHeading}</h4>
            <ul className="footer-links">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ข้อมูลติดต่อ */}
          <div>
            <h4 className="footer-heading">{th.footer.contactHeading}</h4>
            <ul className="footer-contact-list">
              <li>{contactInfo.email}</li>
              <li>{contactInfo.phone}</li>
              <li>{contactInfo.address}</li>
              <li>{contactInfo.hours}</li>
            </ul>
          </div>

          {/* โซเชียล */}
          <div>
            <h4 className="footer-heading">{th.footer.socialHeading}</h4>
            <div className="footer-social">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* แถบล่าง */}
        <div className="footer-bottom">
          <p>© {year} {th.brand} {th.footer.copyright}</p>
          <div className="footer-bottom-links">
            <a href="#">{th.footer.privacy}</a>
            <a href="#">{th.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
