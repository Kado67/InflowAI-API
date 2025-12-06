// modules/adminListings/routes.js
import { Router } from "express";
import Listing from "../listings/model.js";
import { verifyAccessToken } from "../auth/service.js";

const router = Router();

function requireAdmin(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Token yok" });
  }

  const token = header.split(" ")[1];
  const payload = verifyAccessToken(token);

  if (!payload || payload.role !== "admin") {
    return res.status(403).json({ success: false, message: "Yetkisiz" });
  }

  next();
}

// Bekleyen ilanlar
router.get("/pending", requireAdmin, async (req, res) => {
  const pendingListings = await Listing.find({ status: "pending" });
  res.json({ success: true, listings: pendingListings });
});

// İlan onayla
router.post("/:id/approve", requireAdmin, async (req, res) => {
  await Listing.findByIdAndUpdate(req.params.id, { status: "active" });
  res.json({ success: true, message: "İlan onaylandı" });
});

// İlanı reddet
router.post("/:id/reject", requireAdmin, async (req, res) => {
  await Listing.findByIdAndUpdate(req.params.id, { status: "rejected" });
  res.json({ success: true, message: "İlan reddedildi" });
});

export default router;
