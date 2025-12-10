const express = require('express');
const router = express.Router();
const VoucherController = require('../controllers/voucherController');

// Lấy danh sách voucher
router.get('/', VoucherController.getVouchers);

// Lấy voucher theo ID
router.get('/:id', VoucherController.getVoucherById);

// Thêm voucher mới
router.post('/', VoucherController.addVoucher);

// Cập nhật voucher
router.put('/:id', VoucherController.updateVoucher);

// Xóa voucher
router.delete('/:id', VoucherController.deleteVoucher);

// Áp dụng voucher
router.post('/apply', VoucherController.applyVoucher);

module.exports = router;
