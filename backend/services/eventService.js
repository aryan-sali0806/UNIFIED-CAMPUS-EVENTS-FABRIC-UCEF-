import Event from "../models/event.js";

/**
 * Create a new event
 */
export const createEvent = async (eventData, organizerId) => {
  try {
    // Validate required fields
    if (!eventData.title || !eventData.description) {
      throw new Error("Title and description are required");
    }

    if (!eventData.startDate || !eventData.endDate) {
      throw new Error("Start and end dates are required");
    }

    // Parse dates if they're strings
    const startDate = new Date(eventData.startDate);
    const endDate = new Date(eventData.endDate);

    if (startDate >= endDate) {
      throw new Error("End date must be after start date");
    }

    // Create rounds array based on numberOfRounds
    const numberOfRounds = eventData.numberOfRounds || 1;
    const rounds = [];
    for (let i = 1; i <= numberOfRounds; i++) {
      rounds.push({
        roundNumber: i,
        name: `Round ${i}`,
        mode: eventData.mode || "HYBRID",
        description: `${eventData.title} - Round ${i}`,
        qualificationRule: "To be determined",
      });
    }

    const event = await Event.create({
      ...eventData,
      startDate,
      endDate,
      organizer: organizerId,
      eventState: "CREATED",
      isPublished: false,
      rounds: rounds,
    });

    console.log("Event created successfully:", event._id);
    return event;
  } catch (error) {
    console.error("Error creating event:", error.message);
    throw error;
  }
};

/**
 * Get all published events (for candidates to browse)
 */
export const getPublishedEvents = async (eventType = null) => {
  try {
    let query = { eventState: "LIVE", isPublished: true };
    
    if (eventType) {
      query.eventType = eventType.toLowerCase();
    }

    const events = await Event.find(query)
      .populate("organizer", "name email")
      .sort({ createdAt: -1 });
    
    return events;
  } catch (error) {
    console.error("Error fetching published events:", error.message);
    throw error;
  }
};

/**
 * Get all events by an organizer
 */
export const getEventsByOrganizer = async (organizerId) => {
  const events = await Event.find({ organizer: organizerId })
    .populate("organizer", "name email")
    .sort({ createdAt: -1 });
  
  return events;
};

/**
 * Get a single event by ID
 */
export const getEventById = async (eventId) => {
  const event = await Event.findById(eventId)
    .populate("organizer", "name email");
  
  if (!event) {
    throw new Error("Event not found");
  }
  
  return event;
};

/**
 * Publish an event (CREATED → LIVE)
 */
export const publishEvent = async (eventId, userRole) => {
  if (userRole !== "organizer" && userRole !== "admin") {
    throw new Error("Not authorized to publish event");
  }

  const event = await Event.findById(eventId);

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.eventState !== "CREATED") {
    throw new Error("Only CREATED events can be published");
  }

  event.eventState = "LIVE";
  event.isPublished = true;

  // Generate attendance token for QR code if QR method is selected
  if (event.attendanceMethod === "QR" && !event.attendanceToken) {
    const crypto = await import("crypto");
    event.attendanceToken = crypto.default.randomBytes(16).toString("hex");
  }

  await event.save();
  return event;
};

/**
 * Complete an event (LIVE → COMPLETED)
 */
export const completeEvent = async (eventId) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.eventState !== "LIVE") {
    throw new Error("Only LIVE events can be completed");
  }

  event.eventState = "COMPLETED";
  await event.save();

  return event;
};

/**
 * Archive an event (COMPLETED → ARCHIVED)
 */
export const archiveEvent = async (eventId, organizerId) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new Error("Event not found");
  }

  // Check authorization - organizer can only archive their own events
  if (event.organizer.toString() !== organizerId.toString()) {
    throw new Error("Not authorized to archive this event");
  }

  if (event.eventState !== "COMPLETED") {
    throw new Error("Only COMPLETED events can be archived. Please complete the event first.");
  }

  event.eventState = "ARCHIVED";
  await event.save();

  return event;
};

/**
 * Update an event (CREATED or LIVE state)
 */
export const updateEvent = async (eventId, organizerId, updateData) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.organizer.toString() !== organizerId.toString()) {
    throw new Error("You are not authorized to update this event");
  }

  if (event.eventState !== "CREATED" && event.eventState !== "LIVE") {
    throw new Error("Only CREATED or LIVE events can be edited");
  }

  // Validate dates if provided
  if (updateData.startDate && updateData.endDate) {
    const startDate = new Date(updateData.startDate);
    const endDate = new Date(updateData.endDate);
    if (startDate >= endDate) {
      throw new Error("End date must be after start date");
    }
  }

  // Update allowed fields
  const allowedFields = [
    "title",
    "description",
    "eventType",
    "mode",
    "startDate",
    "endDate",
    "isTeamEvent",
    "maxTeamSize",
    "attendanceMethod",
    "numberOfRounds",
    "certificatePolicy",
    "prizePool",
    "registrationFee",
  ];

  for (const field of allowedFields) {
    if (updateData[field] !== undefined) {
      event[field] = updateData[field];
    }
  }

  await event.save();
  return event;
};
