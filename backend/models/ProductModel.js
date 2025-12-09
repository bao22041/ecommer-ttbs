const db = require("../config/db");

// ✅ Thêm review
exports.addReview = (product_id, user_id, rating, comment, callback) => {
  const sql = `
    INSERT INTO reviews (product_id, user_id, rating, comment)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [product_id, user_id, rating, comment], callback);
};

// ✅ Lấy danh sách review theo product_id
exports.getReviewsByProduct = (product_id, callback) => {
  const sql = `
    SELECT r.id, r.product_id, r.user_id, r.rating, r.comment, r.created_at,
           u.full_name, u.avatar
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.product_id = ?
    ORDER BY r.created_at DESC
  `;
  db.query(sql, [product_id], callback);
};

// ✅ Xóa review theo id
exports.removeReview = (id, callback) => {
  db.query("DELETE FROM reviews WHERE id = ?", [id], callback);
};

// 🔍 Kiểm tra người dùng đã review sản phẩm chưa
exports.hasUserReviewed = (product_id, user_id, callback) => {
  const sql = "SELECT id FROM reviews WHERE product_id = ? AND user_id = ?";
  db.query(sql, [product_id, user_id], (err, results) => {
    if (err) return callback(err);
    callback(null, results.length > 0);
  });
};

// 📊 Tính trung bình rating của sản phẩm
exports.getAverageRating = (product_id, callback) => {
  const sql = "SELECT AVG(rating) AS avgRating FROM reviews WHERE product_id = ?";
  db.query(sql, [product_id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0].avgRating || 0);
  });
};
