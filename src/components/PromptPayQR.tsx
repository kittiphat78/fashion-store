/**
 * PromptPayQR Component
 * แสดง QR Code PromptPay + ข้อมูลการโอน + อัปโหลดสลิป
 */

'use client';

import { useState, useRef, useCallback } from 'react';
import th from '@/lib/th';
import { PROMPTPAY_NUMBER, PROMPTPAY_NAME } from '@/lib/constants';

interface PromptPayQRProps {
  amount: number;
  onSlipUpload?: (base64: string) => void;
  existingSlip?: string;
}

export default function PromptPayQR({ amount, onSlipUpload, existingSlip }: PromptPayQRProps) {
  const [slipPreview, setSlipPreview] = useState<string | null>(existingSlip || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* QR Code URL — ใช้ promptpay.io API */
  const qrUrl = `https://promptpay.io/${PROMPTPAY_NUMBER.replace(/-/g, '')}/${amount}.png`;

  /* จัดการอัปโหลดสลิป */
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setSlipPreview(base64);
        onSlipUpload?.(base64);
        setIsUploading(false);
      };
      reader.onerror = () => {
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    },
    [onSlipUpload]
  );

  /* ลบสลิป */
  const handleRemoveSlip = useCallback(() => {
    setSlipPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <div className="promptpay-section">
      {/* QR Code */}
      <div className="promptpay-qr-card">
        <h4 className="promptpay-qr-title">{th.payment.qrTitle}</h4>

        <div className="promptpay-qr-image-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrUrl}
            alt="PromptPay QR Code"
            className="promptpay-qr-image"
            width={200}
            height={200}
          />
        </div>

        {/* ข้อมูล PromptPay */}
        <div className="promptpay-info">
          <div className="promptpay-info-row">
            <span className="promptpay-info-label">{th.payment.promptpayNumber}</span>
            <span className="promptpay-info-value">{PROMPTPAY_NUMBER}</span>
          </div>
          <div className="promptpay-info-row">
            <span className="promptpay-info-label">ชื่อบัญชี</span>
            <span className="promptpay-info-value">{PROMPTPAY_NAME}</span>
          </div>
          <div className="promptpay-info-row promptpay-info-total">
            <span className="promptpay-info-label">{th.payment.amountToPay}</span>
            <span className="promptpay-info-value promptpay-amount">
              ฿{amount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* อัปโหลดสลิป */}
      <div className="slip-upload-card">
        <h4 className="slip-upload-title">{th.payment.uploadSlip}</h4>
        <p className="slip-upload-desc">{th.payment.uploadSlipDesc}</p>

        {slipPreview ? (
          /* แสดง preview สลิป */
          <div className="slip-preview">
            <div className="slip-preview-image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={slipPreview} alt={th.payment.slipPreview} className="slip-preview-image" />
            </div>
            <div className="slip-preview-actions">
              <span className="slip-uploaded-badge">{th.payment.slipUploaded}</span>
              <button
                type="button"
                className="slip-remove-btn"
                onClick={handleRemoveSlip}
              >
                {th.payment.removeSlip}
              </button>
            </div>
          </div>
        ) : (
          /* ปุ่มเลือกไฟล์ */
          <div className="slip-upload-area">
            <label className="slip-upload-btn" htmlFor="slip-file">
              <span className="slip-upload-icon">📎</span>
              <span>{th.payment.chooseFile}</span>
              {isUploading && <span className="slip-uploading">กำลังอัปโหลด...</span>}
            </label>
            <input
              ref={fileInputRef}
              id="slip-file"
              type="file"
              accept="image/*"
              className="slip-upload-input"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
