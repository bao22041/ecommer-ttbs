// src/routes/AppRoutes.js
import { Routes, Route } from "react-router-dom";
import HomePage from "../features/products/ProductList";
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import AdminProductManagement from "../features/admin/AdminProductManagement";
import ProtectedRoute from "../components/common/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/admin/products"
        element={
          <ProtectedRoute role="admin">
            <AdminProductManagement />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
