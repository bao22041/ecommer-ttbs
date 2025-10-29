// routes/adminReports.js
const express = require("express");
const router = express.Router();
const adminReportController = require("../controllers/adminReportController");

// Doanh thu theo ngày
router.get("/revenue", adminReportController.getRevenue);

// Top sản phẩm bán chạy
router.get("/top-products", adminReportController.getTopProducts);

// Top khách hàng chi tiêu nhiều nhất
router.get("/top-customers", adminReportController.getTopCustomers);

module.exports = router;
