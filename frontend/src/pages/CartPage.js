import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/cart?user_id=1").then((res) => {
      setCart(res.data);
    });
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container my-5">
      <h3>Giỏ hàng của bạn</h3>
      {cart.length === 0 ? (
        <p>Giỏ hàng đang trống.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Tổng</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price.toLocaleString()} đ</td>
                  <td>{(item.price * item.quantity).toLocaleString()} đ</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h5 className="text-end">Tổng cộng: {total.toLocaleString()} đ</h5>
          <button className="btn btn-success float-end">Thanh toán</button>
        </>
      )}
    </div>
  );
}
