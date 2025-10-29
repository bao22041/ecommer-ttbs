// models/ChatbotModel.js
const db = require("../config/db");

// Tìm sản phẩm theo tên gần giống message
exports.findProductByMessage = (message, callback) => {
  db.query(
    "SELECT id, name, category, color, size, specs, price, stock FROM products WHERE name LIKE ? LIMIT 1",
    [`%${message}%`],
    callback
  );
};
