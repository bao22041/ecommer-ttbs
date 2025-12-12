import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { WishlistContext } from "../context/WishlistContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const userId = 1; // giả định userId, sau này lấy từ AuthContext

  useEffect(() => {
    // Lấy thông tin sản phẩm
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi tải sản phẩm:", err);
        setError("Không tìm thấy sản phẩm.");
        setLoading(false);
      });

    // Lấy review của sản phẩm
    axios
      .get(`http://localhost:5000/api/reviews/${id}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi tải đánh giá:", err);
      });
  }, [id]);

  // 👉 Hàm thêm sản phẩm vào giỏ
  const addToCart = async () => {
    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        user_id: userId,
        product_id: product.id,
        quantity: 1,
      });
      alert("✅ Đã thêm sản phẩm vào giỏ hàng!");
    } catch (err) {
      console.error("❌ Lỗi thêm vào giỏ:", err);
      alert("Không thể thêm sản phẩm vào giỏ hàng.");
    }
  };

  // 👉 Kiểm tra sản phẩm đã có trong wishlist chưa
  const isFavorite = wishlist.some(
    (item) => item.id === product?.id || item.product_id === product?.id
  );

  // 👉 Toggle wishlist
  const toggleWishlist = () => {
    if (isFavorite) {
      removeFromWishlist(product.id);
      alert("❌ Đã bỏ sản phẩm khỏi danh sách yêu thích!");
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
      });
      alert("❤️ Đã thêm sản phẩm vào danh sách yêu thích!");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" />
        <p className="mt-3">Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="alert alert-danger text-center my-5">
        {error || "Sản phẩm không tồn tại."}
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="container my-5">
        <div className="row g-4">
          <div className="col-md-5">
            <img
              src={product.image_url}
              alt={product.name}
              className="img-fluid rounded shadow-sm"
            />
          </div>
          <div className="col-md-7">
            <h3>{product.name}</h3>
            <p className="text-danger fs-5 fw-semibold">
              {product.price.toLocaleString()} đ
            </p>
            <p><strong>Danh mục:</strong> {product.category}</p>
            <p><strong>Màu sắc:</strong> {product.color}</p>
            <p><strong>Kích thước:</strong> {product.size}</p>
            <p><strong>Tồn kho:</strong> {product.stock}</p>
            <p><strong>Mô tả:</strong> {product.description}</p>
            <p><strong>Thông số kỹ thuật:</strong> {product.specs}</p>

            {/* Nút thêm giỏ và yêu thích */}
            <div className="mt-3 d-flex gap-2">
              <button className="btn btn-primary" onClick={addToCart}>
                🛒 Thêm vào giỏ
              </button>
              <button
                className={`btn ${isFavorite ? "btn-danger" : "btn-outline-danger"}`}
                onClick={toggleWishlist}
              >
                {isFavorite ? "❌ Bỏ yêu thích" : "❤️ Yêu thích"}
              </button>
            </div>
          </div>
        </div>

        {/* Đánh giá */}
        <div className="mt-5">
          <h4>Đánh giá sản phẩm</h4>
          {reviews.length === 0 ? (
            <p>Chưa có đánh giá nào.</p>
          ) : (
            <div className="list-group">
              {reviews.map((r) => (
                <div key={r.id} className="list-group-item">
                  <div className="d-flex align-items-center mb-2">
                    <img
                      src={r.avatar}
                      alt={r.full_name}
                      className="rounded-circle me-2"
                      style={{ width: "40px", height: "40px", objectFit: "cover" }}
                    />
                    <strong>{r.full_name}</strong>
                  </div>
                  <p className="mb-1">⭐ {r.rating} / 5</p>
                  <p className="text-muted">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
