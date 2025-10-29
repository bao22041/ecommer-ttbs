// models/AdminReportModel.js
const db = require("../config/db");

// Doanh thu theo ngày
exports.getRevenueByDay = (callback) => {
  db.query(
    `SELECT order_date, SUM(total) AS revenue
     FROM orders
     GROUP BY order_date
     ORDER BY order_date DESC`,
    callback
  );
};

// Top sản phẩm bán chạy
exports.getTopProducts = (callback) => {
  db.query(
    `SELECT p.name, SUM(oi.quantity) AS sold
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     GROUP BY p.id
     ORDER BY sold DESC
     LIMIT 5`,
    callback
  );
};

// Top khách hàng chi tiêu nhiều nhất
exports.getTopCustomers = (callback) => {
  db.query(
    `SELECT u.full_name, SUM(o.total) AS spent
     FROM orders o
     JOIN users u ON o.user_id = u.id
     GROUP BY u.id
     ORDER BY spent DESC
     LIMIT 5`,
    callback
  );
};
