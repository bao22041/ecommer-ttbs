// src/features/auth/RegisterPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    full_name: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/auth/register", form);
    setSuccess(res.data.message || "Đăng ký thành công! Hãy đăng nhập.");
    setError("");
    setTimeout(() => navigate("/login"), 1500);
  } catch (err) {
    setError(err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Đăng ký</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Tên đăng nhập"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="full_name"
          placeholder="Họ và tên"
          value={form.full_name}
          onChange={handleChange}
        />
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
}
