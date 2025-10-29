import React, { useState } from "react";
import axios from "axios";

function App() {
  const [code, setCode] = useState("");
  const [cartTotal, setCartTotal] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const applyVoucher = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const response = await axios.post("http://localhost:5000/api/voucher/apply", {
        code,
        cartTotal: Number(cartTotal)
      });
      setResult(response.data);
    } catch (err) {
      console.error("Lỗi gọi API:", err);
      setError("Không gọi được API hoặc mã không hợp lệ");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Test Voucher API</h1>
      <form onSubmit={applyVoucher} style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Mã voucher: </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Nhập mã, ví dụ SALE20"
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Tổng giỏ hàng: </label>
          <input
            type="number"
            value={cartTotal}
            onChange={(e) => setCartTotal(e.target.value)}
            placeholder="Nhập số tiền, ví dụ 100000"
          />
        </div>
        <button type="submit">Áp dụng</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && result.valid && (
        <div style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "15px",
          maxWidth: "300px",
          background: "#f9f9f9"
        }}>
          <h3>Kết quả áp dụng</h3>
          <p><strong>Mã:</strong> {result.code}</p>
          <p><strong>Tổng trước giảm:</strong> {result.totalBeforeDiscount?.toLocaleString()} đ</p>
          <p><strong>Giảm giá:</strong> {result.discountAmount?.toLocaleString()} đ</p>
          <p><strong>Tổng sau giảm:</strong> {result.totalAfterDiscount?.toLocaleString()} đ</p>
        </div>
      )}

      {result && result.valid === false && (
        <p style={{ color: "red" }}>{result.message}</p>
      )}
    </div>
  );
}

export default App;
