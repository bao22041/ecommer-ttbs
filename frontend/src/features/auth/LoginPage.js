import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      // gửi payload: nếu người dùng nhập email thì backend vẫn nhận được
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
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2 className="mb-3">🔑 Đăng nhập</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="identifier"
          placeholder="Tên đăng nhập hoặc Email"
          value={form.identifier}
          onChange={handleChange}
          required
          className="form-control mb-2"
          ref={identifierRef}
        />

        <div className="input-group mb-2">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            required
            className="form-control"
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈 Ẩn" : "👁️ Hiện"}
          </button>
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? (
            <span>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Đang đăng nhập...
            </span>
          ) : (
            "Đăng nhập"
          )}
        </button>
      </form>
    </div>
  );
}
