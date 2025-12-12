const db = require("../config/db");
const CartModel = require("../models/CartModel");

// 📦 Lấy giỏ hàng theo user_id
exports.getCartByUser = (req, res) => {
  const userId = parseInt(req.params.userId);
  if (!userId) return res.status(400).json({ message: "Thiếu user_id" });

  CartModel.getCartByUser(userId, (err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json(results || []);
  });
};

// ➕ Thêm sản phẩm vào giỏ
exports.addToCart = (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  if (!user_id || !product_id || !quantity) {
    return res.status(400).json({ message: "Thiếu dữ liệu" });
  }
  CartModel.addToCart(user_id, product_id, quantity, (err) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.status(201).json({ message: "Đã thêm sản phẩm vào giỏ hàng" });
  });
};
// ✏️ Cập nhật số lượng sản phẩm trong giỏ (theo cart_item_id)
exports.updateCartItem = (req, res) => {
  const cartItemId = parseInt(req.params.id);
  const { quantity } = req.body;

  if (!quantity || isNaN(quantity)) {
    return res.status(400).json({ message: "Thiếu hoặc sai định dạng quantity" });
  }

  CartModel.updateCartItem(cartItemId, quantity, (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm trong giỏ" });
    }
    res.json({ message: "Đã cập nhật số lượng", cart_item_id: cartItemId, quantity });
  });
};

// ❌ Xóa sản phẩm khỏi giỏ (theo cart_item_id)
exports.removeFromCart = (req, res) => {
  const cartItemId = parseInt(req.params.id);
  if (!cartItemId || isNaN(cartItemId)) {
    return res.status(400).json({ message: "Sai định dạng id sản phẩm trong giỏ" });
  }

  CartModel.removeFromCart(cartItemId, (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm trong giỏ" });
    }
    res.json({ message: "Đã xóa khỏi giỏ hàng", cart_item_id: cartItemId });
  });
};
exports.clearCart = (req, res) => {
  const userId = req.params.userId;
  if (!userId) return res.status(400).json({ message: "Thiếu user_id" });

  CartModel.clearCart(userId, (err, result) => {
    if (err) {
      console.error("❌ Lỗi xóa giỏ hàng:", err);
      return res.status(500).json({ error: "Lỗi server khi xóa giỏ hàng" });
    }
    res.json({ message: "Đã xóa toàn bộ giỏ hàng", affectedRows: result.affectedRows });
  });
};

