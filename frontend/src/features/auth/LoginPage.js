import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Nhớ import Link
import "./LoginPage.css"; // Import CSS

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // 👉 Cho phép nhập username hoặc email
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const identifierRef = useRef(null);

  useEffect(() => {
    // focus vào ô username/email khi load trang
    if (identifierRef.current) {
      identifierRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        username: form.identifier.includes("@") ? undefined : form.identifier,
        email: form.identifier.includes("@") ? form.identifier : undefined,
        password: form.password,
      };

      const res = await axios.post("http://localhost:5000/api/auth/login", payload, {
        headers: { "Content-Type": "application/json" },
      });

      // 👉 Lưu token và user vào localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 👉 Cập nhật user vào context
      login(res.data.user);

      // 👉 Điều hướng theo role
      if (res.data.user.role === "admin") {
        navigate("/admin/products");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        setError(err.response.data?.message || "Sai tài khoản hoặc mật khẩu");
      } else {
        setError("Không thể kết nối đến server. Vui lòng thử lại sau.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Tiêu đề với hiệu ứng Gradient */}
        <h2 className="login-title">
          Chào mừng <span>TTBS</span>
        </h2>

        {/* Thông báo lỗi */}
        {error && (
          <div className="error-msg">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Ô nhập User/Email */}
          <div className="form-group">
            <input
              type="text"
              name="identifier"
              placeholder="Tên đăng nhập hoặc Email"
              value={form.identifier}
              onChange={handleChange}
              required
              className="custom-input"
              ref={identifierRef}
            />
          </div>

          {/* Ô nhập Password + Nút hiện/ẩn */}
          <div className="form-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mật khẩu"
              value={form.password}
              onChange={handleChange}
              required
              className="custom-input"
            />
            <button
              type="button"
              className="btn-show-pass"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Ẩn" : "Hiện"}
            </button>
          </div>

          {/* Nút Submit */}
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? (
              <span>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Đang đăng nhập...
              </span>
            ) : (
              "Đăng nhập ngay"
            )}
          </button>
        </form>

        {/* Links phụ */}
        <div className="auth-links">
          <p>Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p>
          <Link to="/" style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}