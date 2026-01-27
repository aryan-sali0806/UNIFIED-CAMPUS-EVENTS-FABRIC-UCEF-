import {
    createEvent,
    publishEvent,
    completeEvent,
    archiveEvent,
  } from "../services/eventService.js";
  
  export const createEventController = async (req, res) => {
    try {
      const organizerId = req.user.id; // from auth
      const event = await createEvent(req.body, organizerId);
  
      res.status(201).json({
        success: true,
        message: "Event created",
        data: event,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  export const publishEventController = async (req, res) => {
    try {
      const { eventId } = req.params;
      const userRole = req.user.role;
  
      const event = await publishEvent(eventId, userRole);
  
      res.status(200).json({
        success: true,
        message: "Event published",
        data: event,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  export const completeEventController = async (req, res) => {
    try {
      const { eventId } = req.params;
  
      const event = await completeEvent(eventId);
  
      res.status(200).json({
        success: true,
        message: "Event completed",
        data: event,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  export const archiveEventController = async (req, res) => {
    try {
      const { eventId } = req.params;
  
      const event = await archiveEvent(eventId);
  
      res.status(200).json({
        success: true,
        message: "Event archived",
        data: event,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  