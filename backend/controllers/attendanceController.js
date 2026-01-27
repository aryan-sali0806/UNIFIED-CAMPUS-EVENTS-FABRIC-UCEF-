import {
    registerForEvent,
    markAttendance,
    updateRoundResult,
    evaluateCertificateEligibility,
  } from "../services/attendanceService.js";
  
  export const registerController = async (req, res) => {
    try {
      const { eventId } = req.body;
      const userId = req.user.id;
  
      const log = await registerForEvent(eventId, userId);
  
      res.status(201).json({
        success: true,
        message: "Registered successfully",
        data: log,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  export const markAttendanceController = async (req, res) => {
    try {
      const { eventId, attendanceMethod, attendancePercentage } = req.body;
      const userId = req.user.id;
  
      const log = await markAttendance(
        eventId,
        userId,
        attendanceMethod,
        attendancePercentage
      );
  
      res.status(200).json({
        success: true,
        message: "Attendance marked",
        data: log,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  export const updateRoundController = async (req, res) => {
    try {
      const { eventId, userId, roundNumber, status, score } = req.body;
  
      const log = await updateRoundResult(
        eventId,
        userId,
        roundNumber,
        status,
        score
      );
  
      res.status(200).json({
        success: true,
        message: "Round updated",
        data: log,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  export const certificateEvaluationController = async (req, res) => {
    try {
      const { eventId, userId } = req.body;
  
      const eligible = await evaluateCertificateEligibility(eventId, userId);
  
      res.status(200).json({
        success: true,
        message: "Certificate evaluated",
        eligible,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  