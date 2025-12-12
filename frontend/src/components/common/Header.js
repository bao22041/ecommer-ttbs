import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { WishlistContext } from "../../context/WishlistContext";
import "./Header.css"; // Import file CSS bạn đã cung cấp

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const { wishlist } = useContext(WishlistContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Danh mục sản phẩm (Slug phải khớp với router/backend)
  const categories = [
    { slug: "dientu", name: "Điện tử" },
    { slug: "dienlanh", name: "Điện lạnh" },
    { slug: "giadung", name: "Gia dụng & Văn phòng" },
    { slug: "dienthoai", name: "Điện thoại & Smart device" },
    { slug: "kythuatso", name: "Kỹ thuật số & Giải trí" },
    { slug: "suckhoe", name: "Sức khỏe & Cá nhân" },
    { slug: "phukien", name: "Phụ kiện điện máy" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?name=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="header">
      {/* 1. Logo */}
      <div className="logo" onClick={() => navigate("/")}>
        TTBS
      </div>

      {/* 2. Search Bar (Khớp với CSS .search-bar input & button) */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Bạn cần tìm gì hôm nay?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      {/* 3. Navigation */}
      <nav className="nav">
        <ul>
          <li><Link to="/">Trang chủ</Link></li>
          
          {/* Dropdown Danh mục */}
          <li className="dropdown">
            {/* Thẻ span này quan trọng để CSS tạo mũi tên (::after) */}
            <span>Danh mục</span>
            <div className="dropdown-menu">
              {categories.map((cat) => (
                <Link key={cat.slug} to={`/category/${cat.slug}`}>
                  {cat.name}
                </Link>
              ))}
            </div>
          </li>

          <li><Link to="/news">Tin tức</Link></li>
          
          <li>
            <Link to="/wishlist">
              Yêu thích ❤️ {wishlist.length > 0 && `(${wishlist.length})`}
            </Link>
          </li>
          
          <li><Link to="/cart">Giỏ hàng 🛒</Link></li>

          {/* Dropdown Tài khoản */}
          <li className="dropdown">
            <span>
              {user ? `👤 ${user.username}` : "👤 Tài khoản"}
            </span>
            <div className="dropdown-menu">
              {user ? (
                <>
                  <Link to="/profile">Thông tin cá nhân</Link>
                  <Link to="/orders">Đơn mua</Link>
                  {user.role === 'admin' && <Link to="/admin">Trang quản trị</Link>}
                  <button className="dropdown-item" onClick={logout}>
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">Đăng nhập</Link>
                  <Link to="/register">Đăng ký</Link>
                </>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}