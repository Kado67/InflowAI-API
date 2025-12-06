// modules/cart/routes.js
import { Router } from "express";
import { verifyAccessToken } from "../auth/service.js";
import Product from "../products/model.js";

const router = Router();

function requireUser(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
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

let carts = {}; // geçici RAM sepeti (ileride DB yapılır)

// Sepeti getir
router.get("/", requireUser, (req, res) => {
  const cart = carts[req.user.sub] || [];
  res.json({ success: true, items: cart });
});

// Sepete ekle
router.post("/add", requireUser, async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ success: false, message: "Ürün yok" });
  }

  if (!carts[req.user.sub]) carts[req.user.sub] = [];

  carts[req.user.sub].push({
    productId,
    quantity,
    price: product.price,
    supplier: product.supplier,
  });

  res.json({ success: true, message: "Sepete eklendi" });
});

// Sepeti temizle
router.post("/clear", requireUser, (req, res) => {
  carts[req.user.sub] = [];
  res.json({ success: true, message: "Sepet temizlendi" });
});

export default router;
