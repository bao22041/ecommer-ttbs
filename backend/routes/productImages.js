// routes/productImages.js
const express = require("express");
const router = express.Router();
const productImageController = require("../controllers/productImageController");

// Thêm ảnh cho sản phẩm
router.post("/:id/images", productImageController.addImage);

// Lấy danh sách ảnh của sản phẩm
router.get("/:id/images", productImageController.getImagesByProduct);

// Xóa ảnh theo id
router.delete("/images/:id", productImageController.deleteImage);

module.exports = router;
