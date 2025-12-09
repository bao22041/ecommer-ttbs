-- seed.sql
USE ecommerce_ttbs;

-- Products
INSERT INTO products (name, price)
SELECT * FROM (SELECT 'Laptop Dell XPS 13', 2500.00) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='Laptop Dell XPS 13');

INSERT INTO products (name, price)
SELECT * FROM (SELECT 'iPhone 15 Pro Max', 1200.00) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='iPhone 15 Pro Max');

INSERT INTO products (name, price)
SELECT * FROM (SELECT 'Tai nghe Sony WH-1000XM5', 350.00) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='Tai nghe Sony WH-1000XM5');

INSERT INTO products (name, price)
SELECT * FROM (SELECT 'Bàn phím cơ Keychron K2', 90.00) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name='Bàn phím cơ Keychron K2');

-- Vouchers
INSERT INTO vouchers (code, discount)
SELECT * FROM (SELECT 'SALE10', 10) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM vouchers WHERE code='SALE10');

INSERT INTO vouchers (code, discount)
SELECT * FROM (SELECT 'SALE20', 20) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM vouchers WHERE code='SALE20');

INSERT INTO vouchers (code, discount)
SELECT * FROM (SELECT 'FREESHIP', 0) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM vouchers WHERE code='FREESHIP');

-- categories
INSERT INTO categories (name, description)
VALUES
('Laptop', 'Thiết bị máy tính xách tay'),
('Smartphone', 'Điện thoại thông minh'),
('Phụ kiện', 'Các loại phụ kiện đi kèm'),
('Âm thanh', 'Tai nghe, loa, thiết bị audio'),
('Gaming', 'Thiết bị chuyên game')
ON DUPLICATE KEY UPDATE name = VALUES(name);


-- Admin user (⚠️ password plain text, nên hash trong Node.js)
INSERT INTO users (username, password, role)
VALUES ('admin', '123456', 'admin')
ON DUPLICATE KEY UPDATE role='admin';

INSERT INTO products (name, description, category_id, size, color, specs, price, stock, image_url)
VALUES
('Laptop Dell Inspiron 15', 'Laptop văn phòng', 1, '15 inch', 'Đen', 'CPU Intel i5, RAM 8GB, SSD 512GB', 15000000, 10, 'https://example.com/dell.jpg'),
('iPhone 14 Pro', 'Điện thoại cao cấp', 2, '6.1 inch', 'Tím', 'Chip A16 Bionic, RAM 6GB, 128GB Storage', 28000000, 5, 'https://example.com/iphone14.jpg'),
('Chuột Logitech M185', 'Chuột không dây', 3, 'Nhỏ', 'Xám', 'Kết nối USB Receiver, Pin AA', 350000, 50, 'https://example.com/mouse.jpg');

-- Thêm user khách hàng (giả sử id = 2)
INSERT INTO users (username, password, full_name, email, role)
SELECT * FROM (SELECT 'customer1', '123456', 'Nguyễn Văn A', 'a@example.com', 'customer') AS tmp
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='customer1');

-- Thêm review cho sản phẩm id = 1 (Laptop Dell XPS 13)
INSERT INTO reviews (product_id, user_id, rating, comment)
SELECT * FROM (SELECT 1, 2, 5, 'Sản phẩm rất tốt, chạy mượt và thiết kế đẹp') AS tmp
WHERE NOT EXISTS (
  SELECT 1 FROM reviews WHERE product_id = 1 AND user_id = 2
);

-- Thêm review cho sản phẩm id = 2 (iPhone 15 Pro Max)
INSERT INTO reviews (product_id, user_id, rating, comment)
SELECT * FROM (SELECT 2, 2, 4, 'iPhone đẹp nhưng hơi nóng khi chơi game') AS tmp
WHERE NOT EXISTS (
  SELECT 1 FROM reviews WHERE product_id = 2 AND user_id = 2
);

SELECT * FROM reviews WHERE product_id = 1;
DESCRIBE users;
INSERT INTO users (
  username,
  password,
  full_name,
  email,
  phone,
  address,
  avatar,
  role
)
VALUES (
  'le_test',
  '123456', -- nên hash trong thực tế
  'Lê Văn Test',
  'le.test@example.com',
  '0901234567',
  '123 Đường Trần Phú, Đà Nẵng',
  'https://example.com/avatar.jpg',
  'customer'
);
SELECT * FROM users WHERE username = 'le_test';
