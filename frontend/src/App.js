<<<<<<< HEAD
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
=======
// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [code, setCode] = useState("");
//   const [cartTotal, setCartTotal] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const applyVoucher = async (e) => {
//     e.preventDefault();
//     setError("");
//     setResult(null);

//     try {
//       const response = await axios.post("http://localhost:5000/api/voucher/apply", {
//         code,
//         cartTotal: Number(cartTotal)
//       });
//       setResult(response.data);
//     } catch (err) {
//       console.error("Lỗi gọi API:", err);
//       setError("Không gọi được API hoặc mã không hợp lệ");
//     }
//   };

//   return (
//     <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
//       <h1>Test Voucher API</h1>
//       <form onSubmit={applyVoucher} style={{ marginBottom: 20 }}>
//         <div style={{ marginBottom: 10 }}>
//           <label>Mã voucher: </label>
//           <input
//             type="text"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             placeholder="Nhập mã, ví dụ SALE20"
//           />
//         </div>
//         <div style={{ marginBottom: 10 }}>
//           <label>Tổng giỏ hàng: </label>
//           <input
//             type="number"
//             value={cartTotal}
//             onChange={(e) => setCartTotal(e.target.value)}
//             placeholder="Nhập số tiền, ví dụ 100000"
//           />
//         </div>
//         <button type="submit">Áp dụng</button>
//       </form>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {result && result.valid && (
//         <div style={{
//           border: "1px solid #ccc",
//           borderRadius: "8px",
//           padding: "15px",
//           maxWidth: "300px",
//           background: "#f9f9f9"
//         }}>
//           <h3>Kết quả áp dụng</h3>
//           <p><strong>Mã:</strong> {result.code}</p>
//           <p><strong>Tổng trước giảm:</strong> {result.totalBeforeDiscount?.toLocaleString()} đ</p>
//           <p><strong>Giảm giá:</strong> {result.discountAmount?.toLocaleString()} đ</p>
//           <p><strong>Tổng sau giảm:</strong> {result.totalAfterDiscount?.toLocaleString()} đ</p>
//         </div>
//       )}

//       {result && result.valid === false && (
//         <p style={{ color: "red" }}>{result.message}</p>
//       )}
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import FavoritePage from "./pages/FavoritePage";
import CartPage from "./pages/CartPage";
import VoucherPage from "./pages/VoucherPage";
import AccountPage from "./pages/AccountPage";
>>>>>>> a3e1e73dbf70c997ee3d23e5d31dcc431091dae5

function App() {
  return (
    <Router>
<<<<<<< HEAD
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
=======
      <main className="container my-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/voucher" element={<VoucherPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </main>
>>>>>>> a3e1e73dbf70c997ee3d23e5d31dcc431091dae5
    </Router>
  );
}

export default App;
