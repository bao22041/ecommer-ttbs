const ReviewModel = require("../models/ReviewModel");

exports.addReview = (req, res) => {
  const { user_id, rating, comment } = req.body;
  const product_id = req.params.productId;

  if (!user_id || !rating) {
    return res.status(400).json({ message: "Thiếu user_id hoặc rating" });
  }

  ReviewModel.addReview(product_id, user_id, rating, comment, (err, result) => {
    if (err) {
      console.error("❌ Lỗi khi thêm review:", err);
      return res.status(500).json({ message: "Lỗi server", error: err.message });
    }
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

exports.getReviewsByProduct = (req, res) => {
  const productId = req.params.productId;
  console.log("📦 Đang lấy review cho sản phẩm:", productId);

  ReviewModel.getReviewsByProduct(productId, (err, results) => {
    if (err) {
      console.error("❌ Lỗi khi truy vấn review:", err);
      return res.status(500).json({ message: "Lỗi server", error: err.message });
    }
    res.json(results);
  });
};

exports.deleteReview = (req, res) => {
  const reviewId = req.params.id;
  ReviewModel.removeReview(reviewId, (err, result) => {
    if (err) {
      console.error("❌ Lỗi khi xóa review:", err);
      return res.status(500).json({ message: "Lỗi server", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy review để xóa" });
    }
    res.json({ message: "Đã xóa review" });
  });
};

exports.getAllReviews = (req, res) => {
  ReviewModel.getAllReviews((err, results) => {
    if (err) {
      console.error("❌ Lỗi khi lấy tất cả review:", err);
      return res.status(500).json({ message: "Lỗi server", error: err.message });
    }
    res.json(results);
  });
};
