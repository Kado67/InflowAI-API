// middlewares/adminAuth.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "SUPER_SECRET_KEY_DEGISTIR";

module.exports = function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "Admin token bulunamadı." });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ success: false, message: "Token formatı geçersiz." });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || decoded.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Admin yetkisi bulunmuyor." });
    }

    // İstersen ileride kullanmak için:
    req.admin = decoded;

    return next();
  } catch (err) {
    console.error("Admin token doğrulama hatası:", err.message);
    return res
      .status(401)
      .json({ success: false, message: "Token geçersiz veya süresi dolmuş." });
  }
};
