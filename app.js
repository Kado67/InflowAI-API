// app.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const productRoutes  = require("./modules/products/routes");
const userRoutes     = require("./modules/users/routes");
const orderRoutes    = require("./modules/orders/routes");
const supplierRoutes = require("./modules/suppliers/routes");
const feedRoutes     = require("./feedRoutes");

// 👉 Admin giriş / yönetim
const adminRoutes    = require("./modules/admin/routes");

// 👉 Tedarikçi ürün paneli
const supplierPanelRoutes = require("./modules/supplier/routes");

// 👉 Resim upload sistemi
const uploadRoutes = require("./modules/upload/routes");

// 👉 Admin tarafı tedarikçi onay sistemi
const adminSupplierRoutes = require("./modules/adminSuppliers/routes");

// 👉 Admin tarafı ilan onay sistemi
const adminListingRoutes = require("./modules/adminListings/routes");

// 👉 Sepet sistemi
const cartRoutes = require("./modules/cart/routes");

// 👉 Ödeme geçidi (iyzico / vb)
const paymentsGatewayRoutes = require("./modules/paymentsGateway/routes");

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

// Genel API’ler
app.use("/api/admin",     wrapRouter(adminRoutes));          // Admin login / panel
app.use("/api/products",  wrapRouter(productRoutes));        // Ürünler (müşteri tarafı)
app.use("/api/users",     wrapRouter(userRoutes));           // Kullanıcı işlemleri
app.use("/api/orders",    wrapRouter(orderRoutes));          // Siparişler
app.use("/api/suppliers", wrapRouter(supplierRoutes));       // Mağaza başvuruları

// ⭐ Tedarikçi & upload ⭐
app.use("/api/supplier",  wrapRouter(supplierPanelRoutes));  // Tedarikçi panel ürün yönetimi
app.use("/api/upload",    wrapRouter(uploadRoutes));         // Fotoğraf yükleme

// ⭐ Admin yönetim modülleri ⭐
app.use("/api/admin/suppliers", wrapRouter(adminSupplierRoutes)); // Tedarikçi onay / ret
app.use("/api/admin/listings",  wrapRouter(adminListingRoutes));  // İlan onay / ret

// ⭐ Sepet & Ödeme ⭐
app.use("/api/cart",      wrapRouter(cartRoutes));               // Sepet işlemleri
app.use("/api/payments",  wrapRouter(paymentsGatewayRoutes));    // Ödeme oturumu / doğrulama

// XML feed
app.use("/api",           wrapRouter(feedRoutes));           // XML feed

// ------------------------------------------------------

app.get("/", (req, res) => {
  res.send("InflowAI API aktif");
});

module.exports = app;
