/**
 * Admin Products Page
 * จัดการสินค้า — เพิ่ม, แก้ไข, ลบ
 */

'use client';

import { useState, useCallback } from 'react';
import ProductTable from '@/components/admin/ProductTable';
import th from '@/lib/th';
import { products as initialProducts, categories, type Product } from '@/lib/constants';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  /* ข้อมูลฟอร์มเริ่มต้น */
  const emptyForm: Omit<Product, 'id' | 'rating' | 'reviews'> = {
    name: '',
    price: 0,
    originalPrice: 0,
    category: categories[1],
    image: '/images/products/tshirt.png',
    discount: 0,
  };
  const [formData, setFormData] = useState(emptyForm);

  /* เปิดฟอร์มเพิ่มสินค้า */
  const handleAdd = useCallback(() => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setShowForm(true);
  }, []);

  /* เปิดฟอร์มแก้ไขสินค้า */
  const handleEdit = useCallback((product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      category: product.category,
      image: product.image,
      discount: product.discount,
    });
    setShowForm(true);
  }, []);

  /* ลบสินค้า */
  const handleDelete = useCallback((id: number) => {
    if (confirm(th.admin.products.deleteConfirm)) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
    }
  }, []);

  /* บันทึก (เพิ่ม/แก้ไข) */
  const handleSave = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (editingProduct) {
        /* แก้ไข */
        setProductList((prev) =>
          prev.map((p) =>
            p.id === editingProduct.id
              ? { ...p, ...formData }
              : p
          )
        );
      } else {
        /* เพิ่มใหม่ */
        const newProduct: Product = {
          id: Date.now(),
          ...formData,
          rating: 0,
          reviews: 0,
        };
        setProductList((prev) => [...prev, newProduct]);
      }

      setShowForm(false);
      setEditingProduct(null);
    },
    [editingProduct, formData]
  );

  /* จัดการ input */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  return (
    <>
      {/* ส่วนหัว + ปุ่มเพิ่ม */}
      <div className="adm-section-header">
        <p>{productList.length} รายการ</p>
        <button className="adm-btn-primary" onClick={handleAdd}>
          + {th.admin.products.addProduct}
        </button>
      </div>

      {/* ฟอร์มเพิ่ม/แก้ไข */}
      {showForm && (
        <div className="adm-form-card">
          <h3>
            {editingProduct
              ? th.admin.products.editProduct
              : th.admin.products.addProduct}
          </h3>
          <form onSubmit={handleSave} className="adm-form">
            <div className="adm-form-grid">
              <div className="form-group">
                <label>{th.admin.products.name}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>{th.admin.products.category}</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-select"
                >
                  {categories.slice(1).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>{th.admin.products.price}</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min={0}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>{th.admin.products.originalPrice}</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  min={0}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>{th.admin.products.discount}</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  min={0}
                  max={100}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>{th.admin.products.image}</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="adm-form-actions">
              <button type="submit" className="adm-btn-primary">
                {th.admin.products.save}
              </button>
              <button
                type="button"
                className="adm-btn-secondary"
                onClick={() => setShowForm(false)}
              >
                {th.admin.products.cancel}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ตารางสินค้า */}
      <ProductTable
        products={productList}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
}
