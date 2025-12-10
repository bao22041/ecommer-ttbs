//const db = require('../config/db');
const VoucherModel = require('../models/voucherModel');

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

// Áp dụng voucher
exports.applyVoucher = async (req, res) => {
  try {
    const { code, cartTotal } = req.body;

    // Debug log để kiểm tra dữ liệu nhận được
    console.log("📥 Dữ liệu nhận được:", req.body);

    // Kiểm tra đầu vào
    if (!code?.trim()) {
      return res.status(400).json({ message: "Thiếu mã voucher" });
    }
    if (typeof cartTotal !== "number" || cartTotal <= 0) {
      return res.status(400).json({ message: "Tổng giỏ hàng không hợp lệ" });
    }

    // Tìm voucher theo mã
    const voucher = await VoucherModel.findByCode(code.trim());

    if (!voucher) {
      return res.status(404).json({ message: "Mã voucher không hợp lệ" });
    }

    // Kiểm tra hạn sử dụng
    if (voucher.expiry_date && new Date(voucher.expiry_date) < new Date()) {
      return res.status(400).json({ message: "Voucher đã hết hạn" });
    }

    // Tính toán giảm giá
    const discount = voucher.discount || 0;
    const discountAmount = (cartTotal * discount) / 100;
    const newTotal = cartTotal - discountAmount;

    // Trả về kết quả
    res.json({
      message: "Áp dụng voucher thành công",
      discount,                
      discountAmount: Math.round(discountAmount),
      voucher_id: voucher.id,
      originalTotal: cartTotal,
      newTotal: Math.round(newTotal),
    });
  } catch (err) {
    console.error("❌ Lỗi applyVoucher:", err);
    res.status(500).json({
      message: "Có lỗi xảy ra trong hệ thống",
      error: err.message,
    });
  }
};