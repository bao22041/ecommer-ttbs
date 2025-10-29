// routes/orderItems.js
const express = require("express");
const router = express.Router();
const orderItemController = require("../controllers/orderItemController");

// Lấy chi tiết sản phẩm trong đơn hàng
router.get("/:orderId/items", orderItemController.getOrderItems);

module.exports = router;
