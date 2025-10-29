// models/ProductImageModel.js
const db = require("../config/db");

// Thêm ảnh cho sản phẩm
exports.addImage = (product_id, url, callback) => {
  db.query(
    "INSERT INTO product_images (product_id, url) VALUES (?, ?)",
    [product_id, url],
    callback
  );
};

// Lấy danh sách ảnh theo sản phẩm
exports.getImagesByProduct = (product_id, callback) => {
  db.query(
    "SELECT id, url FROM product_images WHERE product_id = ?",
    [product_id],
    callback
  );
};

// Xóa ảnh
exports.removeImage = (id, callback) => {
  db.query("DELETE FROM product_images WHERE id = ?", [id], callback);
};
