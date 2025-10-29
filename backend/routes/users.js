// routes/users.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Danh sách user (admin)
router.get("/", userController.getAllUsers);

// Chi tiết user
router.get("/:id", userController.getUserById);

// Cập nhật user
router.put("/:id", userController.updateUser);

// Xóa user
router.delete("/:id", userController.deleteUser);

module.exports = router;
