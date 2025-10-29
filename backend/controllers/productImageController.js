// controllers/productImageController.js
const ProductImageModel = require("../models/ProductImageModel");

// POST /api/products/:id/images
exports.addImage = (req, res) => {
  const { url } = req.body;
  const product_id = req.params.id;

  ProductImageModel.addImage(product_id, url, (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.status(201).json({
      id: result.insertId,
      product_id,
      url
    });
  });
};

// GET /api/products/:id/images
exports.getImagesByProduct = (req, res) => {
  ProductImageModel.getImagesByProduct(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json(results);
  });
};

// DELETE /api/products/images/:id
exports.deleteImage = (req, res) => {
  ProductImageModel.removeImage(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    res.json({ message: "Đã xóa ảnh" });
  });
};
