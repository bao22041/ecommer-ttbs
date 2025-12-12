// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";

// Public pages
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import FavoritePage from "./pages/FavoritePage";
import CartPage from "./pages/CartPage";
import VoucherPage from "./pages/VoucherPage";
import AccountPage from "./pages/AccountPage";
import CheckoutPage from "./pages/CheckoutPage";
import CategoryPage from "./pages/CategoryPage";   // 👉 thêm import

// Auth
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";

// Product listing
import ProductsPage from "./features/products/ProductsPage";

// Admin pages
import AdminProductManagement from "./features/admin/products/AdminProductManagement";
import AdminOrderManagement from "./features/admin/orders/AdminOrderManagement";
import AdminUserManagement from "./features/admin/users/AdminUserManagement";
import AdminVoucherManagement from "./features/admin/vouchers/AdminVoucherManagement";
import Dashboard from "./features/admin/Dashboard";
import AdminLayout from "./features/admin/AdminLayout";

// Common
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <WishlistProvider>
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
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} /> 
            {/* 👉 thêm route danh mục */}

            {/* Auth */}
            <Route
              path="/login"
              element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
            />
            <Route path="/register" element={<RegisterPage />} />

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute role="admin">
                  <AdminProductManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute role="admin">
                  <AdminOrderManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute role="admin">
                  <AdminUserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/vouchers"
              element={
                <ProtectedRoute role="admin">
                  <AdminVoucherManagement />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </Router>
    </WishlistProvider>
  );
}

export default App;
