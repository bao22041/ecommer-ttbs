const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Đăng ký
exports.register = (req, res, next) => {
  const { username, password, email, full_name } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "Thiếu dữ liệu đăng ký" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [username, email],
    (err, results) => {
      if (err) return next(err);
      if (results.length > 0) {
        return res.status(400).json({ message: "Username hoặc email đã tồn tại" });
      }

      db.query(
        "INSERT INTO users (username, password, email, full_name) VALUES (?, ?, ?, ?)",
        [username, hashedPassword, email, full_name],
        (err, result) => {
          if (err) return next(err);
          res.status(201).json({ message: "Đăng ký thành công", id: result.insertId });
        }
      );
    }
  );
};

// Đăng nhập
exports.login = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Thiếu username hoặc password" });
  }

  db.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
    if (err) return next(err);
    if (results.length === 0) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    // Tạo JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
        full_name: user.full_name,
      },
    });
  });
};