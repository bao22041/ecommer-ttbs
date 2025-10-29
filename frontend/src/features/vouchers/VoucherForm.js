import React, { useState } from "react";
import axios from "axios";

function VoucherForm() {
  const [code, setCode] = useState("");
  const [cartTotal, setCartTotal] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/voucher/apply", {
        code,
        cartTotal: Number(cartTotal)
      });
      setResult(response.data);
    } catch (err) {
      console.error("Lỗi gọi API:", err);
      setResult({ error: "Không gọi được API" });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Áp dụng mã giảm giá</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Mã voucher: </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Nhập mã, ví dụ SALE20"
          />
        </div>
        <div>
          <label>Tổng giỏ hàng: </label>
          <input
            type="number"
            value={cartTotal}
            onChange={(e) => setCartTotal(e.target.value)}
            placeholder="Nhập số tiền, ví dụ 1000000"
          />
        </div>
        <button type="submit">Áp dụng</button>
      </form>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Kết quả:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default VoucherForm;
