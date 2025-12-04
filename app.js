const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const productRoutes = require("./modules/products/routes");
const userRoutes = require("./modules/users/routes");
const orderRoutes = require("./modules/orders/routes");
const supplierRoutes = require("./modules/suppliers/routes");

const feedRoutes = require("./feedRoutes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongo bağlandı"))
  .catch((err) => console.error(err));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api", feedRoutes);

app.get("/", (req, res) => {
  res.send("InflowAI API aktif");
});

module.exports = app;
