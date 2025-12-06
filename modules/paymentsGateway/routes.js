// modules/paymentsGateway/routes.js
import { Router } from "express";
import { verifyAccessToken } from "../auth/service.js";
import { createPaymentSession, verifyPaymentStatus } from "./iyzico.js";

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

// Ödeme başlat
router.post("/create-session", requireUser, async (req, res) => {
  const session = await createPaymentSession(req.body);
  res.json(session);
});

// Ödeme sonucunu doğrula
router.post("/verify", async (req, res) => {
  const result = await verifyPaymentStatus(req.body.paymentId);
  res.json(result);
});

export default router;
