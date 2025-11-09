// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductsPage from "./features/products/ProductsPage";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import AdminProductManagement from "./features/admin/AdminProductManagement";
import ProtectedRoute from "./components/common/ProtectedRoute";

import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import FavoritePage from "./pages/FavoritePage";
import CartPage from "./pages/CartPage";
import VoucherPage from "./pages/VoucherPage";
import AccountPage from "./pages/AccountPage";

function App() {
  return (
    <Router>
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Routes>
          {/* Trang chính */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/voucher" element={<VoucherPage />} />
          <Route path="/account" element={<AccountPage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin */}
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute role="admin">
                <AdminProductManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
