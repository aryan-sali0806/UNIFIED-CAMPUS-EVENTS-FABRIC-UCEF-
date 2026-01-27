import mongoose from "mongoose";

const roundSchema = new mongoose.Schema(
  {
    roundNumber: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    mode: {
      type: String,
      enum: ["ONLINE", "OFFLINE"],
      required: true,
    },

    description: {
      type: String,
    },

    qualificationRule: {
      type: String,
      required: true,
      // eg: "Top 30%", "Top 10 teams", "Score >= 60"
    },
  },
  { _id: false }
);

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
      enum: ["workshop", "hackathon", "seminar", "cultural", "club", "competition"],
      required: true,
    },

    mode: {
      type: String,
      enum: ["ONLINE", "OFFLINE", "HYBRID"],
      required: true,
    },

    isTeamEvent: {
      type: Boolean,
      default: false,
    },

    maxTeamSize: {
      type: Number,
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

    rounds: {
      type: [roundSchema],
      default: [],
    },

    attendanceMethod: {
      type: String,
      enum: ["QR", "MANUAL", "OTP", "AUTO", "NONE"],
      default: "NONE",
    },

    certificatePolicy: {
      type: String,
      enum: ["ALL_PARTICIPANTS", "FINALISTS", "WINNERS_ONLY", "NONE"],
      default: "ALL_PARTICIPANTS",
    },

    prizePool: {
      type: Number,
      default: 0,
    },

    registrationFee: {
      type: Number,
      default: 0,
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

