// modules/admin/routes.js
const express = require("express");
// Diğer tüm token’larla aynı sistemi kullanalım:
const { generateAccessToken } = require("../auth/service");

const router = express.Router();

// ➤ Burada admin giriş bilgilerini belirliyoruz
// İstersen bunları .env içine taşırsın.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@inflowai.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "InflowAI2025!";

// ➤ POST /api/admin/login
router.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "E‑posta ve şifre gereklidir." });
  }

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res
      .status(401)
      .json({ success: false, message: "Admin bilgileri geçersiz." });
  }

  try {
    // TOKEN OLUŞTURUYORUZ (auth/service ile aynı format)
    const token = generateAccessToken({
      sub: "admin-root",      // sabit bir id; istersen "admin" da yazabilirsin
      role: "admin",
      email: ADMIN_EMAIL,
    });

    return res.json({
      success: true,
      token,
    });
  } catch (err) {
    console.error("Admin token üretim hatası:", err);
    return res
      .status(500)
      .json({ success: false, message: "Giriş sırasında hata oluştu." });
  }
});

module.exports = router;
