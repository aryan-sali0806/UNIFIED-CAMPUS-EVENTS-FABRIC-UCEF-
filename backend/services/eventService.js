import Event from "../models/event.js";

/**
 * Create a new event
 */
export const createEvent = async (eventData, organizerId) => {
  const event = await Event.create({
    ...eventData,
    organizer: organizerId,
    eventState: "CREATED",
    isPublished: false,
  });

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
export const archiveEvent = async (eventId) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.eventState !== "COMPLETED") {
    throw new Error("Only COMPLETED events can be archived");
  }

  event.eventState = "ARCHIVED";
  await event.save();

  return event;
};
