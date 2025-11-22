// src/features/auth/RegisterPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      setSuccess("🎉 Đăng ký thành công! Đang chuyển hướng...");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setError("Email hoặc username đã tồn tại!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 to-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-600">
          Đăng ký tài khoản
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input icon={<FiUser />} name="full_name" placeholder="Họ và tên" value={form.full_name} onChange={handleChange} />
          <Input icon={<FiUser />} name="username" placeholder="Tên đăng nhập" value={form.username} onChange={handleChange} required />
          <Input icon={<FiMail />} name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <Input icon={<FiLock />} name="password" type="password" placeholder="Mật khẩu" value={form.password} onChange={handleChange} required />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-purple-500 font-medium">
            Đăng nhập
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

// Custom Input Field
const Input = ({ icon, ...props }) => (
  <div className="relative">
    <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
    <input {...props} className="w-full pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400" />
  </div>
);
