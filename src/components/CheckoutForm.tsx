/**
 * CheckoutForm Component
 * ฟอร์มกรอกข้อมูลจัดส่ง — ชื่อผู้รับ, ที่อยู่, เบอร์โทร
 * Pre-fill ชื่อจาก auth context
 */

'use client';

import { useState, useEffect } from 'react';
import th from '@/lib/th';
import { useAuth } from '@/lib/auth-context';

export interface ShippingInfo {
  name: string;
  address: string;
  phone: string;
}

interface CheckoutFormProps {
  onDataChange: (data: ShippingInfo, isValid: boolean) => void;
}

export default function CheckoutForm({ onDataChange }: CheckoutFormProps) {
  const { user } = useAuth();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [touched, setTouched] = useState({
    name: false,
    address: false,
    phone: false,
  });

  /* Pre-fill ชื่อจาก user session */
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  /* Validation */
  const errors = {
    name: !name.trim() ? th.checkout.errors.nameRequired : '',
    address: !address.trim() ? th.checkout.errors.addressRequired : '',
    phone: !phone.trim()
      ? th.checkout.errors.phoneRequired
      : !/^\d{10}$/.test(phone.replace(/[-\s]/g, ''))
        ? th.checkout.errors.phoneInvalid
        : '',
  };

  const isValid = !errors.name && !errors.address && !errors.phone;

  /* ส่งข้อมูลไปยัง parent เมื่อเปลี่ยน */
  useEffect(() => {
    onDataChange({ name: name.trim(), address: address.trim(), phone: phone.replace(/[-\s]/g, '') }, isValid);
  }, [name, address, phone, isValid, onDataChange]);

  return (
    <div className="checkout-step">
      {/* หมายเลขขั้นตอน */}
      <div className="checkout-step-header">
        <span className="checkout-step-number">1</span>
        <h3 className="checkout-step-title">{th.checkout.shippingInfo}</h3>
      </div>

      <div className="checkout-form-fields">
        {/* ชื่อผู้รับ */}
        <div className="form-group">
          <label htmlFor="checkout-name">{th.checkout.recipientName} *</label>
          <input
            id="checkout-name"
            type="text"
            className={`form-input ${touched.name && errors.name ? 'form-input-error' : ''}`}
            placeholder={th.checkout.recipientNamePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((p) => ({ ...p, name: true }))}
          />
          {touched.name && errors.name && (
            <span className="form-field-error">{errors.name}</span>
          )}
        </div>

        {/* ที่อยู่จัดส่ง */}
        <div className="form-group">
          <label htmlFor="checkout-address">{th.checkout.address} *</label>
          <textarea
            id="checkout-address"
            className={`form-textarea ${touched.address && errors.address ? 'form-input-error' : ''}`}
            placeholder={th.checkout.addressPlaceholder}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={() => setTouched((p) => ({ ...p, address: true }))}
            rows={3}
          />
          {touched.address && errors.address && (
            <span className="form-field-error">{errors.address}</span>
          )}
        </div>

        {/* เบอร์โทรศัพท์ */}
        <div className="form-group">
          <label htmlFor="checkout-phone">{th.checkout.phone} *</label>
          <input
            id="checkout-phone"
            type="tel"
            className={`form-input ${touched.phone && errors.phone ? 'form-input-error' : ''}`}
            placeholder={th.checkout.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
            maxLength={12}
          />
          {touched.phone && errors.phone && (
            <span className="form-field-error">{errors.phone}</span>
          )}
        </div>
      </div>
    </div>
  );
}
