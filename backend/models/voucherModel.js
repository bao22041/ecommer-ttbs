const db = require('../config/db');

exports.findByCode = (code) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM vouchers WHERE code = ?', [code], (err, rows) => {
    if (err) return reject(err);
    resolve(rows[0] || null);
  });
});

exports.incrementUsage = (id) => new Promise((resolve, reject) => {
  db.query('UPDATE vouchers SET used_count = used_count + 1 WHERE id = ?', [id], (err) => {
    if (err) return reject(err);
    resolve(true);
  });
});
