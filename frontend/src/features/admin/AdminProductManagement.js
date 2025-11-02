// src/features/admin/AdminProductManagement.js
import React, { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";

export default function AdminProductManagement() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });

  // Lấy danh sách sản phẩm
  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Thêm hoặc cập nhật sản phẩm
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingProduct) {
      await updateProduct(editingProduct.id, form);
      setEditingProduct(null);
    } else {
      await createProduct(form);
    }
    setForm({ name: "", price: "", stock: "" });
    fetchProducts();
  };

  // Sửa sản phẩm
  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
  };

  // Xóa sản phẩm
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Quản lý sản phẩm</h1>

      {/* Form thêm/sửa */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Giá"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Số lượng"
          value={form.stock}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editingProduct ? "Cập nhật" : "Thêm sản phẩm"}
        </button>
      </form>

      {/* Danh sách sản phẩm */}
      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{Number(p.price).toLocaleString()} ₫</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Sửa</button>
                <button onClick={() => handleDelete(p.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
