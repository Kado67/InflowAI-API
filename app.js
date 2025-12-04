// app.js — InflowAI API
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Express oluştur
const app = express();

// Body parser
app.use(express.json());
app.use(cors());

// MongoDB bağlan
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB bağlandı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

// Modüller
const productRoutes = require("./modules/products/routes");
const userRoutes = require("./modules/users/routes");
const orderRoutes = require("./modules/orders/routes");
const supplierRoutes = require("./modules/suppliers/routes");

// **XML PRODUCT FEED ROUTE**
const feedRoutes = require("./feedRoutes");

// API routing
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api", feedRoutes); // XML LINK BURADA

// Test root
app.get("/", (req, res) => {
  res.send("InflowAI API aktif");
});

module.exports = app;
