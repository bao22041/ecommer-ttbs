const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.post("/:productId", reviewController.addReview);
router.get("/:productId", reviewController.getReviewsByProduct);
router.get("/", reviewController.getAllReviews);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
