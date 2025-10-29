// controllers/cartController.js
const CartModel = require("../models/CartModel");

exports.addToCart = (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  CartModel.addToCart(user_id, product_id, quantity, (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.status(201).json({
      id: result.insertId,
      user_id,
      product_id,
      quantity,
      createdAt: new Date().toISOString()
    });
  });
};

exports.getCartByUser = (req, res) => {
  CartModel.getCartByUser(req.params.userId, (err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json(results);
  });
};
