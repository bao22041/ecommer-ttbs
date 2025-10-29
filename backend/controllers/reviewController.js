// controllers/reviewController.js
const ReviewModel = require("../models/ReviewModel");

// POST /api/reviews/:productId
exports.addReview = (req, res) => {
  const { user_id, rating, comment } = req.body;
  const product_id = req.params.productId;

  ReviewModel.addReview(product_id, user_id, rating, comment, (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.status(201).json({
      id: result.insertId,
      product_id,
      user_id,
      rating,
      comment,
      createdAt: new Date().toISOString()
    });
  });
};

// GET /api/reviews/:productId
exports.getReviewsByProduct = (req, res) => {
  ReviewModel.getReviewsByProduct(req.params.productId, (err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json(results);
  });
};

// DELETE /api/reviews/:id
exports.deleteReview = (req, res) => {
  ReviewModel.removeReview(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json({ message: "Đã xóa review" });
  });
};
