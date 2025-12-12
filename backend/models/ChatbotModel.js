const db = require("../config/db");

const ChatbotModel = {
  findProductByMessage: (message, callback) => {
    const sql = `
      SELECT id, name, price, stock, brand, category_id, image_url, description 
      FROM products 
      WHERE name LIKE ? OR description LIKE ? 
      LIMIT 1
    `;
    const like = `%${message}%`;
    db.query(sql, [like, like], callback);
  },

  findVoucherByMessage: (message, callback) => {
    const sql = `
      SELECT * FROM vouchers 
      WHERE code LIKE ? OR discount LIKE ? 
      LIMIT 1
    `;
    const like = `%${message}%`;
    db.query(sql, [like, like], callback);
  },

  saveChatLog: (data, callback) => {
    const sql = `
      INSERT INTO chat_bot 
      (user_id, product_id, category_id, voucher_id, message_type, message, 
       product_snapshot, voucher_snapshot, device, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    
    const values = [
      data.user_id || null,
      data.product_id || null,
      data.category_id || null,
      data.voucher_id || null,
      data.message_type, 
      data.message,
      data.product_snapshot || null,
      data.voucher_snapshot || null,
      data.device || "unknown",
      "new" 
    ];

    db.query(sql, values, callback);
  }
};

module.exports = ChatbotModel;