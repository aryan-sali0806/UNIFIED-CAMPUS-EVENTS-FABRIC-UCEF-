import express from "express";
import {
  createEventController,
  publishEventController,
  completeEventController,
  archiveEventController,
} from "../controllers/eventController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleGuard from "../middleware/roleGuard.js";

const router = express.Router();

// Create event
router.post(
  "/",
  authMiddleware,
  roleGuard("organizer", "admin"),
  createEventController
);

// Publish event
router.post(
  "/:eventId/publish",
  authMiddleware,
  roleGuard("organizer", "admin"),
  publishEventController
);

// Complete event
router.post(
  "/:eventId/complete",
  authMiddleware,
  roleGuard("organizer", "admin"),
  completeEventController
);

// Archive event
router.post(
  "/:eventId/archive",
  authMiddleware,
  roleGuard("admin"),
  archiveEventController
);

export default router;
