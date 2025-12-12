import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import "./CartPage.css"; // Link tới file CSS vừa tạo

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State xử lý Voucher
  const [voucherCode, setVoucherCode] = useState("");
  const [discountTotal, setDiscountTotal] = useState(null);
  const [voucherInfo, setVoucherInfo] = useState(null);

  // Giả định user_id = 1
  const userId = 1;
  const navigate = useNavigate();
  const { addToWishlist } = useContext(WishlistContext);

  // 1. Tải giỏ hàng
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

  // 2. Xóa sản phẩm
  const handleRemove = async (cartItemId) => {
    if (!cartItemId) return;
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/cart/item/${cartItemId}`);
      getCart(); // Reload lại
    } catch (err) {
      console.error("❌ Lỗi xóa:", err);
      alert("Không thể xóa sản phẩm.");
    }
  };

  // 3. Cập nhật số lượng
  const handleUpdateQty = async (cartItemId, qty) => {
    if (!cartItemId || qty < 1) return;
    try {
      await axios.put(`http://localhost:5000/api/cart/item/${cartItemId}`, {
        quantity: qty,
      });
      getCart();
    } catch (err) {
      console.error("❌ Lỗi update qty:", err);
    }
  };

  // Tính tổng tiền gốc
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  // 4. Áp dụng Voucher
  const applyVoucher = async () => {
    if (!voucherCode.trim()) return alert("Vui lòng nhập mã voucher");
    try {
      const res = await axios.post("http://localhost:5000/api/vouchers/apply", {
        code: voucherCode,
        cartTotal: total,
      });

      if (res.data.newTotal) {
        setDiscountTotal(res.data.newTotal);
        setVoucherInfo({
          discount: res.data.discount,
          discountAmount: res.data.discountAmount,
          originalTotal: res.data.originalTotal,
        });
        alert(`🎉 Áp dụng thành công! Giảm ${res.data.discount}%`);
      } else {
        alert(res.data.error || "Voucher không hợp lệ");
      }
    } catch (err) {
      console.error("❌ Lỗi áp voucher:", err);
      alert("Mã giảm giá không hợp lệ hoặc đã hết hạn.");
    }
  };

  return (
    <div className="container my-5 cart-page-container">
      <h3 className="cart-title">🛒 Giỏ hàng của bạn</h3>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3 text-muted">Đang tải dữ liệu...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : cartItems.length === 0 ? (
        // --- GIAO DIỆN GIỎ HÀNG TRỐNG (Khớp CSS) ---
        <div className="empty-cart-box">
          <span className="empty-cart-icon">🛍️</span>
          <h4 className="text-muted mb-3">Giỏ hàng của bạn đang trống</h4>
          <p className="text-muted mb-4">Hãy chọn thêm sản phẩm để mua sắm nhé!</p>
          <button className="btn-back-home" onClick={() => navigate("/")}>
            ← Quay lại mua sắm
          </button>
        </div>
      ) : (
        // --- GIAO DIỆN CÓ SẢN PHẨM ---
        <div className="row g-4">
          {/* CỘT TRÁI: DANH SÁCH SP */}
          <div className="col-lg-8">
            <div className="cart-card">
              <div className="table-responsive">
                <table className="tech-table">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th className="text-center">Số lượng</th>
                      <th>Giá</th>
                      <th>Tổng</th>
                      <th className="text-center">Xóa</th>
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
                                className="cart-item-img"
                              />
                            )}
                            <div>
                              <span className="cart-item-name">{item.name}</span>
                              {/* Nút yêu thích khớp CSS */}
                              <button
                                className="btn-move-wishlist"
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
                                <span>❤️</span> Lưu yêu thích
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
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
                            className="cart-qty-input"
                          />
                        </td>
                        <td className="cart-price">
                          {Number(item.price).toLocaleString()} đ
                        </td>
                        <td className="cart-total-item">
                          {(Number(item.price) * Number(item.quantity)).toLocaleString()} đ
                        </td>
                        <td className="text-center">
                          <button
                            className="btn-icon-del"
                            title="Xóa khỏi giỏ"
                            onClick={() => handleRemove(item.cart_item_id)}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: THANH TOÁN */}
          <div className="col-lg-4">
            <div className="cart-summary-box">
              <h5 className="summary-title">Tóm tắt đơn hàng</h5>
              
              {/* Input Voucher */}
              <div className="voucher-group">
                <input
                  type="text"
                  placeholder="Mã giảm giá"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className="voucher-input"
                />
                <button className="btn-apply" onClick={applyVoucher}>
                  Áp dụng
                </button>
              </div>

              {/* Các dòng tính tiền */}
              <div className="mt-4">
                <div className="summary-row">
                  <span>Tạm tính:</span>
                  <span>
                    {(voucherInfo ? voucherInfo.originalTotal : total).toLocaleString()} đ
                  </span>
                </div>
                
                {voucherInfo && (
                  <div className="summary-row text-success fw-bold">
                    <span>Giảm giá ({voucherInfo.discount}%):</span>
                    <span>- {voucherInfo.discountAmount.toLocaleString()} đ</span>
                  </div>
                )}

                <div className="summary-row total">
                  <span>Tổng cộng:</span>
                  <span>
                    {(discountTotal ?? total).toLocaleString()} đ
                  </span>
                </div>
              </div>

              <button
                className="btn-checkout"
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
                thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}