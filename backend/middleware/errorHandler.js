// backend/middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error('🔥 Lỗi:', err.message);
  res.status(500).json({
    message: 'Có lỗi xảy ra trong hệ thống',
    error: err.message
  });
};
