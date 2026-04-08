/**
 * หน้าโปรโมชั่น (Promotions Page)
 * แสดงดีลและโปรโมชั่นพิเศษ
 */

import type { Metadata } from 'next';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';
import th from '@/lib/th';
import { promotions, promotionTerms } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'โปรโมชั่น',
  description:
    'อย่าพลาดดีลสุดพิเศษและข้อเสนอจำกัดเวลาจากเรา',
};

export default function PromotionsPage() {
  return (
    <section className="section">
      <div className="container">
        {/* ส่วนหัวหน้า */}
        <SectionTitle
          title={th.promotionsPage.title}
          subtitle={th.promotionsPage.subtitle}
        />

        {/* ตารางโปรโมชั่น */}
        <div className="promos-grid stagger-children">
          {promotions.map((promo) => (
            <div key={promo.id} className="promo-card">
              {/* แบนเนอร์ */}
              <div className="promo-card-banner">
                <span className="promo-card-discount">
                  -{promo.discount}%
                </span>
                <span className="promo-card-badge">
                  {th.promotionsPage.off} {promo.discount}%
                </span>
              </div>

              {/* เนื้อหา */}
              <div className="promo-card-body">
                <h3>{promo.title}</h3>
                <p>{promo.description}</p>

                {/* รายละเอียด */}
                <div className="promo-details">
                  <div className="promo-detail-row">
                    <span>{th.promotionsPage.code}</span>
                    <code className="promo-code">{promo.code}</code>
                  </div>
                  <div className="promo-detail-row">
                    <span>{th.promotionsPage.validUntil}</span>
                    <span>
                      {new Date(promo.validUntil).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                <Button href="/products" variant="primary" fullWidth>
                  {th.promotionsPage.shopNow}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* เงื่อนไข */}
        <div className="terms-box">
          <h3>{th.promotionsPage.termsTitle}</h3>
          <ul className="terms-list">
            {promotionTerms.map((term) => (
              <li key={term}>
                <span className="terms-check">✓</span>
                {term}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
