// app.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const productRoutes  = require("./modules/products/routes");
const userRoutes     = require("./modules/users/routes");
const orderRoutes    = require("./modules/orders/routes");
const supplierRoutes = require("./modules/suppliers/routes");
const feedRoutes     = require("./feedRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// --- BURASI ÖNEMLİ: ESM / CJS karışıklığını çözen wrapper ---
function wrapRouter(mod) {
  // Eğer { default: router } geldiyse default'u al, yoksa kendisini döndür
  return mod && mod.default ? mod.default : mod;
}
// ------------------------------------------------------

// Mongo bağlantısı (sen nasıl yazdıysan o kalsın)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB bağlandı"))
  .catch((err) => console.error("MongoDB hata:", err));

// Route eklemeleri
app.use("/api/products",  wrapRouter(productRoutes));
app.use("/api/users",     wrapRouter(userRoutes));
app.use("/api/orders",    wrapRouter(orderRoutes));
app.use("/api/suppliers", wrapRouter(supplierRoutes));
app.use("/api",           wrapRouter(feedRoutes));

app.get("/", (req, res) => {
  res.send("InflowAI API aktif");
});

module.exports = app;
