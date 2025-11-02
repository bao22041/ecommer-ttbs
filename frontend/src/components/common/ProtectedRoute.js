// src/components/common/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useContext(AuthContext);

  // Nếu chưa đăng nhập → chuyển về trang login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có yêu cầu role cụ thể (ví dụ: admin) nhưng user không khớp → về trang chủ
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // Nếu hợp lệ → render children
  return children;
}
