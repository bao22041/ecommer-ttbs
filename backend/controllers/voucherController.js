const db = require('../config/db');

// Lấy danh sách voucher
exports.getVouchers = (req, res) => {
  db.query('SELECT * FROM vouchers', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Lấy voucher theo ID
exports.getVoucherById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM vouchers WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.status(404).json({ message: 'Voucher không tồn tại' });
    }
    res.json(results[0]);
  });
};

// Thêm voucher mới
exports.addVoucher = (req, res) => {
  const { code, discount } = req.body;
  db.query(
    'INSERT INTO vouchers (code, discount) VALUES (?, ?)',
    [code, discount],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Thêm voucher thành công', id: result.insertId });
    }
  );
};

// Cập nhật voucher
exports.updateVoucher = (req, res) => {
  const { id } = req.params;
  const { code, discount } = req.body;
  db.query(
    'UPDATE vouchers SET code = ?, discount = ? WHERE id = ?',
    [code, discount, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Voucher không tồn tại' });
      }
      res.json({ message: 'Cập nhật voucher thành công' });
    }
  );
};

// Xóa voucher
exports.deleteVoucher = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM vouchers WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Voucher không tồn tại' });
    }
    res.json({ message: 'Xóa voucher thành công' });
  });
};
