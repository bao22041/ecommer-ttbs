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

// Common
import ProtectedRoute from "./components/common/ProtectedRoute";
import WishlistPage from "./pages/WishlistPage";

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
            <Route path="/wishlist" element={<WishlistPage />} />
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
          </Routes>
        </main>
      </Router>
    </WishlistProvider>
  );
}

export default App;
