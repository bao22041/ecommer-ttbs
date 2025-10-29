// controllers/adminReportController.js
const AdminReportModel = require("../models/AdminReportModel");

// GET /api/admin/reports/revenue
exports.getRevenue = (req, res) => {
  AdminReportModel.getRevenueByDay((err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json(results);
  });
};

// GET /api/admin/reports/top-products
exports.getTopProducts = (req, res) => {
  AdminReportModel.getTopProducts((err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json(results);
  });
};

// GET /api/admin/reports/top-customers
exports.getTopCustomers = (req, res) => {
  AdminReportModel.getTopCustomers((err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json(results);
  });
};
