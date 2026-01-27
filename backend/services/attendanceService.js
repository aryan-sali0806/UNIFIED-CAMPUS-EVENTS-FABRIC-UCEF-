import AttendanceLog from "../models/attendanceLog.js";
import Event from "../models/event.js";

export const registerForEvent = async (eventId, userId) => {
    const event = await Event.findById(eventId);
  
    if (!event) {
      throw new Error("Event not found");
    }
  
    if (event.eventState !== "LIVE") {
      throw new Error("Registration is not open for this event");
    }
  
    const existing = await AttendanceLog.findOne({
      event: eventId,
      user: userId,
    });
  
    if (existing) {
      throw new Error("User already registered for this event");
    }
  
    // Initialize round progress
    const roundsProgress = event.rounds.map((round) => ({
      roundNumber: round.roundNumber,
      status: "NOT_ATTEMPTED",
      attended: false,
    }));
  
    const attendanceLog = await AttendanceLog.create({
      event: eventId,
      user: userId,
      registrationStatus: "REGISTERED",
      roundsProgress,
    });
  
    return attendanceLog;
  };

  
  export const markAttendance = async (
    eventId,
    userId,
    attendanceMethod,
    attendancePercentage = 100
  ) => {
    const event = await Event.findById(eventId);
    if (!event) throw new Error("Event not found");
  
    if (event.eventState !== "LIVE") {
      throw new Error("Attendance can only be marked for LIVE events");
    }
  
    if (event.attendanceMethod !== attendanceMethod) {
      throw new Error("Invalid attendance method for this event");
    }
  
    const log = await AttendanceLog.findOne({ event: eventId, user: userId });
    if (!log) throw new Error("User is not registered for this event");
  
    log.attendancePercentage = attendancePercentage;
  
    if (attendancePercentage >= 75) {
      log.attendanceStatus = "PRESENT";
    } else if (attendancePercentage > 0) {
      log.attendanceStatus = "PARTIAL";
    } else {
      log.attendanceStatus = "ABSENT";
    }
  
    await log.save();
    return log;
  };

  
  export const updateRoundResult = async (
    eventId,
    userId,
    roundNumber,
    status,
    score = null
  ) => {
    const log = await AttendanceLog.findOne({ event: eventId, user: userId });
    if (!log) throw new Error("Participation record not found");
  
    const round = log.roundsProgress.find(
      (r) => r.roundNumber === roundNumber
    );
  
    if (!round) {
      throw new Error("Invalid round number");
    }
  
    round.status = status;
    round.attended = true;
    if (score !== null) {
      round.score = score;
    }
  
    if (status === "QUALIFIED") {
      log.highestRoundQualified = Math.max(
        log.highestRoundQualified,
        roundNumber
      );
    }
  
    await log.save();
    return log;
  };

  
  export const evaluateCertificateEligibility = async (eventId, userId) => {
    const event = await Event.findById(eventId);
    const log = await AttendanceLog.findOne({ event: eventId, user: userId });
  
    if (!event || !log) {
      throw new Error("Invalid evaluation request");
    }
  
    let eligible = false;
  
    switch (event.certificatePolicy) {
      case "ALL_PARTICIPANTS":
        eligible = log.attendanceStatus !== "ABSENT";
        break;
  
      case "FINALISTS":
        eligible = log.highestRoundQualified === event.rounds.length;
        break;
  
      case "WINNERS_ONLY":
        eligible = log.highestRoundQualified === event.rounds.length;
        break;
  
      case "NONE":
        eligible = false;
        break;
    }
  
    log.isCertificateEligible = eligible;
    await log.save();
  
    return eligible;
  };

  
  export const finalizeParticipation = async (eventId) => {
    const event = await Event.findById(eventId);
    if (!event) throw new Error("Event not found");
  
    if (event.eventState !== "COMPLETED") {
      throw new Error("Event must be completed before finalization");
    }
  
    const logs = await AttendanceLog.find({ event: eventId });
  
    for (const log of logs) {
      await evaluateCertificateEligibility(eventId, log.user);
    }
  
    return true;
  };
  