import express from "express";
import { login, register, logout, refreshTokens } from "./service.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res, next) => {
  try {
    const data = await register(req.body);
    res.json({ success: true, ...data });
  } catch (err) {
    next(err);
  }
});

// LOGIN
router.post("/login", async (req, res, next) => {
  try {
    const data = await login({
      ...req.body,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
    });
    res.json({ success: true, ...data });
  } catch (err) {
    next(err);
  }
});

// LOGOUT
router.post("/logout", async (req, res, next) => {
  try {
    await logout(req.body.userId, req.body.refreshToken);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// REFRESH TOKEN
router.post("/refresh", async (req, res, next) => {
  try {
    const data = await refreshTokens(
      req.body.refreshToken,
      req.headers["user-agent"],
      req.ip
    );
    res.json({ success: true, ...data });
  } catch (err) {
    next(err);
  }
});

export default router;
