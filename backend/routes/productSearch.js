// routes/productSearch.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Tìm kiếm sản phẩm theo tên
router.get("/search", async (req, res) => {
  const { name } = req.query;
  try {
    const [rows] = await db.query("SELECT * FROM products WHERE name LIKE ?", [`%${name}%`]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;
