import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
            <button className="btn btn-primary mt-3">🛒 Thêm vào giỏ</button>
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
