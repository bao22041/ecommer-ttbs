const db = require('../config/db');

// ✅ Lấy danh sách sản phẩm (có thể thêm phân trang sau này)
exports.getProducts = (req, res) => {
  db.query('SELECT * FROM products ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// ✅ Lấy chi tiết sản phẩm theo ID
exports.getProductById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.json(results[0]);
  });
};

// ✅ Thêm sản phẩm mới (đầy đủ trường)
exports.addProduct = (req, res) => {
  const { name, description, category, size, color, specs, price, stock, image_url } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: 'Thiếu tên hoặc giá sản phẩm' });
  }

  db.query(
    `INSERT INTO products 
    (name, description, category, size, color, specs, price, stock, image_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, description, category, size, color, specs, price, stock, image_url],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Thêm sản phẩm thành công', id: result.insertId });
    }
  );
};

// ✅ Cập nhật sản phẩm theo ID
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, category, size, color, specs, price, stock, image_url } = req.body;

  db.query(
    `UPDATE products 
     SET name=?, description=?, category=?, size=?, color=?, specs=?, price=?, stock=?, image_url=? 
     WHERE id=?`,
    [name, description, category, size, color, specs, price, stock, image_url, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
      }
      res.json({ message: 'Cập nhật sản phẩm thành công' });
    }
  );
};

// ✅ Xóa sản phẩm theo ID
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }
    res.json({ message: 'Xóa sản phẩm thành công' });
  });
};
