// src/components/common/Header.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

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
          <li><Link to="/favorites">Yêu thích</Link></li>

          {/* Sản phẩm */}
          <li className="dropdown">
            <span>Danh mục</span>
            <ul className="dropdown-menu">
              <li><Link to="/category/dientu">Điện tử</Link></li>
              <li><Link to="/category/dienlanh">Điện lạnh</Link></li>
              <li><Link to="/category/giadung">Gia dụng, máy tính & thiết bị văn phòng</Link></li>
              <li><Link to="/category/dienthoai">Điện thoại & thiết bị thông minh</Link></li>
              <li><Link to="/category/kythuatso">Kỹ thuật số & giải trí</Link></li>
              <li><Link to="/category/suckhoe">Sức khỏe & cá nhân</Link></li>
              <li><Link to="/category/phukien">Phụ kiện điện máy</Link></li>
            </ul>
          </li>

          {/* Danh mục */}
          <li className="dropdown">
            <span>Danh mục</span>
            <ul className="dropdown-menu">
              <li><Link to="/category/dientu">Điện tử</Link></li>
              <li><Link to="/category/dienlanh">Điện lạnh</Link></li>
              <li><Link to="/category/giadung">Gia dụng, máy tính & thiết bị văn phòng</Link></li>
              <li><Link to="/category/dienthoai">Điện thoại & thiết bị thông minh</Link></li>
              <li><Link to="/category/kythuatso">Kỹ thuật số & giải trí</Link></li>
              <li><Link to="/category/suckhoe">Sức khỏe & cá nhân</Link></li>
              <li><Link to="/category/phukien">Phụ kiện điện máy</Link></li>
            </ul>
          </li>

          {/* Tài khoản */}
          <li className="dropdown">
            {user ? (
              <>
                <span>👤 {user.username}</span>
                <ul className="dropdown-menu">
                  <li>
                    <button className="dropdown-item" onClick={logout}>
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
