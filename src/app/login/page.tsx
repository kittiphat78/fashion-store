/**
 * หน้าเข้าสู่ระบบ (Login Page)
 */

import SectionTitle from '@/components/SectionTitle';
import LoginForm from '@/components/LoginForm';
import th from '@/lib/th';

export const metadata = {
  title: 'เข้าสู่ระบบ',
  description: 'เข้าสู่ระบบเพื่อเลือกซื้อสินค้าและจัดการตะกร้าของคุณ',
};

export default function LoginPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="auth-page">
          <SectionTitle
            title={th.auth.loginTitle}
            subtitle={th.auth.loginSubtitle}
          />
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
