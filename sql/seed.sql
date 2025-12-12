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

-- Admin user (⚠️ password plain text, nên hash trong Node.js)
INSERT INTO users (username, password, role)
VALUES ('admin', '123456', 'admin')
ON DUPLICATE KEY UPDATE role='admin';

INSERT INTO products (name, description, category, size, color, specs, price, stock, image_url)
VALUES
('Laptop Dell Inspiron 15', 'Laptop văn phòng', 'Laptop', '15 inch', 'Đen', 'CPU Intel i5, RAM 8GB, SSD 512GB', 15000000, 10, 'https://example.com/dell.jpg'),
('iPhone 14 Pro', 'Điện thoại cao cấp', 'Smartphone', '6.1 inch', 'Tím', 'Chip A16 Bionic, RAM 6GB, 128GB Storage', 28000000, 5, 'https://example.com/iphone14.jpg'),
('Chuột Logitech M185', 'Chuột không dây', 'Phụ kiện', 'Nhỏ', 'Xám', 'Kết nối USB Receiver, Pin AA', 350000, 50, 'https://example.com/mouse.jpg');
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
INSERT INTO categories (slug, description) VALUES
('dientu', 'Thiết bị điện tử'),
('dienlanh', 'Tủ lạnh, máy lạnh'),
('giadung', 'Đồ dùng gia đình'),
('dienthoai', 'Điện thoại & phụ kiện'),
('kythuatso', 'Máy ảnh, máy quay'),
('suckhoe', 'Thiết bị chăm sóc sức khỏe'),
('phukien', 'Phụ kiện điện tử');


INSERT INTO products (category_slug, name, slug, price, description) VALUES
('dientu', 'Laptop Dell Inspiron 15 3520 i5-1235U', 'laptop-dell-inspiron-15-3520', 15990000, '15.6" FHD, Intel Core i5-1235U, 16GB RAM, 512GB SSD'),
('dientu', 'MacBook Air M2 2022 8GB/256GB', 'macbook-air-m2-2022', 25990000, 'Chip Apple M2, màn hình Retina 13.6"'),
('dientu', 'Laptop Gaming ASUS ROG Strix G16', 'asus-rog-strix-g16', 42990000, 'Intel i7-13650HX, RTX 4060 8GB, 16GB RAM'),
('dientu', 'Máy tính bảng iPad Pro 11" M4 2024', 'ipad-pro-11-m4-2024', 28990000, 'Chip M4, 256GB, hỗ trợ Apple Pencil'),
('dientu', 'PC đồng bộ ASUS ExpertCenter i7', 'pc-asus-expertcenter-i7', 21990000, 'Core i7-13700, 16GB RAM, 1TB SSD'),
('dientu', 'Màn hình LG UltraGear 27" 144Hz', 'man-hinh-lg-ultragear-27', 6790000, 'IPS 27", 144Hz, 1ms'),
('dientu', 'Bàn phím cơ Keychron K8 Pro', 'ban-phim-keychron-k8-pro', 2190000, 'Switch Gateron, RGB, wireless');
INSERT INTO products (category_slug, name, slug, price, description) VALUES
('dienlanh', 'Tủ lạnh Samsung Inverter 208 lít RT20HAR8DBU', 'tu-lanh-samsung-208l', 7490000, 'Inverter tiết kiệm điện, làm lạnh đa chiều'),
('dienlanh', 'Máy lạnh Daikin Inverter 1HP FTKC25UAVMV', 'may-lanh-daikin-1hp', 10490000, 'Gas R32, lọc không khí PM2.5'),
('dienlanh', 'Tủ lạnh Hitachi 569 lít R-FM800PGV7', 'tu-lanh-hitachi-569l', 34990000, '6 cửa, công nghệ Aero-Care'),
('dienlanh', 'Máy lạnh LG Inverter 1.5HP V13API1', 'may-lanh-lg-1-5hp', 13490000, 'Dual Inverter, WiFi'),
('dienlanh', 'Tủ đông đứng Alaska 350 lít IF-350G', 'tu-dong-alaska-350l', 12490000, 'Ngăn đông mềm, inverter');
INSERT INTO products (category_slug, name, slug, price, description) VALUES
('giadung', 'Máy giặt LG Inverter 10kg FV1410S4W', 'may-giat-lg-10kg', 9490000, 'AI DD, Steam+, WiFi'),
('giadung', 'Nồi cơm điện tử Panasonic 1.8L SR-ZS185', 'noi-com-panasonic-1-8l', 2490000, 'Lòng nồi kim cương'),
('giadung', 'Máy lọc không khí Xiaomi Air Purifier 4 Pro', 'may-loc-khong-khi-xiaomi-4pro', 4490000, 'Lọc PM2.5, diện tích 60m²'),
('giadung', 'Quạt điều hòa Sunhouse SHD7725', 'quat-dieu-hoa-sunhouse', 2890000, 'Bình 40L, làm mát bằng hơi nước'),
('giadung', 'Bếp từ đôi Kangaroo KG498N', 'bep-tu-kangaroo-kg498n', 2690000, 'Mặt kính Schott Ceran');
INSERT INTO products (category_slug, name, slug, price, description) VALUES
('dienthoai', 'iPhone 16 Pro Max 256GB', 'iphone-16-pro-max-256gb', 34990000, 'Chip A18 Pro, camera 48MP'),
('dienthoai', 'Samsung Galaxy S25 Ultra 512GB', 'samsung-s25-ultra-512gb', 35990000, 'S-Pen, màn 6.9" Dynamic AMOLED'),
('dienthoai', 'Xiaomi 14T Pro 12GB/512GB', 'xiaomi-14t-pro', 16490000, 'Chip Dimensity 9300+, sạc 120W'),
('dienthoai', 'Tai nghe AirPods Pro 2', 'airpods-pro-2', 6290000, 'Chống ồn chủ động ANC'),
('dienthoai', 'Ốp lưng Spigen iPhone 16 Pro', 'op-lung-spigen-iphone16-pro', 690000, 'Chính hãng Spigen Ultra Hybrid');
INSERT INTO products (category_slug, name, slug, price, description) VALUES
('kythuatso', 'Máy ảnh Sony A7 IV Body', 'sony-a7iv', 52990000, 'Full-frame 33MP, quay 4K 60fps'),
('kythuatso', 'Canon EOS R6 Mark II', 'canon-r6-mark-ii', 55990000, '24MP, IBIS 8 stops'),
('kythuatso', 'DJI Mini 4 Pro Fly More Combo', 'dji-mini-4-pro-combo', 23990000, 'Dưới 249g, camera 48MP, tránh chướng ngại vật 360°'),
('kythuatso', 'Gimbal DJI RS 4 Pro', 'dji-rs4-pro', 17990000, 'Tải trọng 4.5kg, carbon fiber'),
('kythuatso', 'Ống kính Sony FE 24-70mm f/2.8 GM II', 'ong-kinh-sony-24-70-gm2', 48990000, 'Thế hệ II nhẹ hơn 20%');
INSERT INTO products (category_slug, name, slug, price, description) VALUES
('suckhoe', 'Máy đo huyết áp Omron HEM-7156', 'may-do-huyet-ap-omron-7156', 1290000, 'Công nghệ Intellisense'),
('suckhoe', 'Cân sức khỏe điện tử Xiaomi Mi Body Composition Scale 2', 'can-xiaomi-scale-2', 590000, 'Phân tích 13 chỉ số cơ thể'),
('suckhoe', 'Máy massage cổ SKG 4098E', 'may-massage-co-skg', 1890000, 'Xung điện TENS + nhiệt'),
('suckhoe', 'Nhiệt kế hồng ngoại Braun ThermoScan 7', 'nhiet-ke-braun-thermoscan7', 1790000, 'Đo tai chính xác cao'),
('suckhoe', 'Máy xông khí dung Beurer IH55', 'may-xong-beurer-ih55', 2290000, 'Công nghệ rung màng lưới');
INSERT INTO products (category_slug, name, slug, price, description) VALUES
('phukien', 'Pin dự phòng Anker PowerCore 20000mAh 22.5W', 'pin-anker-20000mah', 990000, 'PowerIQ 3.0, sạc nhanh PD'),
('phukien', 'Cáp USB-C to Lightning Anker PowerLine+ II 1.8m', 'cap-anker-powerline-1-8m', 490000, 'Chứng nhận MFi'),
('phukien', 'Chuột không dây Logitech MX Master 3S', 'chuot-logitech-mx-master-3s', 2490000, '8000 DPI, MagSpeed'),
('phukien', 'SSD di động Samsung T9 2TB', 'ssd-samsung-t9-2tb', 5490000, 'Tốc độ 2000MB/s, USB 3.2 Gen2x2'),
('phukien', 'Tai nghe chụp tai Sony WH-1000XM5', 'tai-nghe-sony-xm5', 7990000, 'ANC hàng đầu, pin 30h');