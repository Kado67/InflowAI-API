// modules/adminSuppliers/routes.js
import { Router } from "express";
import User from "../users/model.js";
import { verifyAccessToken } from "../auth/service.js";

const router = Router();

// Admin doğrulama
function requireAdmin(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Token yok" });
  }

  const token = header.split(" ")[1];
  const payload = verifyAccessToken(token);

  if (!payload || payload.role !== "admin") {
    return res.status(403).json({ success: false, message: "Yetkisiz erişim" });
  }

  req.admin = payload;
  next();
}

// Bekleyen tedarikçiler
router.get("/pending", requireAdmin, async (req, res) => {
  const list = await User.find({ role: "supplier", status: "pending" });
  res.json({ success: true, suppliers: list });
});

// Tedarikçi onayla
router.post("/:id/approve", requireAdmin, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { status: "active" });
  res.json({ success: true, message: "Tedarikçi onaylandı" });
});

// Tedarikçi reddet / engelle
router.post("/:id/reject", requireAdmin, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { status: "blocked" });
  res.json({ success: true, message: "Tedarikçi reddedildi" });
});

export default router;
