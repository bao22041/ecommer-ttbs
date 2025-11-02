// src/components/common/Header.js
import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">TTBS</div>

      <nav className="nav">
        <ul>
          <li><span>Trang chủ</span></li>
          <li><span>Giới thiệu</span></li>
          <li><span>Tin tức</span></li>
          <li><span>Liên hệ</span></li>
          <li><span>Giỏ hàng</span></li>
          <li><span>Yêu thích</span></li> {/* 👉 thêm mục này */}

          {/* Sản phẩm */}
          <li className="dropdown">
            <span>Sản phẩm</span>
            <ul className="dropdown-menu">
              <li>Điện tử</li>
              <li>Điện lạnh</li>
              <li>Gia dụng, máy tính & thiết bị văn phòng</li>
              <li>Điện thoại & thiết bị thông minh</li>
              <li>Kỹ thuật số & giải trí</li>
              <li>Sức khỏe & cá nhân</li>
              <li>Phụ kiện điện máy</li>
            </ul>
          </li>

          {/* Danh mục */}
          <li className="dropdown">
            <span>Danh mục</span>
            <ul className="dropdown-menu">
              <li>Điện tử</li>
              <li>Điện lạnh</li>
              <li>Gia dụng, máy tính & thiết bị văn phòng</li>
              <li>Điện thoại & thiết bị thông minh</li>
              <li>Kỹ thuật số & giải trí</li>
              <li>Sức khỏe & cá nhân</li>
              <li>Phụ kiện điện máy</li>
            </ul>
          </li>

          {/* Tài khoản */}
          <li className="dropdown">
            <span>Tài khoản</span>
            <ul className="dropdown-menu">
              <li>Đăng nhập</li>
              <li>Đăng ký</li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
