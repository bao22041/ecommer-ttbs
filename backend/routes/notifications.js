// routes/notifications.js
const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// Tạo thông báo
router.post("/", notificationController.createNotification);

// Lấy danh sách thông báo của user
router.get("/:userId", notificationController.getNotificationsByUser);

// Đánh dấu đã đọc
router.put("/:id/read", notificationController.markAsRead);

// Xóa thông báo
router.delete("/:id", notificationController.deleteNotification);

module.exports = router;
