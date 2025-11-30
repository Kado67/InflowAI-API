// modules/payments/routes.js

import { Router } from "express";
import Controller from "./controller.js";
import { verifyAccessToken } from "../auth/service.js";

const router = Router();

function requireAuth(req, res, next) {
  const header = req.headers["authorization"];
  if (!header?.startsWith("Bearer "))
    return res.status(401).json({ success: false, message: "Token yok" });

  const token = header.split(" ")[1];
  const payload = verifyAccessToken(token);

  if (!payload)
    return res.status(401).json({ success: false, message: "Token geçersiz" });

  req.user = { id: payload.sub, role: payload.role };
  next();
}

// Kullanıcı
router.post("/", requireAuth, Controller.create);
router.get("/mine", requireAuth, Controller.myPayments);
router.get("/:id", requireAuth, Controller.get);

// Admin
router.get("/", requireAuth, Controller.allPayments);

// PayTR callback endpointleri
router.post("/success", Controller.paySuccess);
router.post("/fail", Controller.payFail);

export default router;
