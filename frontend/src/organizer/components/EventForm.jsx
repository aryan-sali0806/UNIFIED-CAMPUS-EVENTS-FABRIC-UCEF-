import { useState, useEffect } from "react";
import eventService from "../../services/eventService";

const EventForm = ({ onEventCreated, onCancel, editingEvent }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "hackathon",
    mode: "HYBRID",
    startDate: "",
    endDate: "",
    isTeamEvent: false,
    maxTeamSize: 1,
    attendanceMethod: "NONE",
    numberOfRounds: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title,
        description: editingEvent.description,
        eventType: editingEvent.eventType,
        mode: editingEvent.mode,
        startDate: formatDateForInput(editingEvent.startDate),
        endDate: formatDateForInput(editingEvent.endDate),
        isTeamEvent: editingEvent.isTeamEvent,
        maxTeamSize: editingEvent.maxTeamSize || 1,
        attendanceMethod: editingEvent.attendanceMethod,
        numberOfRounds: editingEvent.numberOfRounds || 1,
      });
    }
  }, [editingEvent]);

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Validate dates
      if (new Date(formData.startDate) >= new Date(formData.endDate)) {
        setError("End date must be after start date");
        setLoading(false);
        return;
      }

      let response;
      if (editingEvent) {
        response = await eventService.updateEvent(editingEvent._id, formData);
      } else {
        response = await eventService.createEvent(formData);
      }
      const createdEvent = response.data;
      
      setSuccess(editingEvent ? "Event updated successfully! 🎉" : "Event created successfully! 🎉");
      
      if (!editingEvent) {
        setFormData({
          title: "",
          description: "",
          eventType: "hackathon",
          mode: "HYBRID",
          startDate: "",
          endDate: "",
          isTeamEvent: false,
          maxTeamSize: 1,
          attendanceMethod: "NONE",
          numberOfRounds: 1,
        });
      }

      if (onEventCreated) {
        onEventCreated(createdEvent);
      }

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      const errorMsg = typeof err === 'string' ? err : err.message || err.errors?.message || "Failed to process event";
      setError(errorMsg);
      console.error("Event operation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {editingEvent ? "Edit Event" : "Create New Event"}
        </h2>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-slate-500 hover:text-slate-700 text-2xl"
          >
            ✕
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Event Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Codigo Hackathon 2024"
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Event Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your event in detail..."
            required
            rows="4"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        {/* Event Type & Mode */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Event Type *
            </label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="workshop">Workshop</option>
              <option value="hackathon">Hackathon</option>
              <option value="seminar">Seminar</option>
              <option value="cultural">Cultural</option>
              <option value="club">Club</option>
              <option value="competition">Competition</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Mode *
            </label>
            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="ONLINE">Online</option>
              <option value="OFFLINE">Offline</option>
              <option value="HYBRID">Hybrid</option>
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Start Date *
            </label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              End Date *
            </label>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        {/* Team Event */}
        <div className="border-t pt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isTeamEvent"
              checked={formData.isTeamEvent}
              onChange={handleChange}
              className="w-4 h-4 rounded border-slate-300"
            />
            <span className="ml-2 text-sm font-semibold">Is Team Event</span>
          </label>

          {formData.isTeamEvent && (
            <div className="mt-3">
              <label className="block text-sm font-semibold mb-2">
                Max Team Size
              </label>
              <input
                type="number"
                name="maxTeamSize"
                value={formData.maxTeamSize}
                onChange={handleChange}
                min="2"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          )}
        </div>

        {/* Number of Rounds (for Hackathons) */}
        {formData.eventType === "hackathon" && (
          <div>
            <label className="block text-sm font-semibold mb-2">
              Number of Rounds *
            </label>
            <input
              type="number"
              name="numberOfRounds"
              value={formData.numberOfRounds}
              onChange={handleChange}
              min="1"
              max="5"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <p className="text-xs text-slate-500 mt-1">
              Specify how many rounds your hackathon will have (1-5)
            </p>
          </div>
        )}

        {/* Attendance Method */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Attendance Method
          </label>
          <select
            name="attendanceMethod"
            value={formData.attendanceMethod}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="NONE">None</option>
            <option value="QR">QR Code</option>
            <option value="MANUAL">Manual</option>
            <option value="OTP">OTP</option>
            <option value="AUTO">Auto</option>
          </select>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-400 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            {loading ? (editingEvent ? "Updating..." : "Creating...") : (editingEvent ? "Update Event" : "Create Event")}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EventForm;
