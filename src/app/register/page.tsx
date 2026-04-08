/**
 * หน้าสมัครสมาชิก (Register Page)
 */

import SectionTitle from '@/components/SectionTitle';
import RegisterForm from '@/components/RegisterForm';
import th from '@/lib/th';

export const metadata = {
  title: 'สมัครสมาชิก',
  description: 'สร้างบัญชีใหม่เพื่อรับสิทธิพิเศษและโปรโมชั่นก่อนใคร',
};

export default function RegisterPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="auth-page">
          <SectionTitle
            title={th.auth.registerTitle}
            subtitle={th.auth.registerSubtitle}
          />
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
