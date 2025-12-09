const db = require("../config/db");

// ➕ Thêm review mới
exports.addReview = (product_id, user_id, rating, comment, callback) => {
  const sql = `
    INSERT INTO reviews (product_id, user_id, rating, comment)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [product_id, user_id, rating, comment], callback);
};

// 📦 Lấy review theo sản phẩm
exports.getReviewsByProduct = (product_id, callback) => {
  const sql = `
    SELECT r.id, r.rating, r.comment, r.created_at,
           u.full_name, u.avatar
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.product_id = ?
    ORDER BY r.created_at DESC
  `;
  db.query(sql, [product_id], callback);
};

// ❌ Xóa review theo id
exports.removeReview = (id, callback) => {
  const sql = "DELETE FROM reviews WHERE id = ?";
  db.query(sql, [id], callback);
};

// 📋 Lấy tất cả review
exports.getAllReviews = (callback) => {
  const sql = `
    SELECT r.id, r.product_id, r.rating, r.comment, r.created_at,
           u.full_name, u.avatar
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    ORDER BY r.created_at DESC
  `;
  db.query(sql, callback);
};
