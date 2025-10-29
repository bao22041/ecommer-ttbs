// models/OrderModel.js
const db = require("../config/db");

// Tạo đơn hàng
exports.createOrder = (user_id, total, callback) => {
  db.query(
    "INSERT INTO orders (user_id, total) VALUES (?, ?)",
    [user_id, total],
    callback
  );
};

// Thêm nhiều order_items
exports.addOrderItems = (orderId, items, callback) => {
  const values = items.map(i => [orderId, i.product_id, i.quantity, i.price]);
  db.query(
    "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?",
    [values],
    callback
  );
};

// Lấy danh sách đơn hàng theo user
exports.getOrdersByUser = (userId, callback) => {
  db.query("SELECT * FROM orders WHERE user_id = ?", [userId], callback);
};

// Lấy chi tiết đơn hàng
exports.getOrderById = (orderId, callback) => {
  db.query("SELECT * FROM orders WHERE id = ?", [orderId], callback);
};

// Lấy items trong đơn hàng
exports.getOrderItems = (orderId, callback) => {
  db.query(
    `SELECT oi.id, p.name, oi.quantity, oi.price
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = ?`,
    [orderId],
    callback
  );
};
