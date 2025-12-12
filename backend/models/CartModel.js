const db = require("../config/db");

// Tạo giỏ hàng cho user nếu chưa có
exports.createCartIfNotExists = (userId, callback) => {
  const sqlCheck = "SELECT id FROM cart WHERE user_id = ?";
  db.query(sqlCheck, [userId], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) {
      const sqlInsert = "INSERT INTO cart (user_id) VALUES (?)";
      db.query(sqlInsert, [userId], (err2, res2) => {
        if (err2) return callback(err2);
        callback(null, { id: res2.insertId });
      });
    } else {
      callback(null, results[0]); // đã có giỏ hàng
    }
  });
};

// Lấy giỏ hàng theo user_id
exports.getCartByUser = (userId, callback) => {
  const sql = `
    SELECT ci.id AS cart_item_id, ci.product_id, ci.quantity,
           p.name, p.price, p.image_url
    FROM cart_items ci
    JOIN cart c ON ci.cart_id = c.id
    JOIN products p ON ci.product_id = p.id
    WHERE c.user_id = ?
  `;
  db.query(sql, [userId], callback);
};

// Thêm sản phẩm vào giỏ
exports.addToCart = (userId, productId, quantity, callback) => {
  const sqlFindCart = "SELECT id FROM cart WHERE user_id = ?";
  db.query(sqlFindCart, [userId], (err, results) => {
    if (err) return callback(err);

    const cartId = results.length > 0 ? results[0].id : null;

    const ensureCart = (cartId) => {
      const sqlCheckItem = `
        SELECT id, quantity FROM cart_items
        WHERE cart_id = ? AND product_id = ?
      `;
      db.query(sqlCheckItem, [cartId, productId], (err2, res2) => {
        if (err2) return callback(err2);

        if (res2.length > 0) {
          const newQty = res2[0].quantity + quantity;
          const sqlUpdate = "UPDATE cart_items SET quantity = ? WHERE id = ?";
          db.query(sqlUpdate, [newQty, res2[0].id], callback);
        } else {
          const sqlInsert = `
            INSERT INTO cart_items (cart_id, product_id, quantity)
            VALUES (?, ?, ?)
          `;
          db.query(sqlInsert, [cartId, productId, quantity], callback);
        }
      });
    };

    if (!cartId) {
      const sqlCreateCart = "INSERT INTO cart (user_id) VALUES (?)";
      db.query(sqlCreateCart, [userId], (err3, res3) => {
        if (err3) return callback(err3);
        ensureCart(res3.insertId);
      });
    } else {
      ensureCart(cartId);
    }
  });
};

// Cập nhật số lượng sản phẩm trong giỏ
exports.updateCartItem = (cartItemId, quantity, callback) => {
  const sql = "UPDATE cart_items SET quantity = ? WHERE id = ?";
  db.query(sql, [quantity, cartItemId], callback);
};

// Xóa sản phẩm khỏi giỏ
exports.removeFromCart = (cartItemId, callback) => {
  const sql = "DELETE FROM cart_items WHERE id = ?";
  db.query(sql, [cartItemId], callback);
};

// Xóa toàn bộ sản phẩm trong giỏ theo user_id
exports.clearCart = (userId, callback) => {
  const sql = `
    DELETE ci FROM cart_items ci
    JOIN cart c ON ci.cart_id = c.id
    WHERE c.user_id = ?
  `;
  db.query(sql, [userId], callback);
};