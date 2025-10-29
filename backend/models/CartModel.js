// models/CartModel.js
const db = require("../config/db");

exports.addToCart = (user_id, product_id, quantity, callback) => {
  db.query(
    "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
    [user_id, product_id, quantity],
    callback
  );
};

exports.getCartByUser = (userId, callback) => {
  db.query(
    `SELECT c.id, p.name, p.price, c.quantity 
     FROM cart c 
     JOIN products p ON c.product_id = p.id 
     WHERE c.user_id = ?`,
    [userId],
    callback
  );
};
