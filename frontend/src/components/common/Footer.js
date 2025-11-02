// src/components/common/Footer.js
import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Thông tin liên hệ */}
        <div className="footer-section">
          <h4>Thông tin liên hệ</h4>
          <p>Số ĐKKD :"Chưa có"</p>
          <p>Địa chỉ: Ông Ích Đường, Cẩm Lệ, Đà Nẵng</p>
          <p>Email: ble200134@gmail.com</p>
          <p>Điện thoại: 0582557300</p>
        </div>

        {/* Về chúng tôi */}
        <div className="footer-section">
          <h4>Về chúng tôi</h4>
          <ul>
            <li>Giới thiệu</li>
            <li>Liên hệ</li>
            <li>Tin tức</li>
            <li>Sản phẩm</li>
          </ul>
        </div>

        {/* Dịch vụ khách hàng */}
        <div className="footer-section">
          <h4>Dịch vụ khách hàng</h4>
          <ul>
            <li>Kiểm tra đơn hàng</li>
            <li>Chính sách vận chuyển</li>
            <li>Chính sách đổi trả</li>
            <li>Bảo mật thông tin</li>
            <li>Điều khoản & tài khoản</li>
          </ul>
        </div>

        {/* Tổng đài miễn phí */}
        <div className="footer-section">
          <h4>Tổng đài miễn phí</h4>
          <p>Tư vấn mua hàng: 0582557300 (Nhánh 1)</p>
          <p>Khiếu nại, bảo hành: 0927445046 (Nhánh 2)</p>
          <p>Góp ý, phản ánh: 0378098192 (Nhánh 3)</p>
        </div>
      </div>

      {/* Mạng xã hội */}
      <div className="footer-bottom">
        <div className="social-icons">
          <a href="https://www.facebook.com/CanhsatcodongPK">Facebook</a>
          <a href="https://www.youtube.com/watch?v=GoOKt1atBFE">YouTube</a>
          <a href="https://zalo.me/">Zalo</a>
        </div>
        <p>© Bản quyền thuộc về TTBS | Cung cấp bởi Lê Bẻo</p>
      </div>
    </footer>
  );
}
