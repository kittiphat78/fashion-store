/**
 * PaymentMethod Component
 * เลือกวิธีชำระเงิน — PromptPay เป็นค่าเริ่มต้น
 * ขยายเพิ่มช่องทางได้ง่าย
 */

'use client';

import th from '@/lib/th';

export type PaymentMethodType = 'promptpay';

interface PaymentMethodProps {
  selected: PaymentMethodType;
  onChange: (method: PaymentMethodType) => void;
}

/* ตัวเลือกวิธีชำระเงิน */
const methods: { id: PaymentMethodType; icon: string; label: string; desc: string }[] = [
  {
    id: 'promptpay',
    icon: '📱',
    label: th.payment.promptpay,
    desc: th.payment.promptpayDesc,
  },
];

export default function PaymentMethod({ selected, onChange }: PaymentMethodProps) {
  return (
    <div className="checkout-step">
      <div className="checkout-step-header">
        <span className="checkout-step-number">2</span>
        <h3 className="checkout-step-title">{th.checkout.paymentMethod}</h3>
      </div>

      <div className="payment-methods">
        {methods.map((method) => (
          <label
            key={method.id}
            className={`payment-method-card ${
              selected === method.id ? 'payment-method-active' : ''
            }`}
          >
            <input
              type="radio"
              name="payment-method"
              value={method.id}
              checked={selected === method.id}
              onChange={() => onChange(method.id)}
              className="payment-method-radio"
            />
            <span className="payment-method-icon">{method.icon}</span>
            <div className="payment-method-info">
              <span className="payment-method-label">{method.label}</span>
              <span className="payment-method-desc">{method.desc}</span>
            </div>
            <span className="payment-method-check">
              {selected === method.id && '✓'}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
