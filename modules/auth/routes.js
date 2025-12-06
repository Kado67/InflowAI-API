// modules/auth/routes.js
import { Router } from "express";
import * as Controller from "./controller.js";
import { forgotPassword } from "./forgotController.js";
import { resetPassword } from "./resetController.js";

const router = Router();

/**
 * MÜŞTERİ + TEDARİKÇİ ORTAK LOGIN
 * Body: { email, password }
 * Dönen: token + user
 */
router.post("/login", Controller.login);

/**
 * KAYIT (Müşteri + Tedarikçi)
 * - Müşteri → role:user, status:active
 * - Tedarikçi → role:supplier, status:pending
 */
router.post("/register", Controller.register);

/**
 * ŞİFREMİ UNUTTUM
 * Body: { email }
 * İşlem:
 * - resetToken oluşturur
 * - 30 dk geçerli süre yazar
 * - Biz test amaçlı token'ı response içinde gösteriyoruz
 */
router.post("/forgot-password", forgotPassword);

/**
 * ŞİFRE SIFIRLAMA
 * Body: { token, password }
 * İşlem:
 * - Token geçerliyse yeni şifre kaydedilir
 */
router.post("/reset-password", resetPassword);

export default router;
