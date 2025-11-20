// backend/routes/doctorRoutes.js
import express from "express";
import auth from "../middleware/authMiddleware.js";
import { createProfile, getApprovedDoctors, getById, approveDoctor } from "../controllers/doctorController.js";

const router = express.Router();

router.post("/profile", auth, createProfile);
router.get("/", getApprovedDoctors);
router.get("/:id", getById);
router.put("/approve/:id", auth, approveDoctor);

export default router;
