import express from "express";
import {
  createEventController,
  getEventsController,
  getEventController,
  publishEventController,
  completeEventController,
  archiveEventController,
  updateEventController,
  getPublishedEventsController,
} from "../controllers/eventController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleGuard from "../middleware/roleGuard.js";

const router = express.Router();

// Get all published events (public - for candidates to browse)
router.get("/browse", getPublishedEventsController);

// Get all events for the organizer
router.get(
  "/",
  authMiddleware,
  roleGuard("organizer", "admin"),
  getEventsController
);

// Get single event
router.get(
  "/:eventId",
  authMiddleware,
  getEventController
);

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
  roleGuard("organizer", "admin"),
  archiveEventController
);

// Update event (edit)
router.put(
  "/:eventId",
  authMiddleware,
  roleGuard("organizer", "admin"),
  updateEventController
);

export default router;
