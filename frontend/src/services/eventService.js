import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const eventService = {
  // Create a new event
  createEvent: async (eventData) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Creating event with data:", eventData);
      console.log("Token:", token ? "Present" : "Missing");
      
      const response = await axios.post(`${API_BASE}/events`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Event created response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Create event error:", error);
      const errorMsg = error.response?.data?.message || error.message || "Failed to create event";
      throw new Error(errorMsg);
    }
  },

  // Get all published events (for candidates to browse)
  getPublishedEvents: async (eventType = null) => {
    try {
      let url = `${API_BASE}/events/browse`;
      if (eventType) {
        url += `?eventType=${eventType}`;
      }
      const response = await axios.get(url);
      console.log("Published events response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Get published events error:", error);
      const errorMsg = error.response?.data?.message || error.message || "Failed to get published events";
      throw new Error(errorMsg);
    }
  },

  // Get all user's events
  getEvents: async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Fetching events with token:", token ? "Present" : "Missing");
      
      const response = await axios.get(`${API_BASE}/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Events response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Get events error:", error);
      const errorMsg = error.response?.data?.message || error.message || "Failed to get events";
      throw new Error(errorMsg);
    }
  },

  // Get single event
  getEvent: async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE}/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Publish event
  publishEvent: async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE}/events/${eventId}/publish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Complete event
  completeEvent: async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE}/events/${eventId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Archive event
  archiveEvent: async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE}/events/${eventId}/archive`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update event
  updateEvent: async (eventId, eventData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_BASE}/events/${eventId}`,
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Failed to update event";
      throw new Error(errorMsg);
    }
  },

  // Submit participation details
  submitParticipation: async (participationData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE}/attendance/participation/submit`,
        participationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Failed to submit participation details";
      throw new Error(errorMsg);
    }
  },

  // Register for event
  registerForEvent: async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE}/attendance/register`,
        { eventId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Failed to register for event";
      throw new Error(errorMsg);
    }
  },

  // Verify QR code attendance
  verifyQRCodeAttendance: async (eventId, attendanceToken) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE}/attendance/qr/verify`,
        { eventId, attendanceToken },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Failed to mark attendance";
      throw new Error(errorMsg);
    }
  },
};

export default eventService;
