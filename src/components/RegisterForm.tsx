/**
 * RegisterForm Component
 * ฟอร์มสมัครสมาชิกพร้อม validation
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import th from '@/lib/th';
import { useAuth } from '@/lib/auth-context';

export default function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* Validation */
  const validate = (): boolean => {
    if (!name.trim()) {
      setError(th.auth.errors.nameRequired);
      return false;
    }
    if (!email.trim()) {
      setError(th.auth.errors.emailRequired);
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(th.auth.errors.emailInvalid);
      return false;
    }
    if (!password) {
      setError(th.auth.errors.passwordRequired);
      return false;
    }
    if (password.length < 6) {
      setError(th.auth.errors.passwordMin);
      return false;
    }
    if (password !== confirmPassword) {
      setError(th.auth.errors.passwordMismatch);
      return false;
    }
    return true;
  };

  /* Submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setIsSubmitting(true);
    const success = await register(name, email, password);
    setIsSubmitting(false);

    if (success) {
      router.push('/');
    } else {
      setError(th.auth.errors.emailInvalid);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {/* ชื่อ */}
      <div className="form-group">
        <label htmlFor="register-name">{th.auth.fullName}</label>
        <input
          id="register-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
          placeholder={th.auth.fullNamePlaceholder}
          autoComplete="name"
        />
      </div>

      {/* อีเมล */}
      <div className="form-group">
        <label htmlFor="register-email">{th.auth.email}</label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          placeholder={th.auth.emailPlaceholder}
          autoComplete="email"
        />
      </div>

      {/* รหัสผ่าน */}
      <div className="form-group">
        <label htmlFor="register-password">{th.auth.password}</label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          placeholder={th.auth.passwordPlaceholder}
          autoComplete="new-password"
        />
      </div>

      {/* ยืนยันรหัสผ่าน */}
      <div className="form-group">
        <label htmlFor="register-confirm">{th.auth.confirmPassword}</label>
        <input
          id="register-confirm"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-input"
          placeholder={th.auth.confirmPasswordPlaceholder}
          autoComplete="new-password"
        />
      </div>

      {/* ข้อความ error */}
      {error && <div className="form-error">{error}</div>}

      {/* ปุ่มสมัครสมาชิก */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? 'กำลังสมัครสมาชิก...' : th.auth.register}
      </Button>

      {/* ลิงก์ไปเข้าสู่ระบบ */}
      <p className="auth-switch">
        {th.auth.hasAccount}{' '}
        <Link href="/login" className="auth-switch-link">
          {th.auth.login}
        </Link>
      </p>
    </form>
  );
}
