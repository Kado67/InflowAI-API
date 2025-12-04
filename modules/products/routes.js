// modules/products/routes.js

const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { verifyAccessToken } = require("../auth/service");

// 🔥 ADMIN JWT KONTROLÜ
const adminAuth = require("../../middlewares/adminAuth");

// --------- NORMAL KULLANICI / SATICI İÇİN AUTH ---------
function requireAuth(req, res, next) {
  const header = req.headers["authorization"];
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Token yok.",
    });
  }

  const token = header.split(" ")[1];
  const payload = verifyAccessToken(token);

  if (!payload) {
    return res.status(401).json({
      success: false,
      message: "Token geçersiz.",
    });
  }

  req.user = { id: payload.sub, role: payload.role };
  next();
}

// --------- PUBLIC (HERKESE AÇIK) ---------
router.get("/", controller.listProducts);
router.get("/:productId", controller.getProduct);

// --------- SATICI / KULLANICI KORUMALI ---------
router.get("/me/list", requireAuth, controller.listSellerProducts);

// --------- ADMIN PANEL İÇİN (SADECE ADMIN TOKEN) ---------
router.post("/", adminAuth, controller.createProduct);
router.put("/:productId", adminAuth, controller.updateProduct);
router.delete("/:productId", adminAuth, controller.deleteProduct);

module.exports = router;
