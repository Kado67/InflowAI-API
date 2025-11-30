// modules/auth/routes.js

import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  refreshTokensController,
  changePasswordController,
} from "./controller.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", registerController);

// POST /api/auth/login
router.post("/login", loginController);

// POST /api/auth/logout
router.post("/logout", logoutController);

// POST /api/auth/refresh
router.post("/refresh", refreshTokensController);

// POST /api/auth/change-password
router.post("/change-password", changePasswordController);

export default router;
