// modules/listings/routes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { verifyAccessToken } = require("../auth/service");

// İLAN MODELİ (Basit sürüm)
const ListingSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    images: [String],
    category: String,
    city: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", ListingSchema);

// KULLANICI DOĞRULAMA
function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Token yok" });
  }

  const token = header.split(" ")[1];
  const payload = verifyAccessToken(token);

  if (!payload) {
    return res.status(401).json({ success: false, message: "Token geçersiz" });
  }

  req.user = payload;
  next();
}

// ----------------------------
// 🟩 1) İLAN OLUŞTUR
// ----------------------------
router.post("/", requireAuth, async (req, res) => {
  try {
    const listing = await Listing.create({
      ...req.body,
      owner: req.user.sub, // ilan sahibini bağladık
    });

    res.json({ success: true, listing });
  } catch (err) {
    res.status(500).json({ success: false, message: "İlan oluşturulamadı." });
  }
});

// ----------------------------
// 🟩 2) TÜM İLANLARI LİSTELE
// ----------------------------
router.get("/", async (req, res) => {
  const listings = await Listing.find().sort({ createdAt: -1 });
  res.json({ success: true, listings });
});

// ----------------------------
// 🟩 3) TEK İLAN DETAY
// ----------------------------
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing)
      return res.status(404).json({ success: false, message: "İlan bulunamadı" });

    res.json({ success: true, listing });
  } catch {
    res.status(400).json({ success: false, message: "ID hatalı" });
  }
});

// ----------------------------
// 🟩 4) İLAN SİL (Sahibi veya Admin)
// ----------------------------
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing)
      return res.status(404).json({ success: false, message: "İlan bulunamadı" });

    const isOwner = listing.owner.toString() === req.user.sub;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res
        .status(403)
        .json({ success: false, message: "Bu ilanı silme yetkin yok." });
    }

    await listing.deleteOne();
    res.json({ success: true, message: "İlan silindi" });
  } catch {
    res.status(400).json({ success: false, message: "Silinemedi" });
  }
});

module.exports = router;
