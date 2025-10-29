// controllers/notificationController.js
const NotificationModel = require("../models/NotificationModel");

// POST /api/notifications
exports.createNotification = (req, res) => {
  const { user_id, message } = req.body;
  NotificationModel.addNotification(user_id, message, (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.status(201).json({
      id: result.insertId,
      user_id,
      message,
      createdAt: new Date().toISOString(),
      is_read: 0
    });
  });
};

// GET /api/notifications/:userId
exports.getNotificationsByUser = (req, res) => {
  NotificationModel.getNotificationsByUser(req.params.userId, (err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json(results);
  });
};

// PUT /api/notifications/:id/read
exports.markAsRead = (req, res) => {
  NotificationModel.markAsRead(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json({ message: "Đã đánh dấu đã đọc" });
  });
};

// DELETE /api/notifications/:id
exports.deleteNotification = (req, res) => {
  NotificationModel.removeNotification(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json({ message: "Đã xóa thông báo" });
  });
};
