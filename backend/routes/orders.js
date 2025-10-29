// routes/orders.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Tạo đơn hàng
router.post("/", orderController.createOrder);

// Lấy danh sách đơn hàng của user
router.get("/user/:userId", orderController.getOrdersByUser);

// Lấy chi tiết đơn hàng
router.get("/:id", orderController.getOrderById);

// Lấy items trong đơn hàng
router.get("/:id/items", orderController.getOrderItems);

module.exports = router;
