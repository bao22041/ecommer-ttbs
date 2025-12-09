const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');

// Load biến môi trường
dotenv.config();

// Kết nối DB
require('./config/db'); 

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');
const productImageRoutes = require("./routes/productImages");
const productSearchRoutes = require("./routes/productSearch");
const voucherRoutes = require('./routes/voucher');
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");
const orderItemRoutes = require("./routes/orderItems");
const reviewRoutes = require("./routes/reviews");
const notificationRoutes = require("./routes/notifications");
const adminReportRoutes = require("./routes/adminReports");
const userRoutes = require("./routes/users");
const chatbotRoutes = require("./routes/chatbot");

// Middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products/images', productImageRoutes);
app.use('/api/products/search', productSearchRoutes);
app.use('/api/products', productRoutes);
app.use('/api/vouchers', voucherRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-items', orderItemRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin/reports', adminReportRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chatbot", chatbotRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
