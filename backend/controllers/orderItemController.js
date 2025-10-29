// controllers/orderItemController.js
const OrderItemModel = require("../models/OrderItemModel");

// GET /api/order-items/:orderId/items
exports.getOrderItems = (req, res) => {
  const orderId = req.params.orderId;

  OrderItemModel.getItemsByOrderId(orderId, (err, results) => {
    if (err) {
      console.error("❌ DB error:", err);
      return res.status(500).json({ message: "Lỗi server" });
    }
    res.json(results);
  });
};
