// modules/wishlist/routes.js

import { Router } from "express";
import Controller from "./controller.js";
import { verifyAccessToken } from "../auth/service.js";

const router = Router();

function requireAuth(req, res, next) {
  const header = req.headers["authorization"];
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Token yok",
    });
  }

  const token = header.split(" ")[1];
  const payload = verifyAccessToken(token);

  if (!payload) {
    return res.status(401).json({
      success: false,
      message: "Token geçersiz",
    });
  }

  req.user = { id: payload.sub, role: payload.role };
  next();
}

// /api/wishlist

router.get("/", requireAuth, Controller.getMyWishlist);
router.post("/", requireAuth, Controller.add);
router.delete("/:productId", requireAuth, Controller.remove);
router.delete("/", requireAuth, Controller.clear);

export default router;
