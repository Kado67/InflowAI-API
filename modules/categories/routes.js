import { Router } from "express";
import Controller from "./controller.js";

const router = Router();

router.post("/", Controller.createCategory);
router.get("/", Controller.getAllCategories);
router.get("/:id", Controller.getCategory);
router.put("/:id", Controller.updateCategory);
router.delete("/:id", Controller.deleteCategory);

export default router;
