/**
 * ProductTable Component (Admin)
 * ตารางแสดงรายการสินค้าพร้อมปุ่มแก้ไข/ลบ
 */

'use client';

import Image from 'next/image';
import th from '@/lib/th';
import type { Product } from '@/lib/constants';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="adm-empty">{th.admin.products.noProducts}</div>
    );
  }

  return (
    <div className="adm-table-wrap">
      <table className="adm-table">
        <thead>
          <tr>
            <th>{th.admin.products.image}</th>
            <th>{th.admin.products.name}</th>
            <th>{th.admin.products.category}</th>
            <th>{th.admin.products.price}</th>
            <th>{th.admin.products.discount}</th>
            <th>{th.admin.orders.actions}</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                <div className="adm-table-img">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={48}
                    height={48}
                    quality={60}
                  />
                </div>
              </td>
              <td className="adm-table-name">{p.name}</td>
              <td>{p.category}</td>
              <td>฿{p.price.toLocaleString()}</td>
              <td>{p.discount}%</td>
              <td>
                <div className="adm-table-actions">
                  <button
                    className="adm-btn-edit"
                    onClick={() => onEdit(p)}
                  >
                    {th.admin.products.editProduct}
                  </button>
                  <button
                    className="adm-btn-delete"
                    onClick={() => onDelete(p.id)}
                  >
                    {th.admin.products.deleteProduct}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
