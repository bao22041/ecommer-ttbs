// src/components/common/Header.js
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="logo">TTBS</div>

      <nav className="nav">
        <ul>
          <li><Link to="/">Trang chủ</Link></li>
          <li><Link to="/about">Giới thiệu</Link></li>
          <li><Link to="/news">Tin tức</Link></li>
          <li><Link to="/contact">Liên hệ</Link></li>
          <li><Link to="/cart">Giỏ hàng</Link></li>
          <li><Link to="/wishlist">Yêu thích</Link></li>

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
            {user ? (
              <>
                <span>{user.username}</span>
                <ul className="dropdown-menu">
                  <li>
                    <button className="dropdown-item" onClick={onLogout}>
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <span>Tài khoản</span>
                <ul className="dropdown-menu">
                  <li><Link to="/login">Đăng nhập</Link></li>
                  <li><Link to="/register">Đăng ký</Link></li>
                </ul>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
