// modules/suppliers/routes.js

import { Router } from "express";
import Controller from "./controller.js";
import { verifyAccessToken } from "../auth/service.js";

const router = Router();

function requireAuth(req, res, next) {
  const header = req.headers["authorization"];
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Token yok" });
  }

  const token = header.split(" ")[1];
  const payload = verifyAccessToken(token);

  if (!payload) {
    return res.status(401).json({ success: false, message: "Token geçersiz" });
  }

  req.user = { id: payload.sub, role: payload.role };
  next();
}

/**
 * 🔸 Mağaza Aç formu (public)
 * POST /api/suppliers/register
 * Burada auth istemiyoruz; herkes başvuru gönderebilsin.
 * Controller.create, body'deki bilgileri kullanarak yeni bir kayıt açıyor.
 */
router.post("/register", Controller.create);

/**
 * 🔒 Aşağıdakiler sadece admin için (veya auth gerektiren endpointler)
 * /api/suppliers/
 */
router.post("/", requireAuth, Controller.create);
router.get("/", requireAuth, Controller.list);
router.get("/:id", requireAuth, Controller.get);
router.put("/:id", requireAuth, Controller.update);
router.delete("/:id", requireAuth, Controller.delete);

export default router;
