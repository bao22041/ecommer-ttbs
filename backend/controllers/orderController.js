const OrderModel = require("../models/OrderModel");

// POST /api/orders
exports.createOrder = (req, res) => {
  const { user_id, items, name, phone, address, voucher_id } = req.body;
  console.log("📦 Payload nhận được:", req.body);

  if (!user_id || !items || items.length === 0 || !name || !phone || !address) {
    return res.status(400).json({ message: "Thiếu dữ liệu đơn hàng" });
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  console.log("💰 Tổng tiền:", total);

  OrderModel.createOrder(user_id, total, name, phone, address, voucher_id || null, (err, result) => {
    if (err) {
      console.error("❌ Lỗi tạo đơn hàng:", err);
      return res.status(500).json({ message: "Lỗi server khi tạo đơn hàng" });
    }

    const orderId = result.insertId;
    console.log("🆔 Order ID:", orderId);

    OrderModel.addOrderItems(orderId, items, (err2) => {
      if (err2) {
        console.error("❌ Lỗi thêm sản phẩm:", err2);
        return res.status(500).json({ message: "Lỗi server khi thêm sản phẩm" });
      }
      res.status(201).json({ message: "Đơn hàng đã được tạo", orderId });
    });
  });
};

// GET /api/orders/user/:userId
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
