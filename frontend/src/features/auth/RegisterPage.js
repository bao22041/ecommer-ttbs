import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./RegisterPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    full_name: "",
    phone: "",
    address: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      setSuccess(res.data.message || "Đăng ký thành công! Đang chuyển hướng...");
      setError("");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.");
      setSuccess("");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">
          Đăng ký <span>TTBS</span>
        </h2>

        {/* Thông báo lỗi/thành công */}
        {error && <div className="alert-msg error">⚠️ {error}</div>}
        {success && <div className="alert-msg success">🎉 {success}</div>}

        <form onSubmit={handleSubmit} className="form-grid">
          {/* Hàng 1: Username & Email */}
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Tên đăng nhập *"
              value={form.username}
              onChange={handleChange}
              required
              className="custom-input"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={form.email}
              onChange={handleChange}
              required
              className="custom-input"
            />
          </div>

          {/* Hàng 2: Mật khẩu & Xác nhận */}
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu *"
              value={form.password}
              onChange={handleChange}
              required
              className="custom-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu *"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="custom-input"
            />
          </div>

          {/* Hàng 3: Họ tên & SĐT */}
          <div className="form-group">
            <input
              type="text"
              name="full_name"
              placeholder="Họ và tên"
              value={form.full_name}
              onChange={handleChange}
              className="custom-input"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={form.phone}
              onChange={handleChange}
              className="custom-input"
            />
          </div>

          {/* Hàng 4: Địa chỉ (Full width) */}
          <div className="form-group full-width">
            <input
              type="text"
              name="address"
              placeholder="Địa chỉ giao hàng"
              value={form.address}
              onChange={handleChange}
              className="custom-input"
            />
          </div>

          {/* Nút Submit (Full width) */}
          <div className="full-width">
            <button type="submit" className="btn-register">
              Đăng ký tài khoản
            </button>
          </div>
        </form>

        <div className="auth-footer">
          <p>Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link></p>
          <Link to="/" style={{ fontSize: '0.85rem' }}>← Về trang chủ</Link>
        </div>
      </div>
    </div>
  );
}