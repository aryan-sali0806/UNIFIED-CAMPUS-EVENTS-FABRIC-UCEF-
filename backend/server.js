// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import Event from "./models/event.js";

// Route imports
import eventRoutes from "./routes/eventRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("UCEF Backend is running 🚀");
});

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/auth", authRoutes);

// Test route
app.get("/test-route", (req, res) => {
  res.json({ success: true, message: "Test route works!" });
});

// Public events endpoint (for candidates to see published events)
app.get("/api/public-events", async (req, res) => {
  try {
    const { eventType } = req.query;
    
    let query = { eventState: "LIVE", isPublished: true };
    if (eventType) {
      query.eventType = eventType.toLowerCase();
    }

    const events = await Event.find(query)
      .populate("organizer", "name email")
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: "Published events retrieved",
      data: events,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

