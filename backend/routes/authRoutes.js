import express from "express";
import { signup, login, verifyOTP, enable2FA } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-2fa", verifyOTP);
router.post("/enable-2fa", authMiddleware, enable2FA);

export default router;
