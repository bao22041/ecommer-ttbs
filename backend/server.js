const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const voucherRoutes = require('./routes/voucher');
const authRoutes = require('./routes/auth');
const chatbotRoutes = require("./routes/chatbot");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");
const reviewRoutes = require("./routes/reviews");
const notificationRoutes = require("./routes/notifications");
const adminReportRoutes = require("./routes/adminReports");
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require("./routes/users");
const orderItemRoutes = require("./routes/orderItems");
const productImageRoutes = require("./routes/productImages");
const productSearchRoutes = require("./routes/productSearch");

require('dotenv').config();
require('./config/db'); 

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/vouchers', voucherRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin/reports', adminReportRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderItemRoutes); 
app.use("/api/products", productImageRoutes);
app.use("/api/products", productSearchRoutes);
app.use("/api/chatbot", chatbotRoutes);

// Middleware xử lý lỗi (luôn đặt cuối cùng)
app.use(errorHandler);
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
