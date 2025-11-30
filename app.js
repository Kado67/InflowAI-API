// app.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Ortak Ayarlar
dotenv.config();

const app = express();

// -----------------------------
//  MIDDLEWARE
// -----------------------------
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// -----------------------------
//  DATABASE
// -----------------------------
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Bağlantısı Başarılı"))
  .catch((err) => console.log("MongoDB Hatası:", err));

// -----------------------------
//  ROUTES
// -----------------------------
import authRoutes from "./modules/auth/index.js";
import userRoutes from "./modules/users/index.js";
import productRoutes from "./modules/products/index.js";
import categoryRoutes from "./modules/categories/index.js";
import orderRoutes from "./modules/orders/index.js";
import paymentRoutes from "./modules/payments/index.js";
import shippingRoutes from "./modules/shipping/index.js";
import supplierRoutes from "./modules/suppliers/index.js";
import reviewRoutes from "./modules/reviews/index.js";
import wishlistRoutes from "./modules/wishlist/index.js";
import couponRoutes from "./modules/coupons/index.js";
import notificationRoutes from "./modules/notifications/index.js";

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/notifications", notificationRoutes);

// -----------------------------
//  404 ENDPOINT KONTROLÜ
// -----------------------------
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Böyle bir endpoint yok.",
  });
});

// -----------------------------
//  HATA YAKALAMA
// -----------------------------
app.use((err, req, res, next) => {
  console.log("Hata:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Sunucu hatası",
  });
});

// -----------------------------
//  SERVER
// -----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API Çalışıyor → http://localhost:${PORT}`);
});

export default app;
