// app.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const productRoutes  = require("./modules/products/routes");
const userRoutes     = require("./modules/users/routes");
const orderRoutes    = require("./modules/orders/routes");
const supplierRoutes = require("./modules/suppliers/routes");
const feedRoutes     = require("./feedRoutes");

// 👉 YENİ EKLEDİĞİMİZ ADMIN ROUTE
const adminRoutes    = require("./modules/admin/routes");

// 👉 Tedarikçi ürün paneli (YENİ EKLEDİK)
const supplierPanelRoutes = require("./modules/supplier/routes");

// 👉 Resim upload sistemi (YENİ EKLEDİK)
const uploadRoutes = require("./modules/upload/routes");

const app = express();
app.use(express.json());
app.use(cors());

// --- BURASI ÖNEMLİ: ESM / CJS karışıklığını çözen wrapper ---
function wrapRouter(mod) {
  return mod && mod.default ? mod.default : mod;
}
// ------------------------------------------------------

// Mongo bağlantısı
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB bağlandı"))
  .catch((err) => console.error("MongoDB hata:", err));

// ------------------------------------------------------
// 🔥 ROUTELAR — TÜM SİSTEMİN TAM BAĞLANTISI
// ------------------------------------------------------

app.use("/api/admin",     wrapRouter(adminRoutes));          // Admin giriş
app.use("/api/products",  wrapRouter(productRoutes));        // Ürünler (müşteri tarafı)
app.use("/api/users",     wrapRouter(userRoutes));           // Kullanıcı
app.use("/api/orders",    wrapRouter(orderRoutes));          // Siparişler
app.use("/api/suppliers", wrapRouter(supplierRoutes));       // Mağaza açma formu

// ⭐ YENİ EKLENENLER ⭐
app.use("/api/supplier",  wrapRouter(supplierPanelRoutes));  // Tedarikçi panel ürün yönetimi
app.use("/api/upload",    wrapRouter(uploadRoutes));         // Fotoğraf yükleme

app.use("/api",           wrapRouter(feedRoutes));           // XML feed

// ------------------------------------------------------

app.get("/", (req, res) => {
  res.send("InflowAI API aktif");
});

module.exports = app;
