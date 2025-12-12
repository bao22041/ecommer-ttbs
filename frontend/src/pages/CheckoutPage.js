import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Nhận dữ liệu từ CartPage
  const { total, discountTotal, voucherInfo, cartItems } = location.state || {};

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleConfirm = async () => {
    if (!name || !phone || !address) {
      alert("Vui lòng nhập đầy đủ thông tin nhận hàng!");
      return;
    }

    const items = cartItems?.map((i) => ({
      product_id: i.product_id || i.id,
      quantity: i.quantity,
      price: i.price,
    })) || [];

    if (items.length === 0) {
      alert("Giỏ hàng trống hoặc không hợp lệ.");
      return;
    }

    const payload = {
      user_id: 1, // Thay bằng user.id thực tế từ context
      name,
      phone,
      address,
      total: discountTotal ?? total,
      voucher_id: voucherInfo?.voucher_id || null,
      items,
    };

    try {
      await axios.post("http://localhost:5000/api/orders", payload);
      await axios.delete(`http://localhost:5000/api/cart/clear/1`); // Xóa giỏ

      alert("🎉 Đặt hàng thành công! Cảm ơn bạn.");
      navigate("/");
    } catch (err) {
      console.error("❌ Lỗi thanh toán:", err.response?.data || err.message);
      alert("Không thể hoàn tất thanh toán. Vui lòng thử lại.");
    }
  };

  // Nếu truy cập trực tiếp mà không có dữ liệu giỏ hàng
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <div className="checkout-card text-center">
          <h3>🚫 Không có thông tin thanh toán</h3>
          <button className="btn-back-cart mt-3" onClick={() => navigate("/")}>
            Quay về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h2 className="checkout-title">
          Xác nhận <span>Đơn hàng</span>
        </h2>

        {/* Form nhập thông tin */}
        <div className="form-section">
          <label className="form-label">Họ và tên người nhận</label>
          <input
            type="text"
            className="checkout-input"
            placeholder="Nhập họ tên đầy đủ"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-section">
          <label className="form-label">Số điện thoại</label>
          <input
            type="text"
            className="checkout-input"
            placeholder="Nhập số điện thoại liên hệ"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-section">
          <label className="form-label">Địa chỉ giao hàng</label>
          <textarea
            className="checkout-textarea"
            rows="3"
            placeholder="Số nhà, tên đường, phường/xã..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>

        {/* Tóm tắt đơn hàng */}
        <div className="order-summary">
          <div className="summary-header">💰 Thông tin thanh toán</div>
          
          <div className="summary-item">
            <span>Tổng tiền hàng:</span>
            <strong>{voucherInfo ? voucherInfo.originalTotal?.toLocaleString() : total?.toLocaleString()} đ</strong>
          </div>

          {voucherInfo && (
            <div className="summary-item text-success">
              <span>Mã giảm giá ({voucherInfo.discount}%):</span>
              <strong>- {voucherInfo.discountAmount?.toLocaleString()} đ</strong>
            </div>
          )}

          <div className="summary-total">
            <span>Thành tiền:</span>
            <span>{(discountTotal ?? total)?.toLocaleString()} đ</span>
          </div>
        </div>

        {/* Nút xác nhận */}
        <button className="btn-confirm" onClick={handleConfirm}>
          ✅ Xác nhận đặt hàng
        </button>

        <button className="btn-back-cart" onClick={() => navigate("/cart")}>
          ← Quay lại giỏ hàng
        </button>
      </div>
    </div>
  );
}