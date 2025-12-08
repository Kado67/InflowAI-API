// app.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// ⭐ Ana modüller
const productRoutes  = require("./modules/products/routes");
const userRoutes     = require("./modules/users/routes");
const orderRoutes    = require("./modules/orders/routes");
const supplierRoutes = require("./modules/suppliers/routes");

// ⭐ Admin login & panel
const adminRoutes    = require("./modules/admin/routes");

// ⭐ Tedarikçi panel (ürün yükleme)
const supplierPanelRoutes = require("./modules/supplier/routes");

// ⭐ Upload (fotoğraf)
const uploadRoutes = require("./modules/upload/routes");

// ⭐ Admin tedarikçi onay sistemi
const adminSupplierRoutes = require("./modules/adminSuppliers/routes");

// ⭐ Sepet
const cartRoutes = require("./modules/cart/routes");

// ⭐ Ödeme (Iyzico)
const paymentsGatewayRoutes = require("./modules/paymentsGateway/routes");

// ⭐ XML feed
const feedRoutes = require("./feedRoutes");

// ⭐ KATEGORİLER (YENİ EKLENDİ!)
const categoriesRoutes = require("./modules/categories/routes");

const app = express();
app.use(express.json());
app.use(cors());

// --- ESM/CJS router wrapper ---
function wrapRouter(mod) {
  return mod && mod.default ? mod.default : mod;
}

// 🔥 MongoDB bağlanıyor
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB bağlandı"))
  .catch((err) => console.error("MongoDB hata:", err));


// ------------------------------------------------------
// 🔥 ROUTELAR — TÜM API BAĞLANTILARI
// ------------------------------------------------------

// Admin
app.use("/api/admin", wrapRouter(adminRoutes));

// Ürün, kullanıcı, sipariş, mağaza
app.use("/api/products",  wrapRouter(productRoutes));
app.use("/api/users",     wrapRouter(userRoutes));
app.use("/api/orders",    wrapRouter(orderRoutes));
app.use("/api/suppliers", wrapRouter(supplierRoutes));

// ⭐ KATEGORİ SYSTEMI — (FRONTEND ÇALIŞMASI İÇİN ZORUNLU)
app.use("/api/categories", wrapRouter(categoriesRoutes));

// Tedarikçi paneli (ürün yönetimi)
app.use("/api/supplier", wrapRouter(supplierPanelRoutes));

// Dosya yükleme
app.use("/api/upload", wrapRouter(uploadRoutes));

// Admin tedarikçi onay sistemi
app.use("/api/admin/suppliers", wrapRouter(adminSupplierRoutes));

// Sepet
app.use("/api/cart", wrapRouter(cartRoutes));

// Ödeme
app.use("/api/payments", wrapRouter(paymentsGatewayRoutes));

// XML feed
app.use("/api", wrapRouter(feedRoutes));

// ------------------------------------------------------

// Test endpoint
app.get("/", (req, res) => {
  res.send("InflowAI API aktif");
});

module.exports = app;
