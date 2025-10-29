const db = require('../config/db');

// Lấy danh sách sản phẩm
exports.getProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Thêm sản phẩm
exports.addProduct = (req, res) => {
  const { name, price } = req.body;
  db.query(
    'INSERT INTO products (name, price) VALUES (?, ?)',
    [name, price],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Thêm sản phẩm thành công', id: result.insertId });
    }
  );
};

// Cập nhật sản phẩm
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  db.query(
    'UPDATE products SET name = ?, price = ? WHERE id = ?',
    [name, price, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
      }
      res.json({ message: 'Cập nhật sản phẩm thành công' });
    }
  );
};

// Xóa sản phẩm
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
