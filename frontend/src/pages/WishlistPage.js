// src/pages/WishlistPage.js
import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className="container my-5">
      <h3>❤️ Danh sách yêu thích</h3>
      {wishlist.length === 0 ? (
        <p>Bạn chưa có sản phẩm yêu thích nào.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Giá</th>
              <th>Hành động</th>
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
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                    )}
                    {item.name}
                  </div>
                </td>
                <td>{Number(item.price).toLocaleString()} đ</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeFromWishlist(item.id || item.product_id)}
                  >
                    ❌ Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
