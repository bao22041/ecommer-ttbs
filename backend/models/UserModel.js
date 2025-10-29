// models/UserModel.js
const db = require("../config/db");

// Lấy danh sách user
exports.getAll = (callback) => {
  db.query("SELECT id, username, full_name, email, role FROM users", callback);
};

// Lấy chi tiết user
exports.getById = (id, callback) => {
  db.query("SELECT id, username, full_name, email, role FROM users WHERE id = ?", [id], callback);
};

// Cập nhật user
exports.update = (id, data, callback) => {
  const { full_name, email, phone, address } = data;
  db.query(
    "UPDATE users SET full_name=?, email=?, phone=?, address=? WHERE id=?",
    [full_name, email, phone, address, id],
    callback
  );
};

// Xóa user
exports.remove = (id, callback) => {
  db.query("DELETE FROM users WHERE id = ?", [id], callback);
};
