const db = require("../config/db");

const ProductModel = {
  getAll: (callback) => {
    db.query("SELECT * FROM products", callback);
  },
  create: (product, callback) => {
    const { name, price, stock } = product;
    db.query(
      "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
      [name, price, stock],
      callback
    );
  }
};

module.exports = ProductModel;
