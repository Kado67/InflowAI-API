import express from "express";
import Category from "./model.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, categories });
  } catch (err) {
    next(err);
  }
});

export default router;
