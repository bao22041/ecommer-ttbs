// models/OrderItemModel.js
const db = require("../config/db");

// Lấy chi tiết sản phẩm trong đơn hàng
exports.getItemsByOrderId = (orderId, callback) => {
  db.query(
    `SELECT oi.id, p.name, oi.quantity, oi.price
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = ?`,
    [orderId],
    callback
  );
};
