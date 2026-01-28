import express from "express";
import {
  registerController,
  markAttendanceController,
  updateRoundController,
  certificateEvaluationController,
} from "../controllers/attendanceController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleGuard from "../middleware/roleGuard.js";

const router = express.Router();

// Student registers for an event
router.post(
  "/register",
  authMiddleware,
  roleGuard("student"),
  registerController
);

// Student marks attendance (QR / OTP / AUTO)
router.post(
  "/mark",
  authMiddleware,
  roleGuard("student"),
  markAttendanceController
);

// Organizer/Admin updates round result
router.post(
  "/round/update",
  authMiddleware,
  roleGuard("organizer", "admin"),
  updateRoundController
);

// Organizer/Admin evaluates certificate eligibility
router.post(
  "/certificate/evaluate",
  authMiddleware,
  roleGuard("organizer", "admin"),
  certificateEvaluationController
);

export default router;
