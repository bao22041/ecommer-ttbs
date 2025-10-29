// routes/reviews.js
const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

// Thêm review cho sản phẩm
router.post("/:productId", reviewController.addReview);

// Lấy danh sách review của sản phẩm
router.get("/:productId", reviewController.getReviewsByProduct);

// Xóa review theo id
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
