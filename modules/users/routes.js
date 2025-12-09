// modules/users/routes.js
import { Router } from "express";
import * as Controller from "./controller.js";

const router = Router();

// 🔥 PUBLIC REGISTER – Yeni Üyelik
// POST /api/users/register
router.post("/register", Controller.register);

// LİSTELEME
// GET /api/users
router.get("/", Controller.getUsers);

// TEK KULLANICI
// GET /api/users/:id
router.get("/:id", Controller.getUser);

// ADMIN TARAFI İÇİN GENEL CREATE
// POST /api/users
router.post("/", Controller.createUser);

// GÜNCELLE
// PUT /api/users/:id
router.put("/:id", Controller.updateUser);

// SİL
// DELETE /api/users/:id
router.delete("/:id", Controller.removeUser);

export default router;
