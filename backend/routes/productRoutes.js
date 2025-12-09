const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const db = require('../config/db'); // dùng trực tiếp cho tìm kiếm

// ✅ Public: lấy tất cả sản phẩm
router.get('/', ProductController.getProducts);

// ✅ Tìm kiếm sản phẩm theo tên (đặt trước :id để tránh conflict)
router.get('/search', async (req, res) => {
  const { name } = req.query;
  try {
    const [rows] = await db.query(
      "SELECT * FROM products WHERE name LIKE ?",
      [`%${name}%`]
    );
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
  } catch (err) {
    console.error("❌ Lỗi tìm kiếm:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// ✅ Lấy chi tiết sản phẩm theo ID
router.get('/:id', ProductController.getProductById);

// ✅ Thêm sản phẩm (chỉ admin)
router.post('/', authMiddleware, roleMiddleware('admin'), ProductController.addProduct);

// ✅ Sửa sản phẩm (chỉ admin)
router.put('/:id', authMiddleware, roleMiddleware('admin'), ProductController.updateProduct);

// ✅ Xóa sản phẩm (chỉ admin)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), ProductController.deleteProduct);

module.exports = router;
