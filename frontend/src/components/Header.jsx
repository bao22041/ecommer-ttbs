import { Link } from "react-router-dom";
import { useState } from "react";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";

export default function Header({ onSearch, onFilter }) {
const [keyword, setKeyword] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
};

return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
    <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
        TechZone
        </Link>

        <form className="d-flex flex-grow-1 mx-3" onSubmit={handleSubmit}>
        <input
            className="form-control me-2"
            type="search"
            placeholder="Tìm sản phẩm..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="btn btn-outline-primary" type="submit">
            Tìm kiếm
        </button>
        </form>

        <div className="d-flex align-items-center">
        <Link to="/favorites" className="btn btn-light me-2">
            <FaHeart className="text-danger" />
            Yêu thích
        </Link>
        <Link to="/cart" className="btn btn-light me-2">
            <FaShoppingCart className="text-primary" />
            Giỏ hàng
        </Link>
        <Link to="/account" className="btn btn-light">
            <FaUser className="text-secondary" />
            Tài khoản
        </Link>
        </div>
    </div>
    </nav>
);
}
