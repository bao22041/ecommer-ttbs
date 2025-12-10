// src/pages/CartPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Voucher
  const [voucherCode, setVoucherCode] = useState("");
  const [discountTotal, setDiscountTotal] = useState(null);

  // Giả định user_id = 1 (sau này có thể lấy từ context hoặc token)
  const userId = 1;

  // Hàm tải giỏ hàng theo userId
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

  // Xóa sản phẩm khỏi giỏ
  const handleRemove = async (cartItemId) => {
    if (!cartItemId) return;
    try {
      await axios.delete(`http://localhost:5000/api/cart/item/${cartItemId}`);
      getCart(); // tải lại giỏ
    } catch (err) {
      console.error("❌ Lỗi xóa sản phẩm:", err);
      alert("Không thể xóa sản phẩm khỏi giỏ hàng.");
    }
  };

  // Cập nhật số lượng
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

  // Tính tổng tiền
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  // Áp dụng voucher
  const applyVoucher = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/vouchers/apply", {
        code: voucherCode,
        cartTotal: total,
      });
      if (res.data.newTotal) {
        setDiscountTotal(res.data.newTotal);
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

          <h5 className="text-end mt-3">
            Tổng cộng:{" "}
            <span className="text-danger">
              {(discountTotal ?? total).toLocaleString()} đ
            </span>
          </h5>
          <button className="btn btn-success float-end">Thanh toán</button>
        </>
      )}
    </div>
  );
}
