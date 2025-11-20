// backend/routes/appointmentRoutes.js
import express from "express";
import {
  createAppointment,
  getAppointmentsForUser,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createAppointment);
router.get("/", protect, getAppointmentsForUser);
router.patch("/:id/status", protect, updateAppointmentStatus);

export default router;
