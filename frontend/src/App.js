// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ProductsPage from "./features/products/ProductsPage";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import AdminProductManagement from "./features/admin/AdminProductManagement";
import ProtectedRoute from "./components/common/ProtectedRoute";

// 👉 import giao diện test voucher
import VoucherTest from "./features/vouchers/VoucherForm";

function App() {
  return (
    <Router>
      <Header />
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
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

          {/* Test voucher */}
          <Route path="/voucher-test" element={<VoucherTest />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
