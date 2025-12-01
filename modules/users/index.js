import express from "express";
import User from "./model.js";

const router = express.Router();

// TÜM KULLANICILAR
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
});

// TEK KULLANICI
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
});

export default router;
