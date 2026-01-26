// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

// Route imports
/*import eventRoutes from "./routes/eventRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";*/

// Load environment variables
dotenv.config();

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
/*app.use("/api/events", eventRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);*/

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

