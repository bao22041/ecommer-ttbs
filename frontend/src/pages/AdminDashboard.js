import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Admin Dashboard</h2>
      <ul>
        <li><Link to="/admin/products">Quản lý sản phẩm</Link></li>
        <li><Link to="/admin/categories">Quản lý danh mục</Link></li>
        <li><Link to="/admin/orders">Quản lý đơn hàng</Link></li>
        <li><Link to="/admin/users">Quản lý người dùng</Link></li>
        <li><Link to="/admin/vouchers">Quản lý voucher</Link></li>
      </ul>
    </div>
  );
}
