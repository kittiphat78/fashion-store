/**
 * หน้าติดต่อเรา (Contact Page)
 * ฟอร์มติดต่อพร้อมข้อมูลบริษัท
 */

'use client';

import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';
import th from '@/lib/th';
import {
  contactInfo,
  socialLinks,
  contactSubjects,
} from '@/lib/constants';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* จัดการเปลี่ยนแปลงฟอร์ม */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* ส่งฟอร์ม */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ในโปรดักชัน ส่งไปยัง API
    console.log('ส่งฟอร์ม:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="section">
      <div className="container">
        {/* ส่วนหัว */}
        <SectionTitle
          title={th.contactPage.title}
          subtitle={th.contactPage.subtitle}
        />

        <div className="contact-grid">
          {/* === ฟอร์มติดต่อ === */}
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="contact-name">
                {th.contactPage.form.name}
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder={th.contactPage.form.namePlaceholder}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">
                {th.contactPage.form.email}
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder={th.contactPage.form.emailPlaceholder}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">
                {th.contactPage.form.subject}
              </label>
              <select
                id="contact-subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="form-select"
              >
                {contactSubjects.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">
                {th.contactPage.form.message}
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="form-textarea"
                placeholder={th.contactPage.form.messagePlaceholder}
              />
            </div>

            {/* ข้อความสำเร็จ */}
            {isSubmitted && (
              <div className="form-success">
                {th.contactPage.form.success}
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" fullWidth>
              {th.contactPage.form.submit}
            </Button>
          </form>

          {/* === ข้อมูลติดต่อ === */}
          <div>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <h3>{th.contactPage.info.emailLabel}</h3>
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </div>
              <div className="contact-info-item">
                <h3>{th.contactPage.info.phoneLabel}</h3>
                <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
              </div>
              <div className="contact-info-item">
                <h3>{th.contactPage.info.addressLabel}</h3>
                <p>{contactInfo.address}</p>
              </div>
              <div className="contact-info-item">
                <h3>{th.contactPage.info.hoursLabel}</h3>
                <p>{contactInfo.hours}</p>
                <p className="contact-info-sub">{th.contactPage.info.closedDays}</p>
              </div>
            </div>

            {/* โซเชียลมีเดีย */}
            <div className="contact-social">
              <h3>{th.contactPage.followUs}</h3>
              <div className="contact-social-links">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="contact-social-link"
                    aria-label={link.label}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* แผนที่ */}
        <div className="contact-map">
          <div className="contact-map-placeholder">
            <span className="contact-map-icon">📍</span>
            <span>{th.contactPage.mapLocation}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
