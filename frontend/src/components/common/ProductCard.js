import React from "react";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image_url} alt={product.name} />
        <div className="overlay">
          <button className="btn-cart">🛒 Thêm vào giỏ</button>
          <button className="btn-fav">❤️</button>
        </div>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">{Number(product.price).toLocaleString()} ₫</p>
      </div>
    </div>
  );
}