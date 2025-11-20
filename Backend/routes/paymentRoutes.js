// backend/routes/paymentRoutes.js
import express from "express";
import auth from "../middleware/authMiddleware.js";
import { createCheckoutSession } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-checkout-session", auth, createCheckoutSession);

export default router;
