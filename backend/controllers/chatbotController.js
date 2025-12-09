const ChatbotModel = require("../models/ChatbotModel");

exports.chatWithBot = (req, res) => {
  const { message } = req.body;
  const userId = req.user?.id || null; // nếu có đăng nhập

  ChatbotModel.findProductByMessage(message, (err, results) => {
    if (err) {
      console.error("❌ DB error:", err.sqlMessage || err);
      return res.status(500).json({ reply: "Có lỗi xảy ra khi tìm sản phẩm." });
    }

    if (results.length > 0) {
      const p = results[0];
      const reply = `Sản phẩm ${p.name}  
- Màu: ${p.color || "N/A"}  
- Kích cỡ: ${p.size || "N/A"}  
- Thông số kỹ thuật: ${p.specs || "N/A"}  
- Giá: ${p.price} VND  
- Tồn kho: ${p.stock} sản phẩm`;

      // Lưu hội thoại
      const log = {
        user_id: userId,
        product_id: p.id,
        message_type: "intro",
        message,
        product_snapshot: JSON.stringify(p),
        created_at: new Date()
      };
      ChatbotModel.saveChatLog(log, () => {});

      return res.json({ reply });
    } else {
      // Gợi ý sản phẩm nếu không tìm thấy
      ChatbotModel.suggestProducts(message, (err2, suggestions) => {
        if (err2) {
          console.error("❌ Suggestion error:", err2.sqlMessage || err2);
          return res.json({ reply: "Không tìm thấy sản phẩm và không thể gợi ý." });
        }

        if (suggestions.length > 0) {
          const names = suggestions.map(s => s.name).join(", ");
          return res.json({
            reply: `Không tìm thấy sản phẩm chính xác. Bạn có muốn xem: ${names}?`
          });
        } else {
          return res.json({ reply: "Xin lỗi, tôi chưa tìm thấy sản phẩm bạn hỏi." });
        }
      });
    }
  });
};
