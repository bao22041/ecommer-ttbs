const db = require("../config/db");

// Tìm sản phẩm theo tên gần giống
exports.findProductByMessage = (message, callback) => {
  db.query(
    "SELECT id, name, category, color, size, specs, price, stock FROM products WHERE name LIKE ? LIMIT 1",
    [`%${message}%`],
    callback
  );
};

// Gợi ý sản phẩm gần giống nếu không tìm thấy
exports.suggestProducts = (keyword, callback) => {
  db.query(
    "SELECT name FROM products WHERE name LIKE ? LIMIT 3",
    [`%${keyword}%`],
    callback
  );
};

// Lưu hội thoại vào bảng chat_bot
exports.saveChatLog = (log, callback) => {
  db.query("INSERT INTO chat_bot SET ?", log, callback);
};
