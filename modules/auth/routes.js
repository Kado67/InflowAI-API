// modules/auth/routes.js

import { Router } from "express";
import * as AuthController from "./controller.js";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/refresh", AuthController.refreshTokens);

export default router;
