const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Public: ai cũng xem được
router.get('/', ProductController.getProducts);

// Chỉ admin mới thêm sản phẩm
router.post('/', authMiddleware, roleMiddleware(['admin']), ProductController.addProduct);

// Chỉ admin mới sửa
router.put('/:id', authMiddleware, roleMiddleware(['admin']), ProductController.updateProduct);

// Chỉ admin mới xóa
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), ProductController.deleteProduct);

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
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;
