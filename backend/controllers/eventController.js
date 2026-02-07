import {
    createEvent,
    publishEvent,
    completeEvent,
    archiveEvent,
    updateEvent,
    getEventsByOrganizer,
    getEventById,
    getPublishedEvents,
  } from "../services/eventService.js";
  export const createEventController = async (req, res) => {
    try {
      const organizerId = req.user.id; // from auth middleware
      console.log("Creating event for organizer:", organizerId);
      console.log("Event data:", req.body);
      
      const event = await createEvent(req.body, organizerId);
  
      res.status(201).json({
        success: true,
        message: "Event created successfully",
        data: event,
      });
    } catch (error) {
      console.error("Event creation failed:", error);
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  export const getEventsController = async (req, res) => {
    try {
      const organizerId = req.user.id;
      const events = await getEventsByOrganizer(organizerId);

      res.status(200).json({
        success: true,
        message: "Events retrieved",
        data: events,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  export const getPublishedEventsController = async (req, res) => {
    try {
      const { eventType } = req.query;
      const events = await getPublishedEvents(eventType);

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
  };

  export const getEventController = async (req, res) => {
    try {
      const { eventId } = req.params;
      const event = await getEventById(eventId);

      res.status(200).json({
        success: true,
        message: "Event retrieved",
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
      const organizerId = req.user.id;
  
      const event = await archiveEvent(eventId, organizerId);
  
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
  
  export const updateEventController = async (req, res) => {
    try {
      const { eventId } = req.params;
      const organizerId = req.user.id;
      
      const event = await updateEvent(eventId, organizerId, req.body);
      
      res.status(200).json({
        success: true,
        message: "Event updated successfully",
        data: event,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  