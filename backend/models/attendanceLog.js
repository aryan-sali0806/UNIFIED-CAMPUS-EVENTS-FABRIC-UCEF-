import mongoose from "mongoose";

const roundProgressSchema = new mongoose.Schema(
  {
    roundNumber: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["QUALIFIED", "DISQUALIFIED", "NOT_ATTEMPTED"],
      default: "NOT_ATTEMPTED",
    },

    attended: {
      type: Boolean,
      default: false,
    },

    score: {
      type: Number, // optional (coding rounds, auctions, etc.)
    },
  },
  { _id: false }
);

const attendanceLogSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    roleInEvent: {
      type: String,
      enum: ["participant", "volunteer", "speaker", "organizer"],
      default: "participant",
    },

    registrationStatus: {
      type: String,
      enum: ["REGISTERED", "CANCELLED"],
      default: "REGISTERED",
    },

    attendanceStatus: {
      type: String,
      enum: ["NOT_MARKED", "PARTIAL", "PRESENT", "ABSENT"],
      default: "NOT_MARKED",
    },

    attendancePercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    roundsProgress: {
      type: [roundProgressSchema],
      default: [],
    },

    highestRoundQualified: {
      type: Number,
      default: 0,
    },

    isCertificateEligible: {
      type: Boolean,
      default: false,
    },

    certificateIssued: {
      type: Boolean,
      default: false,
    },

    certificateIssuedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// One user can have only one participation record per event
attendanceLogSchema.index({ event: 1, user: 1 }, { unique: true });

const AttendanceLog = mongoose.model("AttendanceLog", attendanceLogSchema);

export default AttendanceLog;

