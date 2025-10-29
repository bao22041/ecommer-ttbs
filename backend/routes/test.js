// routes/test.js
const express = require('express');
const router = express.Router();

router.post('/echo', (req, res) => {
  console.log("Body nhận được:", req.body);
  res.json({ received: req.body });
});

module.exports = router;
