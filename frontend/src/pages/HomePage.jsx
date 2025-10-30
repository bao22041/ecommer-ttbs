import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function HomePage() {
const [products, setProducts] = useState([]);
const [filtered, setFiltered] = useState([]);
const [categories, setCategories] = useState([]);

// 🧠 Gọi API lấy sản phẩm
useEffect(() => {
    axios
    .get("http://localhost:5000/api/products")
    .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
        setCategories([...new Set(res.data.map((p) => p.category))]);
    })
    .catch((err) => console.error("Không thể tải sản phẩm:", err));
}, []);

// 🔍 Tìm kiếm
const handleSearch = (keyword) => {
    if (!keyword) return setFiltered(products);
    const result = products.filter((p) =>
    p.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFiltered(result);
};

// 🧩 Lọc theo danh mục
const handleFilter = (cat) => {
    if (cat === "Tất cả") setFiltered(products);
    else setFiltered(products.filter((p) => p.category === cat));
};

return (
    <>
    <Header onSearch={handleSearch} onFilter={handleFilter} />

    {/* Banner */}
    <div className="container mt-4">
        <div className="card border-0 shadow-sm">
        <img
            src="https://cdn.tgdd.vn/2024/10/banner/gearvn-sale-1920x600.jpg"
            alt="Banner"
            className="card-img-top rounded"
        />
        </div>
    </div>

    {/* Bộ lọc danh mục */}
    <div className="container my-4">
        <div className="d-flex justify-content-center flex-wrap gap-2">
        <button className="btn btn-outline-primary" onClick={() => handleFilter("Tất cả")}>
            Tất cả
        </button>
        {categories.map((cat, index) => (
            <button
            key={index}
            className="btn btn-outline-primary"
            onClick={() => handleFilter(cat)}
            >
            {cat}
            </button>
        ))}
        </div>
    </div>

    {/* Danh sách sản phẩm */}
    <div className="container my-4">
        <div className="row g-4">
        {filtered.map((p) => (
            <div key={p._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
                <img src={p.image} alt={p.name} className="card-img-top" />
                <div className="card-body d-flex flex-column">
                <h6 className="fw-bold">{p.name}</h6>
                <p className="text-primary fw-semibold mb-2">
                    {p.price.toLocaleString()} đ
                </p>
                <Link to={`/product/${p._id}`} className="btn btn-outline-primary mt-auto">
                    Xem chi tiết
                </Link>
                </div>
            </div>
            </div>
        ))}
        </div>
    </div>

    {/* <Footer /> */}
    <Footer />
    </>
);
}
