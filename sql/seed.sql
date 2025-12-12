-- seed.sql
USE ecommerce_ttbs;

-- Vouchers
INSERT INTO vouchers (code, discount)
SELECT * FROM (SELECT 'SALE10', 10) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM vouchers WHERE code='SALE10');

INSERT INTO vouchers (code, discount)
SELECT * FROM (SELECT 'SALE20', 20) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM vouchers WHERE code='SALE20');

INSERT INTO vouchers (code, discount)
SELECT * FROM (SELECT 'SALE50', 50) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM vouchers WHERE code='SALE50');

INSERT INTO vouchers (code, discount)
SELECT * FROM (SELECT 'SALE70', 70) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM vouchers WHERE code='SALE70');

INSERT INTO vouchers (code, discount)
SELECT * FROM (SELECT 'SALE60', 60) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM vouchers WHERE code='SALE60');

INSERT INTO vouchers (code, discount)
SELECT * FROM (SELECT 'SALE15', 15) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM vouchers WHERE code='SALE15');


INSERT INTO categories (slug, name, description) VALUES
('dientu', 'Điện tử', 'Thiết bị điện tử'),
('dienlanh', 'Điện lạnh', 'Tủ lạnh, máy lạnh'),
('giadung', 'Gia dụng', 'Đồ dùng gia đình, máy tính & thiết bị văn phòng'),
('dienthoai', 'Điện thoại', 'Điện thoại & phụ kiện'),
('kythuatso', 'Kỹ thuật số', 'Máy ảnh, máy quay, giải trí'),
('suckhoe', 'Sức khỏe', 'Thiết bị chăm sóc sức khỏe'),
('phukien', 'Phụ kiện', 'Phụ kiện điện tử');
-- Điện tử (id=1)
INSERT INTO products (name, description, category_id, price, stock, image_url, brand, rating, sold) VALUES
('Smart TV LG 65"', 'Tivi thông minh OLED 4K', 1, 25990000, 25, 'pictures/big_smart-tivi-oled-lg-4k-65-inch-65gxpta.jpg', 'LG', 4.7, 60),
('Laptop HP Pavilion 15', 'Laptop học tập và làm việc', 1, 15990000, 40, 'pictures/laptop-hp-pavilion-15.jpg', 'HP', 4.4, 70),
('Loa Bluetooth JBL Charge 5', 'Loa di động chống nước', 1, 3990000, 100, 'pictures/JBL_Charge_5_Lifestyle1_904x560px.png', 'JBL', 4.6, 150),
('Máy chiếu Epson XGA', 'Máy chiếu văn phòng', 1, 12990000, 15, 'pictures/May-chieu-Epson-EB-X51.jpg', 'Epson', 4.5, 35),
('PlayStation 5', 'Máy chơi game Sony PS5', 1, 14990000, 20, 'pictures/may-ps5-slim-standardl-edition-korea-00.jpg', 'Sony', 4.9, 200),
('Xbox Series X', 'Máy chơi game Microsoft', 1, 13990000, 18, 'pictures/Xbox-Series-X.png', 'Microsoft', 4.8, 120),
('Tai nghe Bose QC45', 'Tai nghe chống ồn cao cấp', 1, 7990000, 30, 'pictures/Bose-QuietComfort-35-Wireless-Headphones-300x300.jpg', 'Bose', 4.7, 90),
('Máy tính bảng iPad Air 5', 'Tablet Apple 10.9 inch', 1, 16990000, 25, 'pictures/111887_sp866-ipad-air-5gen.png', 'Apple', 4.8, 110),
('Màn hình Dell UltraSharp 27"', 'Màn hình IPS 2K', 1, 8990000, 35, 'pictures/47445_dell_ultrasharp_u2724de_anphatcomputer_1.jpg', 'Dell', 4.6, 80),
('Router WiFi Asus AX86U', 'Router WiFi 6 tốc độ cao', 1, 5990000, 50, 'pictures/3306_ax86u_pro.jpg', 'Asus', 4.5, 70);


-- Điện lạnh (id=2)
INSERT INTO products (name, description, category_id, price, stock, image_url, brand, rating, sold) VALUES
('Máy giặt Samsung Inverter 9kg', 'Máy giặt cửa trước tiết kiệm điện', 2, 7990000, 25, 'pictures/may-giat-long-ngang-samsung-inverter-9kg-ww90t634dlesv.png', 'Samsung', 4.5, 70),
('Máy giặt LG 10kg', 'Máy giặt cửa trên, công nghệ TurboWash', 2, 8990000, 20, 'pictures/may_giat_LG.jpg', 'LG', 4.6, 65),
('Tủ đông Sanaky 200L', 'Tủ đông mini tiết kiệm điện', 2, 5990000, 15, 'pictures/250_4385_tu_dong_sanakt_mat_kinh_cuong_luc_3.jpg', 'Sanaky', 4.3, 40),
('Tủ mát Alaska 300L', 'Tủ mát trưng bày thực phẩm', 2, 10990000, 10, 'pictures/tu-mat-alaska-inverter-300-lit-lci-300dx-1-700x467.jpg', 'Alaska', 4.4, 35),
('Máy sấy quần áo Electrolux 8kg', 'Máy sấy cửa trước, công nghệ chống nhăn', 2, 6990000, 18, 'pictures/may_say_Quan_ao.jpg', 'Electrolux', 4.5, 50),
('Máy lọc không khí Sharp', 'Lọc bụi mịn PM2.5, khử mùi', 2, 4990000, 30, 'pictures/May_loc_khong_khi.jpg', 'Sharp', 4.6, 90),
('Máy hút ẩm FujiE HM-614EB', 'Công suất hút ẩm 14L/ngày', 2, 3990000, 25, 'Mayhutam.jpg', 'FujiE', 4.4, 55),
('Máy nước nóng Ariston 30L', 'Bình nước nóng gián tiếp', 2, 3490000, 20, 'pictures/maynuonong.jpg', 'Ariston', 4.5, 60),
('Máy lạnh Panasonic 1.5HP', 'Công nghệ Inverter, làm lạnh nhanh', 2, 9990000, 22, 'pictures/may-lanh-treo-tuong-panasonic-cu-cs-u12vkh-8-1-5hp-inverter-gas-r32.jpg', 'Panasonic', 4.6, 75),
('Tủ lạnh Toshiba 2 cửa 280L', 'Ngăn đông dưới, tiết kiệm điện', 2, 7990000, 18, 'pictures/tulanh.jpg', 'Toshiba', 4.5, 50);


-- Gia dụng (id=3)
INSERT INTO products (name, description, category_id, price, stock, image_url, brand, rating, sold) VALUES
('Bếp điện từ Sunhouse', 'Bếp đôi công suất 2000W', 3, 2590000, 40, 'pictures/bepdientudoi.jpg', 'Sunhouse', 4.4, 90),
('Máy xay sinh tố Philips', 'Cối xay thủy tinh 1.5L', 3, 1290000, 60, 'pictures/mayxaysinhto.jpg', 'Philips', 4.5, 120),
('Lò vi sóng Sharp 23L', 'Công suất 800W, nướng và hâm nóng', 3, 2290000, 35, 'pictures/lovisong.jpg', 'Sharp', 4.3, 80),
('Bình đun siêu tốc Kangaroo', 'Dung tích 1.8L, inox 304', 3, 490000, 100, 'pictures/amsieutoc.jpg', 'Kangaroo', 4.2, 150),
('Máy ép trái cây Panasonic', 'Ép chậm giữ nguyên dưỡng chất', 3, 2990000, 25, 'pictures/may-ep-trai-cay-panasonic-mj-68mwra.jpg', 'Panasonic', 4.6, 70),
('Quạt điện Asia', 'Quạt đứng 5 cánh, 55W', 3, 690000, 80, 'pictures/quat-dung-asiavina-turbo-x-vy629790-g.jpg', 'Asia', 4.3, 200),
('Bàn ủi Philips', 'Bàn ủi hơi nước 2200W', 3, 990000, 50, 'pictures/banui.jpg', 'Philips', 4.4, 95),
('Máy sấy tóc Panasonic', 'Công suất 1800W, nhiều chế độ', 3, 590000, 70, 'pictures/may-say-toc-1800w-panasonic-eh-nd37-p645.jpg', 'Panasonic', 4.5, 130),
('Máy lọc nước Karofi', 'Công nghệ RO 7 lõi lọc', 3, 4990000, 20, 'pictures/maylocnuoc.jpg', 'Karofi', 4.6, 60),
('Nồi chiên không dầu Lock&Lock', 'Dung tích 5.2L, công suất 1700W', 3, 3290000, 30, 'pictures/noi-chien-khong-dau-lock-lock-ejf151-trang.jpg', 'Lock&Lock', 4.7, 85);


-- Điện thoại (id=4)
INSERT INTO products (name, description, category_id, price, stock, image_url, brand, rating, sold) VALUES
('iPhone 15 Pro', 'Điện thoại cao cấp của Apple', 4, 29990000, 50, 'pictures/iphone-15-pro-max-gold-thumbnew-600x600.jpg', 'Apple', 4.8, 120),
('Samsung Galaxy S24 Ultra', 'Điện thoại flagship của Samsung', 4, 25990000, 40, 'pictures/samsungs24.jpg', 'Samsung', 4.7, 90),
('Xiaomi 14 Pro', 'Điện thoại cấu hình mạnh, giá tốt', 4, 18990000, 60, 'pictures/xiaomi-14-pro-600x600.jpg', 'Xiaomi', 4.6, 80),
('Oppo Find X7', 'Điện thoại chụp ảnh đẹp', 4, 17990000, 35, 'pictures/Oppo_Find_X7_Ultra.jpg', 'Oppo', 4.5, 70),
('Vivo V30', 'Điện thoại tầm trung, pin trâu', 4, 9990000, 70, 'pictures/vivov30.jpg', 'Vivo', 4.4, 60),
('Realme GT Neo 6', 'Điện thoại gaming giá rẻ', 4, 8990000, 80, 'pictures/realme.png', 'Realme', 4.3, 55),
('Google Pixel 9', 'Điện thoại Android gốc, camera AI', 4, 22990000, 25, 'pictures/ggpixel.jpg', 'Google', 4.7, 65),
('iPhone SE 2025', 'Điện thoại nhỏ gọn, giá hợp lý', 4, 12990000, 45, 'pictures/iPhone_SE.jpg', 'Apple', 4.5, 75),
('Samsung Galaxy Z Flip6', 'Điện thoại màn hình gập', 4, 30990000, 20, 'pictures/SamsungGalaxyZFlip6.jpg', 'Samsung', 4.6, 50),
('Xiaomi Redmi Note 14', 'Điện thoại phổ thông, giá rẻ', 4, 5990000, 100, 'pictures/XiaomiRedmiNote14.jpg', 'Xiaomi', 4.2, 150);


-- Kỹ thuật số (id=5)
INSERT INTO products (name, description, category_id, price, stock, image_url, brand, rating, sold) VALUES
('Máy ảnh Canon EOS R10', 'Máy ảnh kỹ thuật số chuyên nghiệp', 5, 22990000, 15, 'pictures/MayanhCanonEOSR10.jpg', 'Canon', 4.7, 40),
('GoPro Hero 12', 'Camera hành trình chống nước', 5, 12990000, 25, 'pictures/GoProHero12.jpg', 'GoPro', 4.6, 70),
('Máy quay Sony Handycam', 'Máy quay gia đình Full HD', 5, 9990000, 20, 'pictures/MayquaySonyHandycam.jpg', 'Sony', 4.5, 55),
('Loa Soundbar Samsung HW-Q800C', 'Loa soundbar Dolby Atmos', 5, 15990000, 18, 'pictures/LoaSoundbarSamsungHW-Q800C.jpg', 'Samsung', 4.6, 65),
('Máy ảnh Nikon Z50', 'Máy ảnh mirrorless APS-C', 5, 18990000, 12, 'pictures/MayanhNikonZ50.jpg', 'Nikon', 4.5, 50),
('Máy quay DJI Osmo Pocket 3', 'Camera cầm tay chống rung', 5, 12990000, 30, 'pictures/MayquayDJIOsmoPocket3.jpg', 'DJI', 4.7, 80),
('Loa Bluetooth Marshall Emberton II', 'Loa di động phong cách retro', 5, 4990000, 40, 'pictures/LoaBluetoothMarshall.jpg', 'Marshall', 4.8, 90),
('Máy ảnh Fujifilm X-S20', 'Máy ảnh mirrorless quay vlog', 5, 24990000, 10, 'pictures/FujifilmX-S20.jpg', 'Fujifilm', 4.6, 35),
('Máy quay Panasonic HC-VX1', 'Máy quay 4K chuyên nghiệp', 5, 15990000, 14, 'pictures/MayquayPanasonicHC-VX1.jpg', 'Panasonic', 4.5, 45),
('Loa Karaoke Arirang MK-36', 'Loa karaoke gia đình', 5, 7990000, 25, 'pictures/LoaKaraokeArirangMK-36.jpg', 'Arirang', 4.4, 60);


-- Sức khỏe (id=6)
INSERT INTO products (name, description, category_id, price, stock, image_url, brand, rating, sold) VALUES
('Máy massage cổ vai gáy', 'Thiết bị massage nhiệt và rung', 6, 1290000, 70, 'pictures/Maymassagerco.jpg', 'Xiaomi', 4.4, 150),
('Máy đo huyết áp Omron HEM-7120', 'Máy đo huyết áp tự động', 6, 890000, 60, 'pictures/MaydohuyetapOmronHEM-7120.jpg', 'Omron', 4.5, 100),
('Máy xông khí Philips', 'Máy xông khí dung cho trẻ em và người lớn', 6, 1590000, 40, 'pictures/MayxongkhiPhilips.jpg', 'Philips', 4.6, 80),
('Máy đo đường huyết Accu-Chek', 'Máy đo đường huyết cá nhân', 6, 990000, 50, 'pictures/MaydoduonghuyetAccu-Chek.jpg', 'Roche', 4.5, 70),
('Máy lọc không khí Coway', 'Lọc bụi mịn PM2.5, khử mùi', 6, 4990000, 30, 'pictures/MaylockhongkhiCoway.jpg', 'Coway', 4.7, 90),
('Máy massage chân Beurer FM90', 'Massage chân, nhiệt hồng ngoại', 6, 2990000, 25, 'pictures/Maymassagerchan.jpg', 'Beurer', 4.6, 60),
('Máy đo nồng độ oxy SPO2', 'Thiết bị đo SpO2 và nhịp tim', 6, 590000, 80, 'pictures/MaydonongdooxySPO2.jpg', 'Microlife', 4.4, 120),
('Máy tăm nước Panasonic EW1211', 'Vệ sinh răng miệng bằng tia nước', 6, 1990000, 40, 'pictures/MaytamnuocPanasonicEW1211.jpg', 'Panasonic', 4.6, 85),
('Máy massage mắt Xiaomi', 'Massage mắt, giảm căng thẳng', 6, 1590000, 35, 'pictures/maymassagermamt.jpg', 'Xiaomi', 4.5, 75),
('Cân sức khỏe điện tử Tanita', 'Cân đo trọng lượng và BMI', 6, 1290000, 50, 'pictures/CanTanita.jpg', 'Tanita', 4.5, 95);


-- Phụ kiện (id=7)
INSERT INTO products (name, description, category_id, price, stock, image_url, brand, rating, sold) VALUES
('Tai nghe Sony WF-1000XM5', 'Tai nghe chống ồn cao cấp', 7, 5990000, 40, 'pictures/TaingheSonyWF-1000XM5.jpg', 'Sony', 4.9, 90),
('Chuột Logitech MX Master 3S', 'Chuột không dây cao cấp', 7, 2490000, 80, 'pictures/ChuotLogitechMX Master3S.jpg', 'Logitech', 4.8, 120),
('Bàn phím cơ Keychron K2', 'Bàn phím cơ Bluetooth nhỏ gọn', 7, 1990000, 60, 'pictures/keychronk2.jpg', 'Keychron', 4.7, 100),
('Sạc dự phòng Anker 20000mAh', 'Sạc nhanh Power Delivery', 7, 1290000, 90, 'pictures/20000mAh.jpg', 'Anker', 4.6, 150),
('Ổ cứng di động WD 2TB', 'Ổ cứng HDD USB 3.0', 7, 1890000, 70, 'pictures/WD2TB.jpg', 'Western Digital', 4.5, 110),
('Thẻ nhớ SanDisk 128GB', 'Thẻ nhớ microSD tốc độ cao', 7, 690000, 120, 'pictures/SanDisk128GB.jpg', 'SanDisk', 4.6, 200),
('Webcam Logitech C920', 'Webcam Full HD cho hội nghị', 7, 2290000, 50, 'pictures/WebcamLogitechC920.jpg', 'Logitech', 4.7, 85),
('Loa Bluetooth Anker Soundcore', 'Loa di động chống nước IPX7', 7, 1590000, 100, 'pictures/LoaBluetoothAnkerSoundcore.jpg', 'Anker', 4.5, 140),
('Đồng hồ thông minh Amazfit GTR 4', 'Smartwatch theo dõi sức khỏe', 7, 3990000, 60, 'pictures/donghoAmazfitGTR4.jpg', 'Amazfit', 4.6, 95),
('Tai nghe Razer Kraken V3', 'Tai nghe gaming RGB', 7, 2490000, 40, 'pictures/TaingheRazerKrakenV3.jpg', 'Razer', 4.5, 70);

