import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { WishlistContext } from "../context/WishlistContext";
import "./CategoryPage.css";

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  const { addToWishlist } = useContext(WishlistContext);
  const userId = 1;

  const categoryNames = {
    dientu: "Điện tử",
    dienlanh: "Điện lạnh",
    giadung: "Gia dụng & Văn phòng",
    dienthoai: "Điện thoại & Smart device",
    kythuatso: "Kỹ thuật số & Giải trí",
    suckhoe: "Sức khỏe & Cá nhân",
    phukien: "Phụ kiện điện máy",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/products/category/${slug}`
        );
        setProducts(res.data || []);
      } catch (err) {
        console.error("❌ Lỗi tải sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug]);

  const addToCart = async (productId) => {
    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        user_id: userId,
        product_id: productId,
        quantity: 1,
      });
      alert("✅ Đã thêm sản phẩm vào giỏ hàng!");
    } catch (err) {
      console.error("❌ Lỗi thêm vào giỏ:", err);
      alert("Không thể thêm sản phẩm vào giỏ hàng.");
    }
  };

  // Logic sắp xếp
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "priceAsc") return a.price - b.price;
    if (sortBy === "priceDesc") return b.price - a.price;
    if (sortBy === "sold") return b.sold - a.sold;
    return new Date(b.created_at) - new Date(a.created_at);
  });

  return (
    <div className="category-page">
      <div className="container pt-5">
        {/* Danh mục & Sắp xếp */}
        <div className="category-header">
          <h3 className="category-title">
            📂 {categoryNames[slug] || slug}
          </h3>

          <div className="sort-box">
            <span className="sort-label">Sắp xếp theo:</span>
            <select
              className="tech-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">✨ Mới nhất</option>
              <option value="priceAsc">📈 Giá tăng dần</option>
              <option value="priceDesc">📉 Giá giảm dần</option>
              <option value="sold">🔥 Bán chạy</option>
            </select>
          </div>
        </div>

        {/* Nội dung chính */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-3 text-muted">Đang tải dữ liệu...</p>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="empty-category">
            <h4>📭 Chưa có sản phẩm nào</h4>
            <p className="text-muted">Vui lòng quay lại sau nhé!</p>
          </div>
        ) : (
          <div className="product-grid">
            {sortedProducts.map((p) => (
              <div className="tech-product-card" key={p.id}>
                <div className="card-img-wrapper">
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="card-product-img"
                    />
                  ) : (
                    <div className="text-muted">No Image</div>
                  )}
                </div>
                
                <div className="card-content">
                  <h6 className="product-name" title={p.name}>{p.name}</h6>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="product-price">
                      {Number(p.price).toLocaleString()} đ
                    </span>
                  </div>

                  {p.rating ? (
                    <div className="product-rating">⭐ {p.rating} / 5</div>
                  ) : (
                    <div className="product-rating text-muted" style={{fontSize: '0.8rem'}}>Chưa có đánh giá</div>
                  )}

                  <div className="card-actions">
                    <button
                      className="btn-tech-cart"
                      onClick={() => addToCart(p.id)}
                    >
                      🛒 Thêm vào giỏ
                    </button>
                    <button
                      className="btn-tech-wish"
                      onClick={() => addToWishlist(p)}
                    >
                      ❤️ Yêu thích
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}