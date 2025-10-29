// backend/controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Đăng ký
exports.register = (req, res, next) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword],
    (err, result) => {
      if (err) return next(err);
      res.json({ message: 'Đăng ký thành công', id: result.insertId });
    }
  );
};

// Đăng nhập
exports.login = (req, res, next) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return next(err);
    if (results.length === 0) return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' });

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' });

    // Tạo JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Đăng nhập thành công',
      token,
      role: user.role
    });
  });
};
