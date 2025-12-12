import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { WishlistContext } from "../context/WishlistContext";
import "./ProductDetail.css";

// 1. Thêm bản đồ danh mục (giống HomePage) để đổi số ID thành Tên
const CATEGORY_MAP = {
  1: "Điện tử",
  2: "Điện lạnh",
  3: "Gia dụng",
  4: "Điện thoại",
  5: "Kỹ thuật số",
  6: "Sức khỏe",
  7: "Phụ kiện"
};

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  // User ID mặc định là 1 (Cần đảm bảo bạn đã chạy lệnh SQL tạo user số 1)
  const userId = 1;

  useEffect(() => {
    window.scrollTo(0, 0);

    // Load chi tiết sản phẩm
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải sản phẩm:", err);
        setError("Không tìm thấy sản phẩm.");
        setLoading(false);
      });

    // Load đánh giá
    axios
      .get(`http://localhost:5000/api/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Lỗi review (có thể chưa có review):", err));
  }, [id]);

  const addToCart = async () => {
    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        user_id: userId,
        product_id: product.id,
        quantity: 1,
      });
      alert(`✅ Đã thêm "${product.name}" vào giỏ hàng!`);
    } catch (err) {
      console.error("Lỗi thêm giỏ:", err);
      if (err.response && err.response.status === 500) {
        alert("Lỗi Server (500): Hãy kiểm tra xem User ID 1 đã có trong Database chưa?");
      } else {
        alert("Không thể thêm vào giỏ hàng. Vui lòng thử lại.");
      }
    }
  };

  const isFavorite = wishlist.some(
    (item) => item.id === product?.id || item.product_id === product?.id
  );

  const toggleWishlist = () => {
    if (isFavorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5" style={{ minHeight: "80vh" }}>
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3 text-muted">Đang tải chi tiết sản phẩm...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-danger">{error || "Sản phẩm không tồn tại."}</div>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="product-detail-page">
        <div className="container">
          <div className="product-main-card">
            <div className="row g-5">
              <div className="col-md-6">
                <div className="product-img-wrapper">
                  {/* 2. SỬA LỖI ẢNH: Thêm dấu / vào trước image_url */}
                  <img
                    src={`/${product.image_url}`}
                    alt={product.name}
                    className="product-detail-img"
                    onError={(e) => { e.target.src = "https://placehold.co/600x600?text=No+Image" }}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <h1 className="product-title">{product.name}</h1>
                <div className="product-price-tag">
                  {Number(product.price).toLocaleString()} đ
                </div>

                <ul className="specs-list">
                  <li>
                    <strong>Thương hiệu:</strong> {product.brand || "Đang cập nhật"}
                  </li>
                  <li>
                    {/* 3. SỬA LỖI DANH MỤC: Dùng Map để hiển thị tên */}
                    <strong>Danh mục:</strong> {CATEGORY_MAP[product.category_id] || "Khác"}
                  </li>
                  <li>
                    <strong>Tình trạng:</strong> {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
                  </li>
                  {product.color && (
                    <li>
                      <strong>Màu sắc:</strong> {product.color}
                    </li>
                  )}
                  {product.size && (
                    <li>
                      <strong>Kích thước:</strong> {product.size}
                    </li>
                  )}
                  {product.specs && (
                    <li>
                      <strong>Cấu hình:</strong> {product.specs}
                    </li>
                  )}
                </ul>

                <p className="text-muted mb-4">
                  {product.description || "Mô tả đang được cập nhật..."}
                </p>

                <div className="action-buttons">
                  <button className="btn-add-cart" onClick={addToCart}>
                    🛒 Thêm vào giỏ
                  </button>
                  <button
                    className={`btn-toggle-wish ${isFavorite ? "active" : ""}`}
                    onClick={toggleWishlist}
                  >
                    {isFavorite ? "❤️ Đã thích" : "🤍 Yêu thích"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="reviews-container">
            <h3 className="section-heading">Đánh giá từ khách hàng ({reviews.length})</h3>
            
            {reviews.length === 0 ? (
              <div className="text-muted fst-italic">Chưa có đánh giá nào cho sản phẩm này.</div>
            ) : (
              <div className="row">
                {reviews.map((r) => (
                  <div key={r.id} className="col-md-6">
                    <div className="review-card">
                      <div className="review-header">
                        <img
                          src={r.avatar || "https://placehold.co/40"} 
                          alt={r.full_name}
                          className="review-avatar"
                        />
                        <span className="review-author">{r.full_name || "Người dùng ẩn danh"}</span>
                        <span className="review-rating">⭐ {r.rating} / 5</span>
                      </div>
                      <div className="review-content">
                        "{r.comment}"
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}