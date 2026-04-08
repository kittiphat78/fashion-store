/**
 * หน้าหลัก (Home Page)
 * Hero, สินค้าแนะนำ, สถิติ, และจดหมายข่าว
 */

import Image from 'next/image';
import SectionTitle from '@/components/SectionTitle';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/Button';
import th from '@/lib/th';
import {
  products,
  heroSection,
  featuredSection,
  stats,
} from '@/lib/constants';

export default function Home() {
  /* แสดง 6 สินค้าแรกในส่วนสินค้าแนะนำ */
  const featured = products.slice(0, 6);

  return (
    <>
      {/* ===== Hero Section ===== */}
      <section className="hero">
        <div className="container hero-grid">
          {/* เนื้อหา */}
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              {heroSection.badge}
            </div>
            <h1>{heroSection.title}</h1>
            <p className="hero-subtitle">{heroSection.subtitle}</p>
            <div className="hero-actions">
              <Button href="/products" variant="primary" size="lg">
                {heroSection.cta}
              </Button>
              <Button href="/promotions" variant="outline" size="lg">
                {heroSection.ctaSecondary}
              </Button>
            </div>
          </div>

          {/* รูปภาพ Hero */}
          <div className="hero-image">
            <Image
              src="/images/hero/banner.png"
              alt="คอลเลกชันแฟชั่นพรีเมียม"
              width={600}
              height={750}
              priority
              quality={85}
            />
          </div>
        </div>
      </section>

      {/* ===== สินค้าแนะนำ ===== */}
      <section className="section">
        <div className="container">
          <SectionTitle
            title={featuredSection.title}
            subtitle={featuredSection.subtitle}
          />

          <div className="products-grid stagger-children">
            {featured.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="cta-center">
            <Button href="/products" variant="secondary" size="lg">
              {th.productsPage.viewAll}
            </Button>
          </div>
        </div>
      </section>

      {/* ===== สถิติ ===== */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid stagger-children">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== จดหมายข่าว ===== */}
      <section className="section section-alt">
        <div className="container">
          <div className="newsletter">
            <h2>{th.newsletter.title}</h2>
            <p>{th.newsletter.subtitle}</p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder={th.newsletter.placeholder}
                className="newsletter-input"
                aria-label={th.newsletter.ariaLabel}
              />
              <Button variant="primary" size="md">
                {th.newsletter.button}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
