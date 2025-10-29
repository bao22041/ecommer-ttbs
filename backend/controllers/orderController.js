// controllers/orderController.js
const OrderModel = require("../models/OrderModel");

// POST /api/orders
exports.createOrder = (req, res) => {
  const { user_id, items } = req.body;
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  OrderModel.createOrder(user_id, total, (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });

    const orderId = result.insertId;
    OrderModel.addOrderItems(orderId, items, (err2) => {
      if (err2) return res.status(500).json({ message: "Lỗi server" });
      res.status(201).json({ message: "Đơn hàng đã được tạo", orderId });
    });
  });
};

// GET /api/orders/:userId
exports.getOrdersByUser = (req, res) => {
  OrderModel.getOrdersByUser(req.params.userId, (err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json(results);
  });
};

// GET /api/orders/:id
exports.getOrderById = (req, res) => {
  OrderModel.getOrderById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    if (results.length === 0) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    res.json(results[0]);
  });
};

// GET /api/orders/:id/items
exports.getOrderItems = (req, res) => {
  OrderModel.getOrderItems(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json(results);
  });
};
