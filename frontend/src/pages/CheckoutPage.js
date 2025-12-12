// src/pages/CheckoutPage.js
import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Nhận dữ liệu từ CartPage (tổng tiền, giảm giá, voucher, giỏ hàng)
  const { total, discountTotal, voucherInfo, cartItems } = location.state || {};

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleConfirm = async () => {
    if (!name || !phone || !address) {
      alert("Vui lòng nhập đầy đủ thông tin nhận hàng!");
      return;
    }

    // Chuẩn bị dữ liệu gửi lên backend
    const items = cartItems?.map((i) => ({
      product_id: i.product_id || i.id, // tuỳ theo DB
      quantity: i.quantity,
      price: i.price,
    })) || [];

    // Nếu giỏ hàng trống thì báo lỗi trước
    if (items.length === 0) {
      alert("Giỏ hàng trống hoặc không hợp lệ.");
      return;
    }

    const payload = {
      user_id: 1, // 👈 đúng tên trường backend
      name,
      phone,
      address,
      total: discountTotal ?? total,
      voucher_id: voucherInfo?.voucher_id || null,
      items,
    };

    console.log("📦 Payload gửi lên:", payload);

    try {
      // Gửi dữ liệu đơn hàng lên backend
      await axios.post("http://localhost:5000/api/orders", payload);

      // Xóa giỏ hàng sau khi thanh toán
      await axios.delete(`http://localhost:5000/api/cart/clear/1`);

      alert("Thanh toán thành công! Giỏ hàng đã được xóa.");
      navigate("/"); // quay về trang chủ
    } catch (err) {
      console.error("❌ Lỗi thanh toán:", err.response?.data || err.message);
      alert("Không thể hoàn tất thanh toán");
    }
  };

  return (
    <div className="container my-5">
      <h3>📦 Thanh toán</h3>

      {/* Form nhập thông tin nhận hàng */}
      <div className="mb-3">
        <label className="form-label">Họ và tên</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Số điện thoại</label>
        <input
          type="text"
          className="form-control"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Địa chỉ nhận hàng</label>
        <textarea
          className="form-control"
          rows="3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
      </div>

      {/* Hiển thị thông tin thanh toán */}
      <h5 className="mt-4">💰 Thông tin thanh toán</h5>
      <p>Tổng trước giảm: {voucherInfo?.originalTotal?.toLocaleString()} đ</p>
      {voucherInfo && (
        <>
          <p>Giảm giá: {voucherInfo.discount}%</p>
          <p>Tiết kiệm: {voucherInfo.discountAmount?.toLocaleString()} đ</p>
        </>
      )}
      <h4>
        Số tiền phải trả:{" "}
        <span className="text-danger">
          {(discountTotal ?? total)?.toLocaleString()} đ
        </span>
      </h4>

      {/* Nút xác nhận thanh toán */}
      <button className="btn btn-success mt-3" onClick={handleConfirm}>
        ✅ Xác nhận thanh toán
      </button>
    </div>
  );
}
