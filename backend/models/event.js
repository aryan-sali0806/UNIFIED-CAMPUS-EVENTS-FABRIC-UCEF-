import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    eventType: {
      type: String,
      enum: ["workshop", "hackathon", "seminar", "cultural", "club"],
      required: true,
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    eventState: {
      type: String,
      enum: ["CREATED", "LIVE", "COMPLETED", "ARCHIVED"],
      default: "CREATED",
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    attendanceMethod: {
      type: String,
      enum: ["QR", "MANUAL", "OTP", "AUTO"],
      required: true,
    },

    certificateRule: {
      minAttendancePercentage: {
        type: Number,
        default: 75,
      },
      mandatory: {
        type: Boolean,
        default: true,
      },
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
