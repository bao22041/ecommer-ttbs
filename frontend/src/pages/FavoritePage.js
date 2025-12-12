import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import "./Favorite.css";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  return (
    <div className="container my-5 wishlist-container">
      <h3 className="wishlist-title">❤️ Danh sách yêu thích</h3>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist-box">
          <span className="empty-icon">💔</span>
          <h4 className="text-muted mb-3">Danh sách yêu thích đang trống</h4>
          <p className="text-muted">Hãy thêm những món đồ công nghệ bạn thích vào đây nhé!</p>
          <button className="btn-home" onClick={() => navigate("/")}>
            ← Quay lại mua sắm
          </button>
        </div>
      ) : (
        <div className="wishlist-card">
          <div className="table-responsive">
            <table className="tech-table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th className="text-end">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((item) => (
                  <tr key={item.id || item.product_id || item.name}>
                    <td>
                      <div className="d-flex align-items-center">
                        {item.image_url && (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="wishlist-item-img"
                          />
                        )}
                        <span className="wishlist-item-name">{item.name}</span>
                      </div>
                    </td>
                    <td className="wishlist-price">
                      {Number(item.price).toLocaleString()} đ
                    </td>
                    <td className="text-end">
                      <button
                        className="btn-remove-wish"
                        onClick={() => removeFromWishlist(item.id || item.product_id)}
                      >
                        ❌ Bỏ thích
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}