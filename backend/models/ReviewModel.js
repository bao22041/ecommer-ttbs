// models/ReviewModel.js
const db = require("../config/db");

// Thêm review
exports.addReview = (product_id, user_id, rating, comment, callback) => {
  db.query(
    "INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)",
    [product_id, user_id, rating, comment],
    callback
  );
};

// Lấy review theo sản phẩm
exports.getReviewsByProduct = (product_id, callback) => {
  db.query(
    `SELECT r.id, r.rating, r.comment, r.created_at, u.username 
     FROM reviews r 
     JOIN users u ON r.user_id = u.id 
     WHERE r.product_id = ?`,
    [product_id],
    callback
  );
};

// Xóa review
exports.removeReview = (id, callback) => {
  db.query("DELETE FROM reviews WHERE id = ?", [id], callback);
};
