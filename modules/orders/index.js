import express from "express";
import Order from "./model.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
});

export default router;
