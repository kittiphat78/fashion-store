/**
 * Constants & Mock Data
 * แหล่งข้อมูลกลาง — ทุกหน้าใช้ map() จากไฟล์นี้ (DRY Principle)
 * ข้อความทั้งหมดเป็นภาษาไทย
 */

import th from './th';

// ========== Types ==========
export interface NavItem {
  label: string;
  href: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  discount: number;
  rating: number;
  reviews: number;
}

export interface Promotion {
  id: number;
  title: string;
  description: string;
  discount: number;
  code: string;
  validUntil: string;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
}

export interface ContactDetails {
  email: string;
  phone: string;
  address: string;
  hours: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

// ========== เมนูนำทาง ==========
export const navigationItems: NavItem[] = [
  { label: th.nav.home, href: '/' },
  { label: th.nav.products, href: '/products' },
  { label: th.nav.promotions, href: '/promotions' },
  { label: th.nav.reviews, href: '/reviews' },
  { label: th.nav.contact, href: '/contact' },
];

// ========== สินค้า ==========
export const products: Product[] = [
  {
    id: 1,
    name: 'เสื้อยืดคอตตอนพรีเมียม',
    price: 599,
    originalPrice: 799,
    category: 'เสื้อ',
    image: '/images/products/tshirt.png',
    discount: 25,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: 'แจ็คเก็ตยีนส์แคชชวล',
    price: 1299,
    originalPrice: 1599,
    category: 'แจ็คเก็ต',
    image: '/images/products/jacket.png',
    discount: 19,
    rating: 4.9,
    reviews: 98,
  },
  {
    id: 3,
    name: 'รองเท้าวิ่งสวมใส่สบาย',
    price: 1999,
    originalPrice: 2499,
    category: 'รองเท้า',
    image: '/images/products/running-shoes.png',
    discount: 20,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: 'รองเท้าผ้าใบสีขาวคลาสสิก',
    price: 1499,
    originalPrice: 1899,
    category: 'รองเท้า',
    image: '/images/products/sneakers.png',
    discount: 21,
    rating: 4.8,
    reviews: 203,
  },
  {
    id: 5,
    name: 'กางเกงขาสั้นแคชชวล',
    price: 449,
    originalPrice: 699,
    category: 'กางเกงขาสั้น',
    image: '/images/products/shorts.png',
    discount: 36,
    rating: 4.6,
    reviews: 87,
  },
  {
    id: 6,
    name: 'เสื้อเชิ้ตทางการสุดเรียบหรู',
    price: 899,
    originalPrice: 1199,
    category: 'เสื้อ',
    image: '/images/products/formal-shirt.png',
    discount: 25,
    rating: 4.9,
    reviews: 142,
  },
];

// ========== หมวดหมู่ ==========
export const categories = [
  th.categories.all,
  th.categories.shirts,
  th.categories.shoes,
  th.categories.jackets,
  th.categories.shorts,
];

// ========== โปรโมชั่น ==========
export const promotions: Promotion[] = [
  {
    id: 1,
    title: 'ลดกระหน่ำซัมเมอร์ 2026',
    description: 'รับส่วนลดสูงสุด 50% สำหรับสินค้าคอลเลกชันซัมเมอร์ทั้งหมด',
    discount: 50,
    code: 'SUMMER50',
    validUntil: '2026-08-31',
  },
  {
    id: 2,
    title: 'ต้อนรับลูกค้าใหม่',
    description: 'ลูกค้าใหม่รับส่วนลด 30% สำหรับการสั่งซื้อครั้งแรก',
    discount: 30,
    code: 'WELCOME30',
    validUntil: '2026-12-31',
  },
  {
    id: 3,
    title: 'ซื้อเป็นเซ็ตคุ้มกว่า',
    description: 'ซื้อ 3 ชิ้นขึ้นไป รับส่วนลดเพิ่มอีก 25% ทันที',
    discount: 25,
    code: 'BUNDLE25',
    validUntil: '2026-09-30',
  },
  {
    id: 4,
    title: 'สิทธิพิเศษสมาชิก',
    description: 'สมาชิกรับสิทธิ์เข้าถึงสินค้าใหม่ก่อนใคร พร้อมส่วนลด 20%',
    discount: 20,
    code: 'LOYAL20',
    validUntil: '2026-10-31',
  },
];

// ========== รีวิว ==========
export const reviews: Review[] = [
  {
    id: 1,
    author: 'สมหญิง ศรีสุข',
    rating: 5,
    title: 'คุณภาพดีเยี่ยม!',
    content:
      'สินค้าคุณภาพดีมาก จัดส่งรวดเร็วทันใจ แนะนำเลยค่ะ ประทับใจมากๆ',
    date: '2026-04-01',
    verified: true,
  },
  {
    id: 2,
    author: 'ธนกร วงศ์ประเสริฐ',
    rating: 4.5,
    title: 'คุ้มค่ามากครับ',
    content:
      'ราคาดีมาก บริการหลังการขายก็ดี จะกลับมาสั่งซื้ออีกแน่นอนครับ',
    date: '2026-03-28',
    verified: true,
  },
  {
    id: 3,
    author: 'พิมพ์ชนก แก้วมณี',
    rating: 5,
    title: 'ใส่พอดีเป๊ะ!',
    content:
      'ได้ของตรงตามที่คาดหวังเลยค่ะ เสื้อผ้าใส่พอดี สวยกว่าในรูปอีก',
    date: '2026-03-25',
    verified: true,
  },
  {
    id: 4,
    author: 'อนุชา จันทร์เจริญ',
    rating: 4,
    title: 'ประสบการณ์ที่ดี',
    content:
      'สินค้าหลากหลาย ดีไซน์สวย การจัดส่งช้ากว่าที่คิดนิดหน่อย แต่โดยรวมพอใจครับ',
    date: '2026-03-20',
    verified: true,
  },
  {
    id: 5,
    author: 'วรรณา สุขสมบูรณ์',
    rating: 5,
    title: 'ช็อปออนไลน์ที่ดีที่สุด!',
    content:
      'ทีมบริการลูกค้าดีมากค่ะ สอบถามอะไรตอบกลับทันที ชอบแบรนด์นี้มากๆ',
    date: '2026-03-15',
    verified: true,
  },
  {
    id: 6,
    author: 'ศิริพงษ์ มั่นคง',
    rating: 4.5,
    title: 'เชื่อถือได้ คุณภาพคงที่',
    content:
      'ซื้อมาหลายครั้งแล้วครับ คุณภาพสินค้าคงเส้นคงวา ราคายุติธรรมทุกครั้ง',
    date: '2026-03-10',
    verified: true,
  },
];

// ========== ลิงก์โซเชียลมีเดีย ==========
export const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'Twitter / X', href: '#' },
  { label: 'LINE', href: '#' },
];

// ========== ข้อมูลติดต่อ ==========
export const contactInfo: ContactDetails = {
  email: 'hello@fashionco.com',
  phone: '+66 81-234-5678',
  address: 'กรุงเทพมหานคร, ประเทศไทย 10110',
  hours: 'จันทร์ – ศุกร์: 9:00 – 18:00 น.',
};

// ========== หัวข้อติดต่อ (dropdown) ==========
export const contactSubjects = [
  { value: '', label: 'กรุณาเลือกหัวข้อ' },
  { value: 'order', label: 'สอบถามเรื่องคำสั่งซื้อ' },
  { value: 'product', label: 'สอบถามเกี่ยวกับสินค้า' },
  { value: 'shipping', label: 'ข้อมูลการจัดส่ง' },
  { value: 'return', label: 'เปลี่ยน / คืนสินค้า' },
  { value: 'feedback', label: 'ข้อเสนอแนะ' },
  { value: 'other', label: 'อื่นๆ' },
];

// ========== เงื่อนไขโปรโมชั่น ==========
export const promotionTerms = [
  'ใช้ได้กับสินค้าราคาปกติทุกรายการ',
  'ไม่สามารถใช้ร่วมกับโปรโมชั่นอื่นได้',
  'ส่วนลดจะถูกคำนวณเมื่อชำระเงิน',
  'ใช้ได้สำหรับการสั่งซื้อออนไลน์เท่านั้น',
  'ขึ้นอยู่กับจำนวนสินค้าคงคลัง',
];

// ========== ส่วน Hero ==========
export const heroSection = {
  badge: th.hero.badge,
  title: th.hero.title,
  subtitle: th.hero.subtitle,
  cta: th.hero.cta,
  ctaSecondary: th.hero.ctaSecondary,
};

// ========== ส่วนสินค้าแนะนำ ==========
export const featuredSection = {
  title: th.featured.title,
  subtitle: th.featured.subtitle,
};

// ========== สถิติ ==========
export const stats = [
  { label: th.stats.customers, value: '50,000+' },
  { label: th.stats.products, value: '1,000+' },
  { label: th.stats.years, value: '8+' },
];
