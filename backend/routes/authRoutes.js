import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { signup, login, verifyOTP, enable2FA } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ── Email / Password Auth ──────────────────────────────
router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-2fa", verifyOTP);
router.post("/enable-2fa", authMiddleware, enable2FA);

// ── Google OAuth ───────────────────────────────────────

// Step 1: Redirect to Google consent screen
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

// Step 2: Google redirects back here with the auth code
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${process.env.CLIENT_URL}/login?error=google_failed` }),
  (req, res) => {
    // Issue our own JWT with user info
    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Encode the user object for the redirect query param
    const user = encodeURIComponent(JSON.stringify({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar || null,
    }));

    // Redirect to frontend with token + user
    res.redirect(`${process.env.CLIENT_URL}/google-success?token=${token}&user=${user}`);
  }
);

export default router;
