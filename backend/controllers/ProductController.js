const db = require("../config/db");

// 📦 Lấy danh sách sản phẩm
exports.getProducts = (req, res) => {
  const sql = `
    SELECT p.*, c.name AS category_name, c.slug
    FROM products p
    JOIN categories c ON p.category_id = c.id
    ORDER BY p.created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// 📄 Lấy chi tiết sản phẩm theo ID
exports.getProductById = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT p.*, c.name AS category_name, c.slug
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    res.json(results[0]);
  });
};

// ➕ Thêm sản phẩm mới
exports.addProduct = (req, res) => {
  const { name, description, category_id, size, color, specs, price, stock, image_url } = req.body;

  if (!name || !price || !category_id) {
    return res.status(400).json({ message: "Thiếu tên, giá hoặc danh mục sản phẩm" });
  }

  const sql = `
    INSERT INTO products 
    (name, description, category_id, size, color, specs, price, stock, image_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [name, description, category_id, size, color, specs, price, stock, image_url], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Thêm sản phẩm thành công", id: result.insertId });
  });
};

// ✏️ Cập nhật sản phẩm theo ID
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, category_id, size, color, specs, price, stock, image_url } = req.body;

  const sql = `
    UPDATE products 
    SET name=?, description=?, category_id=?, size=?, color=?, specs=?, price=?, stock=?, image_url=? 
    WHERE id=?
  `;
  db.query(sql, [name, description, category_id, size, color, specs, price, stock, image_url, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.json({ message: "Cập nhật sản phẩm thành công" });
  });
};
// ❌ Xóa sản phẩm theo ID
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.json({ message: "Xóa sản phẩm thành công" });
  });
};

// 🔍 Tìm kiếm sản phẩm theo tên
exports.searchProducts = (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ message: "Thiếu tên sản phẩm để tìm kiếm" });

  const sql = `
    SELECT p.*, c.name AS category_name, c.slug
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE p.name LIKE ?
  `;
  db.query(sql, [`%${name}%`], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
  });
};

// ✅ Thêm review
exports.addReview = (product_id, user_id, rating, comment, callback) => {
  const sql = "INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)";
  db.query(sql, [product_id, user_id, rating, comment], callback);
};

// ✅ Lấy danh sách review theo product_id
exports.getReviewsByProduct = (product_id, callback) => {
  const sql = `
    SELECT r.id, r.product_id, r.user_id, r.rating, r.comment, r.created_at,
           u.full_name, u.avatar
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.product_id = ?
    ORDER BY r.created_at DESC
  `;
  db.query(sql, [product_id], callback);
};

// ✅ Xóa review theo id
exports.removeReview = (id, callback) => {
  db.query("DELETE FROM reviews WHERE id = ?", [id], callback);
};

// 🔍 Kiểm tra người dùng đã review sản phẩm chưa
exports.hasUserReviewed = (product_id, user_id, callback) => {
  const sql = "SELECT id FROM reviews WHERE product_id = ? AND user_id = ?";
  db.query(sql, [product_id, user_id], (err, results) => {
    if (err) return callback(err);
    callback(null, results.length > 0);
  });
};

// 📊 Tính trung bình rating của sản phẩm
exports.getAverageRating = (product_id, callback) => {
  const sql = "SELECT AVG(rating) AS avgRating FROM reviews WHERE product_id = ?";
  db.query(sql, [product_id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0].avgRating || 0);
  });
};
// 📂 Lấy sản phẩm theo slug danh mục
exports.getProductsByCategory = (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    return res.status(400).json({ message: "Thiếu slug danh mục" });
  }

  const sql = `
    SELECT p.*, c.name AS category_name, c.slug
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE c.slug = ?
  `;
  db.query(sql, [slug], (err, results) => {
    if (err) {
      console.error("❌ Lỗi lấy sản phẩm theo danh mục:", err);
      return res.status(500).json({ message: "Lỗi server" });
    }
    res.json(results || []);
  });
};