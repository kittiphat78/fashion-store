/**
 * Root Layout
 * ตั้งค่า Global Styles, SEO Metadata, Providers, Header/Footer
 */

import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: 'Fashion Co. | เสื้อผ้าและรองเท้าพรีเมียม',
    template: '%s | Fashion Co.',
  },
  description:
    'ค้นพบเสื้อผ้าและรองเท้าคุณภาพพรีเมียม ดีไซน์มินิมอล จัดส่งรวดเร็ว คุณภาพเหนือระดับ',
  keywords: [
    'เสื้อผ้า',
    'รองเท้า',
    'แฟชั่น',
    'ซื้อเสื้อผ้าออนไลน์',
    'รองเท้าผ้าใบ',
    'clothing',
    'shoes',
    'fashion',
  ],
  authors: [{ name: 'Fashion Co.' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="site-layout">
        <Providers>
          {/* เมนูนำทางหลัก */}
          <Header />

          {/* เนื้อหาหน้า */}
          <main className="site-main">{children}</main>

          {/* ส่วนท้ายเว็บไซต์ */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
