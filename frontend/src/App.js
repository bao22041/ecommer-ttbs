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
import CategoryPage from "./pages/CategoryPage";

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
import AdminCategoryManagement from "./features/admin/categories/AdminCategoryManagement"; // 👉 thêm quản lý danh mục
import Dashboard from "./features/admin/Dashboard";
import AdminLayout from "./features/admin/AdminLayout";

// Common
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <WishlistProvider>
      <Router>
        <main style={{ minHeight: "80vh", padding: "20px" }}>
          <Routes>
            {/* ================== Public routes ================== */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/voucher" element={<VoucherPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />

            {/* ================== Auth routes ================== */}
            <Route
              path="/login"
              element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
            />
            <Route path="/register" element={<RegisterPage />} />

            {/* ================== Admin layout ================== */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin" user={user}>
                  <AdminLayout user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            >
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute role="admin" user={user}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="products"
                element={
                  <ProtectedRoute role="admin" user={user}>
                    <AdminProductManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="orders"
                element={
                  <ProtectedRoute role="admin" user={user}>
                    <AdminOrderManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="users"
                element={
                  <ProtectedRoute role="admin" user={user}>
                    <AdminUserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="vouchers"
                element={
                  <ProtectedRoute role="admin" user={user}>
                    <AdminVoucherManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="categories"
                element={
                  <ProtectedRoute role="admin" user={user}>
                    <AdminCategoryManagement />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </main>
      </Router>
    </WishlistProvider>
  );
}

export default App;
