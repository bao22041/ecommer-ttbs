-- Tạo database
CREATE DATABASE IF NOT EXISTS ecommerce_ttbs 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE ecommerce_ttbs;

-- Bảng categories
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng users 
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  address TEXT,
  avatar VARCHAR(255),
  role ENUM('customer','admin') DEFAULT 'customer',
  city VARCHAR(100),
  state VARCHAR(100),
  zip VARCHAR(20),
  country VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng vouchers
CREATE TABLE IF NOT EXISTS vouchers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  discount INT NOT NULL,
  expiry_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng products
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category_id INT NOT NULL,
  size VARCHAR(50),
  color VARCHAR(50),
  specs TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  stock INT DEFAULT 0 CHECK (stock >= 0),
  image_url VARCHAR(255),
  brand VARCHAR(100),
  rating DECIMAL(2,1) DEFAULT 0.0,
  sold INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
);

-- Bảng product_images
CREATE TABLE IF NOT EXISTS product_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE
);

-- Bảng inventory
CREATE TABLE IF NOT EXISTS inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  quantity INT DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE
);

-- Bảng voucher_usage
CREATE TABLE IF NOT EXISTS voucher_usage (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  voucher_id INT NOT NULL,
  used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
  FOREIGN KEY (voucher_id) REFERENCES vouchers(id)
    ON DELETE CASCADE
);

-- Bảng orders
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  voucher_id INT,
  total DECIMAL(15,2) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(255) NOT NULL,
  status ENUM('pending','paid','shipped','completed','cancelled') DEFAULT 'pending',
  order_date DATE DEFAULT (CURRENT_DATE),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
  FOREIGN KEY (voucher_id) REFERENCES vouchers(id)
    ON DELETE SET NULL
);

-- Bảng order_items
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(15,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id)
    ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE
);

-- Bảng cart
CREATE TABLE IF NOT EXISTS cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

-- Bảng cart_items
CREATE TABLE IF NOT EXISTS cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  FOREIGN KEY (cart_id) REFERENCES cart(id)
    ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE
);

-- Bảng reviews
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

-- Bảng notifications
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255),
  description TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

-- Bảng chat_bot
CREATE TABLE IF NOT EXISTS chat_bot (
  id INT AUTO_INCREMENT PRIMARY KEY,
  conversation_id INT NULL, -- nhóm hội thoại, có thể mở rộng sau
  user_id INT NULL,
  product_id INT NULL,
  category_id INT NULL,
  voucher_id INT NULL,
  compared_product_id INT NULL,
  message_type ENUM('intro','compare','question','answer','voucher') NOT NULL,
  message TEXT NOT NULL,
  product_snapshot JSON,
  compared_snapshot JSON,
  voucher_snapshot JSON,
  status ENUM('new','processed','error') DEFAULT 'new',
  is_read BOOLEAN DEFAULT FALSE,
  device VARCHAR(50),
  language VARCHAR(10) DEFAULT 'vi',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Khóa ngoại
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  FOREIGN KEY (voucher_id) REFERENCES vouchers(id) ON DELETE SET NULL,
  FOREIGN KEY (compared_product_id) REFERENCES products(id) ON DELETE SET NULL,
  
  -- Index để tăng tốc truy vấn
  INDEX idx_chatbot_user (user_id),
  INDEX idx_chatbot_product (product_id),
  INDEX idx_chatbot_category (category_id),
  INDEX idx_chatbot_voucher (voucher_id),
  INDEX idx_chatbot_compared (compared_product_id)
);

