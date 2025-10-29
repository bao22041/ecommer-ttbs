const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbotController");

// Endpoint chatbot
router.post("/chat", chatbotController.chatWithBot);
router.get("/ping", (req, res) => {
  res.json({ msg: "Chatbot route OK" });
});

module.exports = router;
