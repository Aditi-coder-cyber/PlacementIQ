import express from "express";
import { getUsers, getStats } from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/stats", getStats);

export default router;
