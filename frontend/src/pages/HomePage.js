import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
        setCategories(["Tất cả", ...new Set(res.data.map((p) => p.category))]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Không thể tải sản phẩm:", err);
        setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reviews").then((res) => {
      const grouped = {};
      res.data.forEach((r) => {
        if (!grouped[r.product_id]) grouped[r.product_id] = [];
        grouped[r.product_id].push(r.rating);
      });
      const avg = {};
      for (let pid in grouped) {
        const arr = grouped[pid];
        avg[pid] = (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
      }
      setRatings(avg);
    });
  }, []);

  const handleSearch = (keyword) => {
    if (!keyword) return setFiltered(products);
    const result = products.filter((p) =>
      p.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFiltered(result);
    setPage(1);
  };

  const handleFilter = (cat) => {
    if (cat === "Tất cả") setFiltered(products);
    else setFiltered(products.filter((p) => p.category === cat));
    setPage(1);
  };

  const featured = [...products].sort((a, b) => b.price - a.price).slice(0, 4);
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <Header onSearch={handleSearch} onFilter={handleFilter} />

      <div className="container mt-4">
        <div className="card border-0 shadow-sm">
          <img
            src="https://cdn.tgdd.vn/2024/10/banner/gearvn-sale-1920x600.jpg"
            alt="Banner"
            className="card-img-top rounded"
          />
        </div>
      </div>

      <div className="container my-4">
        <div className="d-flex justify-content-center flex-wrap gap-2">
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

      <div className="container my-5">
        <h4 className="mb-4">🔥 Sản phẩm nổi bật</h4>
        <div className="row g-4">
          {featured.map((p) => (
            <div key={p._id} className="col-12 col-sm-6 col-md-3">
              <div className="card h-100 border-warning shadow-sm">
                <img
                  src={p.image}
                  alt={p.name}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body d-flex flex-column">
                  <h6 className="fw-bold">{p.name}</h6>
                  <p className="text-danger fw-semibold mb-2">
                    {p.price.toLocaleString()} đ
                  </p>
                  {ratings[p.id] && (
                    <small className="text-muted">⭐ {ratings[p.id]} / 5</small>
                  )}
                  <Link
                    to={`/product/${p._id}`}
                    className="btn btn-outline-warning mt-auto"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container my-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-3">Đang tải sản phẩm...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : paginated.length === 0 ? (
          <div className="alert alert-warning text-center">
            Không tìm thấy sản phẩm nào phù hợp.
          </div>
        ) : (
          <>
            <div className="row g-4">
              {paginated.map((p) => (
                <div key={p._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="card-img-top"
                      style={{ objectFit: "cover", height: "200px" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h6 className="fw-bold">{p.name}</h6>
                      <p className="text-primary fw-semibold mb-2">
                        {p.price.toLocaleString()} đ
                      </p>
                      {ratings[p.id] && (
                        <small className="text-muted">
                          ⭐ {ratings[p.id]} / 5
                        </small>
                      )}
                      <Link
                        to={`/product/${p._id}`}
                        className="btn btn-outline-primary mt-auto"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-center mt-4">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`btn mx-1 ${
                    page === i + 1 ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}
