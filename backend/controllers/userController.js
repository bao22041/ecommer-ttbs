// controllers/userController.js
const UserModel = require("../models/UserModel");

// GET /api/users
exports.getAllUsers = (req, res) => {
  UserModel.getAll((err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json(results);
  });
};

// GET /api/users/:id
exports.getUserById = (req, res) => {
  UserModel.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    if (results.length === 0) return res.status(404).json({ message: "Không tìm thấy user" });
    res.json(results[0]);
  });
};

// PUT /api/users/:id
exports.updateUser = (req, res) => {
  UserModel.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json({ message: "Đã cập nhật user" });
  });
};

// DELETE /api/users/:id
exports.deleteUser = (req, res) => {
  UserModel.remove(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json({ message: "Đã xóa user" });
  });
};
