import express from "express";
import {
  registerController,
  markAttendanceController,
  updateRoundController,
  certificateEvaluationController,
  submitParticipationController,
} from "../controllers/attendanceController.js";
import { verifyQRCodeController } from "../controllers/qrCodeController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleGuard from "../middleware/roleGuard.js";

const router = express.Router();

// Student/Candidate registers for an event
router.post(
  "/register",
  authMiddleware,
  roleGuard("student", "candidate"),
  registerController
);

// Student/Candidate marks attendance (QR / OTP / AUTO)
router.post(
  "/mark",
  authMiddleware,
  roleGuard("student", "candidate"),
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

// Student/Candidate submits participation details
router.post(
  "/participation/submit",
  authMiddleware,
  roleGuard("student", "candidate"),
  submitParticipationController
);

// Student/Candidate marks attendance via QR code
router.post(
  "/qr/verify",
  authMiddleware,
  roleGuard("student", "candidate"),
  verifyQRCodeController
);

export default router;
