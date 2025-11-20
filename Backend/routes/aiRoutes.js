// backend/routes/aiRoutes.js
import express from "express";
import { triage } from "../controllers/aiTriageController.js";

const router = express.Router();

router.post("/triage", triage);

export default router;
