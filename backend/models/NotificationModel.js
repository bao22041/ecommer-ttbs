// models/NotificationModel.js
const db = require("../config/db");

// Thêm thông báo
exports.addNotification = (user_id, message, callback) => {
  db.query(
    "INSERT INTO notifications (user_id, message) VALUES (?, ?)",
    [user_id, message],
    callback
  );
};

// Lấy danh sách thông báo theo user
exports.getNotificationsByUser = (user_id, callback) => {
  db.query(
    "SELECT id, message, created_at, is_read FROM notifications WHERE user_id = ? ORDER BY created_at DESC",
    [user_id],
    callback
  );
};

// Đánh dấu đã đọc
exports.markAsRead = (id, callback) => {
  db.query("UPDATE notifications SET is_read = 1 WHERE id = ?", [id], callback);
};

// Xóa thông báo
exports.removeNotification = (id, callback) => {
  db.query("DELETE FROM notifications WHERE id = ?", [id], callback);
};
