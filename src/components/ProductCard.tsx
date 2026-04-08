/**
 * ProductCard Component
 * การ์ดแสดงสินค้า — ใช้ซ้ำได้ทุกหน้า
 * พร้อมปุ่ม "ดูรายละเอียด" และ "เพิ่มลงตะกร้า"
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from './Button';
import th from '@/lib/th';
import { useCart } from '@/lib/cart-context';
import type { Product } from '@/lib/constants';

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  discount,
  rating,
  reviews,
  category,
}: Product) {
  const { addToCart, isInCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  /* สร้างสตริงดาวจากคะแนน */
  const stars = '★'.repeat(Math.round(rating));
  const inCart = isInCart(id);

  /* เพิ่มสินค้าลงตะกร้าพร้อม feedback animation */
  const handleAddToCart = () => {
    addToCart({ id, name, price, originalPrice, image, discount, rating, reviews, category });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="product-card">
      {/* รูปสินค้า */}
      <div className="product-card-image">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          quality={80}
          loading="lazy"
        />

        {/* แบดจ์ส่วนลด */}
        {discount > 0 && (
          <span className="product-card-badge">-{discount}%</span>
        )}
      </div>

      {/* เนื้อหาการ์ด */}
      <div className="product-card-body">
        <h3 className="product-card-name">{name}</h3>

        {/* คะแนน */}
        <div className="product-card-rating">
          <span className="product-card-stars">{stars}</span>
          <span>
            {rating} ({reviews} {th.productCard.reviewsUnit})
          </span>
        </div>

        {/* ราคา */}
        <div className="product-card-price">
          <span className="product-card-price-current">
            ฿{price.toLocaleString()}
          </span>
          {originalPrice > price && (
            <span className="product-card-price-original">
              ฿{originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* ปุ่มดำเนินการ */}
        <div className="product-card-buttons">
          <Button
            variant={justAdded || inCart ? 'secondary' : 'outline'}
            size="md"
            fullWidth
            onClick={handleAddToCart}
          >
            {justAdded ? th.cart.added : th.cart.addToCart}
          </Button>
        </div>
      </div>
    </div>
  );
}
