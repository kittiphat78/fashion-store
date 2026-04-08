/**
 * หน้ารีวิว (Reviews Page)
 * รีวิวจากลูกค้าพร้อมคะแนนรวม
 */

import type { Metadata } from 'next';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';
import th from '@/lib/th';
import { reviews } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'รีวิว',
  description:
    'ดูความคิดเห็นจากลูกค้าที่ใช้งานสินค้า Fashion Co.',
};

export default function ReviewsPage() {
  /* คำนวณคะแนนเฉลี่ย */
  const avg = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  const avgStars = '★'.repeat(Math.round(parseFloat(avg)));

  return (
    <section className="section">
      <div className="container">
        {/* ส่วนหัวหน้า */}
        <SectionTitle
          title={th.reviewsPage.title}
          subtitle={th.reviewsPage.subtitle}
        />

        {/* คะแนนรวม */}
        <div className="reviews-summary animate-fade-in-up">
          <p className="reviews-summary-label">{th.reviewsPage.overallRating}</p>
          <div className="reviews-summary-score">{avg}</div>
          <div className="reviews-summary-stars">{avgStars}</div>
          <p className="reviews-summary-count">
            {th.reviewsPage.basedOn} {reviews.length} {th.reviewsPage.basedOnCount}
          </p>
        </div>

        {/* ตารางรีวิว */}
        <div className="reviews-grid stagger-children">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              {/* ส่วนหัว */}
              <div className="review-header">
                <div>
                  <div className="review-author">{review.author}</div>
                  <div className="review-date">
                    {new Date(review.date).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
                {review.verified && (
                  <span className="review-verified">{th.reviewsPage.verified}</span>
                )}
              </div>

              {/* ดาว */}
              <div className="review-stars">
                {'★'.repeat(Math.round(review.rating))}
              </div>

              {/* เนื้อหา */}
              <h4 className="review-title">{review.title}</h4>
              <p className="review-content">{review.content}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="review-cta">
          <h3>{th.reviewsPage.ctaTitle}</h3>
          <p>{th.reviewsPage.ctaDescription}</p>
          <Button variant="secondary" size="lg">
            {th.reviewsPage.writeReview}
          </Button>
        </div>
      </div>
    </section>
  );
}
