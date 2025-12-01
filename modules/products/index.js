import express from "express";
import Product from "./model.js";

const router = express.Router();

// TÜM ÜRÜNLER
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (err) {
    next(err);
  }
});

export default router;
