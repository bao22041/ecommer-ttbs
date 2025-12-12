const ChatbotModel = require("../models/ChatbotModel");

// Hàm tiện ích để lưu log
const logToDatabase = (req, type, data, message) => {
  // Cắt chuỗi User-Agent vì DB chỉ cho phép tối đa 50 ký tự
  let deviceName = req.headers["user-agent"] || "unknown";
  if (deviceName.length > 50) deviceName = deviceName.substring(0, 50);

  const logData = {
    user_id: req.user?.id || null, // User ID (nếu có login)
    message_type: type,            // ENUM: 'intro', 'voucher', 'question'...
    message: message,
    device: deviceName,
    ...data
  };

  ChatbotModel.saveChatLog(logData, (err) => {
    if (err) console.error("⚠️ Lỗi lưu log chat_bot:", err.sqlMessage || err);
  });
};

// 1. Xử lý Voucher
const handleVoucherChat = (req, res, message) => {
  ChatbotModel.findVoucherByMessage(message, (err, vouchers) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ reply: "Lỗi hệ thống." });
    }

    if (vouchers.length > 0) {
      const v = vouchers[0];
      const reply = `Mã: ${v.code}\nGiảm: ${v.discount}%\nHSD: ${v.expiry_date ? v.expiry_date.toISOString().split('T')[0] : 'Không thời hạn'}`;
      
      // Lưu log: type 'voucher' khớp với ENUM
      logToDatabase(req, "voucher", { 
        voucher_id: v.id, 
        voucher_snapshot: JSON.stringify(v) 
      }, message);

      return res.json({ reply });
    }
    
    return res.json({ reply: "Không tìm thấy voucher nào phù hợp." });
  });
};

// 2. Xử lý Sản phẩm
const handleProductChat = (req, res, message) => {
  ChatbotModel.findProductByMessage(message, (err, products) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ reply: "Lỗi hệ thống." });
    }

    if (products.length > 0) {
      const p = products[0];
      // Format tiền tệ
      const priceFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price);
      
      const reply = `Sản phẩm: ${p.name}\nGiá: ${priceFormatted}\nThương hiệu: ${p.brand}\nTồn kho: ${p.stock}`;

      // Lưu log: type 'intro' khớp với ENUM
      logToDatabase(req, "intro", { 
        product_id: p.id,
        category_id: p.category_id,
        product_snapshot: JSON.stringify(p) 
      }, message);

      return res.json({ reply });
    }

    return res.json({ reply: "Xin lỗi, không tìm thấy sản phẩm này." });
  });
};

// --- EXPORTS ---

exports.chatVoucher = (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: "Vui lòng nhập nội dung." });
  handleVoucherChat(req, res, message);
};

exports.chatProduct = (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: "Vui lòng nhập tên sản phẩm." });
  handleProductChat(req, res, message);
};

exports.chatWithBot = (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: "Tôi có thể giúp gì?" });

  // Logic điều hướng
  if (/voucher|mã|khuyến mãi|discount/i.test(message)) {
    handleVoucherChat(req, res, message);
  } else {
    handleProductChat(req, res, message);
  }
};