import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import productRoutes from "./modules/products/routes.js";
import userRoutes from "./modules/users/routes.js";
import orderRoutes from "./modules/orders/routes.js";
import supplierRoutes from "./modules/suppliers/routes.js";

import feedRoutes from "./feedRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

// Mongo bağlan
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB bağlandı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api", feedRoutes);

app.get("/", (req, res) => {
  res.send("InflowAI API aktif");
});

export default app;
