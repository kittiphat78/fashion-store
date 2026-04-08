/**
 * LoginForm Component
 * ฟอร์มเข้าสู่ระบบพร้อม validation
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import th from '@/lib/th';
import { useAuth } from '@/lib/auth-context';

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* Validation */
  const validate = (): boolean => {
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
    return true;
  };

  /* Submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setIsSubmitting(true);
    const success = await login(email, password);
    setIsSubmitting(false);

    if (success) {
      router.push('/');
    } else {
      setError(th.auth.errors.loginFailed);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {/* อีเมล */}
      <div className="form-group">
        <label htmlFor="login-email">{th.auth.email}</label>
        <input
          id="login-email"
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
        <label htmlFor="login-password">{th.auth.password}</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          placeholder={th.auth.passwordPlaceholder}
          autoComplete="current-password"
        />
      </div>

      {/* ข้อความ error */}
      {error && <div className="form-error">{error}</div>}

      {/* ปุ่มเข้าสู่ระบบ */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? 'กำลังเข้าสู่ระบบ...' : th.auth.login}
      </Button>

      {/* ลิงก์ไปสมัครสมาชิก */}
      <p className="auth-switch">
        {th.auth.noAccount}{' '}
        <Link href="/register" className="auth-switch-link">
          {th.auth.register}
        </Link>
      </p>
    </form>
  );
}
