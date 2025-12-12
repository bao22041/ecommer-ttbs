const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// ================== PUBLIC ROUTES ==================

// 📦 Lấy tất cả sản phẩm
router.get("/", ProductController.getProducts);

// 🔍 Tìm kiếm sản phẩm theo tên
router.get("/search", ProductController.searchProducts);

// 📂 Lấy sản phẩm theo danh mục
router.get("/category/:slug", ProductController.getProductsByCategory);
// 📄 Lấy chi tiết sản phẩm theo ID
router.get("/:id", ProductController.getProductById);

// ================== ADMIN ROUTES ==================

// ➕ Thêm sản phẩm (chỉ admin)
router.post("/", authMiddleware, roleMiddleware("admin"), ProductController.addProduct);

// ✏️ Sửa sản phẩm (chỉ admin)
router.put("/:id", authMiddleware, roleMiddleware("admin"), ProductController.updateProduct);

// ❌ Xóa sản phẩm (chỉ admin)
router.delete("/:id", authMiddleware, roleMiddleware("admin"), ProductController.deleteProduct);

module.exports = router;
