// modules/notifications/routes.js

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

// Kullanıcı işlemleri:
router.get("/", requireAuth, Controller.listMine);
router.post("/", requireAuth, Controller.create);
router.put("/:id/read", requireAuth, Controller.markAsRead);
router.put("/read/all", requireAuth, Controller.markAll);

// Admin:
router.post("/broadcast", requireAuth, Controller.sendToAll);

export default router;
