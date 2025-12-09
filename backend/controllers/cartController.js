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
  const userId = parseInt(req.params.userId);
  const { product_id, quantity } = req.body;

  if (!product_id || !quantity || isNaN(quantity)) {
    return res.status(400).json({ message: "Thiếu hoặc sai dữ liệu đầu vào" });
  }

  CartModel.addToCart(userId, product_id, quantity, (err, result) => {
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
