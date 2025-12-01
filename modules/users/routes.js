// modules/users/routes.js
// /api/users altında çalışan router

import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
} from "./controller.js";

const router = express.Router();

// İstersen buraya auth middleware ekleyebilirsin (şimdilik boş)
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", removeUser);

export default router;
