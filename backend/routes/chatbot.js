const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbotController");

router.post("/chat", chatbotController.chatWithBot);

// Ping test
router.get("/ping", (req, res) => {
  res.json({ status: "ok", msg: "Chatbot route is working" });
});

// Chat riêng cho sản phẩm
router.post("/chat/product", chatbotController.chatProduct);

// Chat riêng cho voucher
router.post("/chat/voucher", chatbotController.chatVoucher);

module.exports = router;
