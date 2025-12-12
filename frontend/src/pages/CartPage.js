// src/pages/CartPage.js
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Voucher
  const [voucherCode, setVoucherCode] = useState("");
  const [discountTotal, setDiscountTotal] = useState(null);
<<<<<<< HEAD
  const [voucherInfo, setVoucherInfo] = useState(null);
=======

  // Giả định user_id = 1 (sau này có thể lấy từ context hoặc token)
  const userId = 1;
>>>>>>> 5077694c6e04c1c8e8a7caaf266df7b32a995452

  const userId = 1;
  const navigate = useNavigate();

  // Wishlist context
  const { addToWishlist } = useContext(WishlistContext);

  // Hàm tải giỏ hàng
  const getCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/cart/user/${userId}`);
      setCartItems(res.data || []);
      setError("");
    } catch (err) {
      console.error("❌ Lỗi tải giỏ hàng:", err);
      setError("Không thể tải giỏ hàng. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const handleRemove = async (cartItemId) => {
    if (!cartItemId) return;
    try {
      await axios.delete(`http://localhost:5000/api/cart/item/${cartItemId}`);
<<<<<<< HEAD
      getCart();
=======
      getCart(); // tải lại giỏ
>>>>>>> 5077694c6e04c1c8e8a7caaf266df7b32a995452
    } catch (err) {
      console.error("❌ Lỗi xóa sản phẩm:", err);
      alert("Không thể xóa sản phẩm khỏi giỏ hàng.");
    }
  };

  const handleUpdateQty = async (cartItemId, qty) => {
    if (!cartItemId || qty < 1) return;
    try {
      await axios.put(`http://localhost:5000/api/cart/item/${cartItemId}`, {
        quantity: qty,
      });
      getCart();
    } catch (err) {
      console.error("❌ Lỗi cập nhật số lượng:", err);
      alert("Không thể cập nhật số lượng.");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

<<<<<<< HEAD
=======
  // Áp dụng voucher
>>>>>>> 5077694c6e04c1c8e8a7caaf266df7b32a995452
  const applyVoucher = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/vouchers/apply", {
        code: voucherCode,
        cartTotal: total,
      });
<<<<<<< HEAD

      if (res.data.newTotal) {
        setDiscountTotal(res.data.newTotal);
        setVoucherInfo({
          discount: res.data.discount,
          discountAmount: res.data.discountAmount,
          originalTotal: res.data.originalTotal,
        });
=======
      if (res.data.newTotal) {
        setDiscountTotal(res.data.newTotal);
>>>>>>> 5077694c6e04c1c8e8a7caaf266df7b32a995452
        alert(
          `Áp dụng voucher thành công! Giảm còn ${res.data.newTotal.toLocaleString()} đ`
        );
      } else {
        alert(res.data.error || "Voucher không hợp lệ");
      }
    } catch (err) {
      console.error("❌ Lỗi áp voucher:", err);
      alert("Không thể áp dụng voucher");
    }
  };

  return (
    <div className="container my-5">
      <h3>🛒 Giỏ hàng của bạn</h3>

      {loading ? (
        <p>Đang tải giỏ hàng...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : cartItems.length === 0 ? (
        <p>Giỏ hàng đang trống.</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Sản phẩm</th>
                <th style={{ width: "120px" }}>Số lượng</th>
                <th>Giá</th>
                <th>Tổng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.cart_item_id}>
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
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateQty(
                          item.cart_item_id,
                          parseInt(e.target.value)
                        )
                      }
                      className="form-control"
                      style={{ width: "80px" }}
                    />
                  </td>
                  <td>{Number(item.price).toLocaleString()} đ</td>
                  <td>
                    {(Number(item.price) * Number(item.quantity)).toLocaleString()} đ
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemove(item.cart_item_id)}
                    >
                      ❌ Xóa
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() =>
                        addToWishlist({
                          id: item.product_id,
                          product_id: item.product_id,
                          name: item.name,
                          price: item.price,
                          image_url: item.image_url,
                        })
                      }
                    >
                      ❤️ Yêu thích
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Voucher input */}
          <div className="d-flex justify-content-end mt-3">
            <input
              type="text"
              placeholder="Nhập mã voucher"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              className="form-control"
              style={{ width: "200px" }}
            />
            <button className="btn btn-info ms-2" onClick={applyVoucher}>
              Áp dụng
            </button>
          </div>

<<<<<<< HEAD
          {/* Hiển thị tổng cộng và giảm giá */}
=======
>>>>>>> 5077694c6e04c1c8e8a7caaf266df7b32a995452
          <h5 className="text-end mt-3">
            Tổng cộng:{" "}
            <span className="text-danger">
              {(discountTotal ?? total).toLocaleString()} đ
            </span>
          </h5>

          {voucherInfo && (
            <div className="text-end mt-2">
              <h6 className="text-success">
                Bạn được giảm {voucherInfo.discount}% – tiết kiệm{" "}
                {voucherInfo.discountAmount.toLocaleString()} đ
              </h6>
              <h6 className="text-muted">
                Tổng trước giảm: {voucherInfo.originalTotal.toLocaleString()} đ
              </h6>
            </div>
          )}

          {/* Nút Thanh toán chuyển sang trang Checkout */}
          <button
            className="btn btn-success float-end"
            onClick={() =>
              navigate("/checkout", {
                state: {
                  total,
                  discountTotal,
                  voucherInfo,
                  cartItems,
                },
              })
            }
          >
            Thanh toán
          </button>
        </>
      )}
    </div>
  );
}
