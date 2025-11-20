// backend/routes/prescriptionRoutes.js
import express from "express";
import auth from "../middleware/authMiddleware.js";
import { create, download } from "../controllers/prescriptionController.js";

const router = express.Router();

router.post("/", auth, create);
router.get("/:id/download", auth, download);

export default router;
