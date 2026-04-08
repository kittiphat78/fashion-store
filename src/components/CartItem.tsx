/**
 * CartItem Component
 * แสดงรายการสินค้าแต่ละชิ้นในตะกร้า — ปรับจำนวน/ลบได้
 */

'use client';

import Image from 'next/image';
import th from '@/lib/th';
import { useCart, type CartItem as CartItemType } from '@/lib/cart-context';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCart();
  const { product, quantity } = item;

  return (
    <div className="cart-item">
      {/* รูปสินค้า */}
      <div className="cart-item-image">
        <Image
          src={product.image}
          alt={product.name}
          width={100}
          height={100}
          quality={75}
        />
      </div>

      {/* ข้อมูลสินค้า */}
      <div className="cart-item-info">
        <h3 className="cart-item-name">{product.name}</h3>
        <p className="cart-item-price">฿{product.price.toLocaleString()}</p>

        {/* ตัวปรับจำนวน */}
        <div className="cart-item-actions">
          <div className="cart-qty">
            <button
              className="cart-qty-btn"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              aria-label="ลดจำนวน"
            >
              −
            </button>
            <span className="cart-qty-value">{quantity}</span>
            <button
              className="cart-qty-btn"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              aria-label="เพิ่มจำนวน"
            >
              +
            </button>
          </div>

          <button
            className="cart-item-remove"
            onClick={() => removeFromCart(product.id)}
          >
            {th.cart.remove}
          </button>
        </div>
      </div>

      {/* ราคารวมต่อชิ้น */}
      <div className="cart-item-total">
        ฿{(product.price * quantity).toLocaleString()}
      </div>
    </div>
  );
}
