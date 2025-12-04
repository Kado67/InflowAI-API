// modules/admin/routes.js
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL || "admin@inflowai.com"; // burayı istersen değiş
const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD || "InflowAI2025!"; // burayı da kendine göre değiş

const JWT_SECRET = process.env.JWT_SECRET || "SUPER_SECRET_KEY_DEGISTIR";

// POST /api/admin/login
router.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "E-posta ve şifre zorunludur." });
  }

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res
      .status(401)
      .json({ success: false, message: "Admin bilgileri hatalı." });
  }

  try {
    const token = jwt.sign(
      {
        role: "admin",
        email: ADMIN_EMAIL,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ success: true, token });
  } catch (err) {
    console.error("Admin login JWT hatası:", err.message);
    return res
      .status(500)
      .json({ success: false, message: "Giriş sırasında hata oluştu." });
  }
});

module.exports = router;
