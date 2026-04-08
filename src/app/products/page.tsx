/**
 * หน้าสินค้า (Products Page)
 * แสดงสินค้าทั้งหมดพร้อมตัวกรองหมวดหมู่
 */

import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/Button';
import th from '@/lib/th';
import { products, categories } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'สินค้า',
  description:
    'เลือกชมสินค้าเสื้อผ้าและรองเท้าคุณภาพพรีเมียมที่คัดสรรมาเพื่อคุณ',
};

export default function ProductsPage() {
  return (
    <section className="section">
      <div className="container">
        {/* ส่วนหัวหน้า */}
        <div className="page-header animate-fade-in-up">
          <h1>{th.productsPage.title}</h1>
          <p>{th.productsPage.subtitle}</p>
        </div>

        {/* ตัวกรอง */}
        <div className="filters-bar">
          <div className="filters-group">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={cat === th.categories.all ? 'secondary' : 'outline'}
                size="sm"
              >
                {cat}
              </Button>
            ))}
          </div>
          <select className="filter-select" aria-label={th.productsPage.sortLabel}>
            <option>{th.sort.latest}</option>
            <option>{th.sort.priceLow}</option>
            <option>{th.sort.priceHigh}</option>
            <option>{th.sort.bestRated}</option>
          </select>
        </div>

        {/* ตารางสินค้า */}
        <div className="products-grid stagger-children">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* โหลดเพิ่มเติม */}
        <div className="cta-center">
          <Button variant="outline" size="lg">
            {th.productsPage.loadMore}
          </Button>
        </div>
      </div>
    </section>
  );
}
