const ChatbotModel = require("../models/ChatbotModel");

exports.chatWithBot = (req, res) => {
  // Lấy message từ body request
  const { message } = req.body;

  // Gọi xuống model
  ChatbotModel.findProductByMessage(message, (err, results) => {
    if (err) {
      console.error("❌ DB error:", err.sqlMessage || err);
      return res.status(500).json({ reply: "Có lỗi xảy ra khi tìm sản phẩm." });
    }

    if (results.length > 0) {
      const p = results[0];
      return res.json({
        reply: `Sản phẩm ${p.name}  
- Màu: ${p.color || "N/A"}  
- Kích cỡ: ${p.size || "N/A"}  
- Thông số kỹ thuật: ${p.specs || "N/A"}  
- Giá: ${p.price} VND  
- Tồn kho: ${p.stock} sản phẩm`
      });
    } else {
      return res.json({ reply: "Xin lỗi, tôi chưa tìm thấy sản phẩm bạn hỏi." });
    }
  });
};
