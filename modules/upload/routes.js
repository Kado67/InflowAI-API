// modules/upload/routes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { verifyAccessToken } = require("../auth/service");

// Cloudinary
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Multer: geçici upload
const upload = multer({ storage: multer.memoryStorage() });

// 🔐 Sadece supplier veya admin resim yükleyebilir
function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Token yok." });
  }

  const token = header.split(" ")[1];
  const payload = verifyAccessToken(token);

  if (!payload) {
    return res.status(401).json({ success: false, message: "Token geçersiz." });
  }

  req.user = payload;
  next();
}

// ➤ FOTOĞRAF YÜKLE (POST /api/upload/image)
router.post("/image", requireAuth, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Dosya bulunamadı." });
    }

    const base64file = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      "base64"
    )}`;

    const result = await cloudinary.uploader.upload(base64file, {
      folder: "inflowai",
    });

    return res.json({
      success: true,
      url: result.secure_url,
    });
  } catch (err) {
    console.error("Upload hatası:", err);
    return res
      .status(500)
      .json({ success: false, message: "Yükleme sırasında hata oluştu." });
  }
});

module.exports = router;
