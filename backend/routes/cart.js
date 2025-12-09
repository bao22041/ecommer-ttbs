const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Lấy giỏ hàng theo userId
router.get("/user/:userId", cartController.getCartByUser);

// Thêm sản phẩm vào giỏ
router.post("/", cartController.addToCart);

// Cập nhật số lượng sản phẩm trong giỏ
router.put("/item/:id", cartController.updateCartItem);

// Xóa sản phẩm khỏi giỏ
router.delete("/item/:id", cartController.removeFromCart);

module.exports = router;
