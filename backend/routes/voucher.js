const express = require('express');
const router = express.Router();
const VoucherController = require('../controllers/voucherController');

router.get('/', VoucherController.getVouchers);
router.get('/:id', VoucherController.getVoucherById); 
router.post('/', VoucherController.addVoucher);
router.post('/:id', VoucherController.addVoucher);
router.put('/:id', VoucherController.updateVoucher);
router.delete('/:id', VoucherController.deleteVoucher);

module.exports = router;
