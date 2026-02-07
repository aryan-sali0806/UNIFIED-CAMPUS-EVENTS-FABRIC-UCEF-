import { useState, useEffect } from "react";
import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";
import eventService from "../../services/eventService";

const Events = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await eventService.getEvents();
      console.log("Events fetched:", response);
      setEvents(response.data || []);
    } catch (err) {
      console.error("Error fetching events:", err);
      const errorMsg = typeof err === 'string' ? err : err.message || "Failed to load events";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true;
    return event.eventState.toLowerCase() === filter.toLowerCase();
  });

  const handleEventCreated = (newEvent) => {
    console.log("Event created/updated:", newEvent);
    if (!newEvent || !newEvent._id) {
      console.error("Invalid event object:", newEvent);
      setError("Event operation failed. Reloading...");
      // Refetch events after creating
      setTimeout(() => fetchEvents(), 1000);
      return;
    }
    
    if (editingEvent) {
      // Update existing event in list
      setEvents((prev) =>
        prev.map((e) => (e._id === newEvent._id ? newEvent : e))
      );
      setEditingEvent(null);
    } else {
      // Add new event to list
      setEvents((prev) => [newEvent, ...prev]);
    }
    
    setShowForm(false);
    setError("");
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const stats = {
    total: events.length,
    active: events.filter((e) => e.eventState === "LIVE").length,
    participants: events.reduce((sum, e) => sum + (e.participants?.length || 0), 0),
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-xl p-6 shadow">
          <p className="text-sm opacity-80">Total Events</p>
          <h2 className="text-3xl font-bold mt-2">{stats.total}</h2>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow">
          <p className="text-sm opacity-80">Active Events</p>
          <h2 className="text-3xl font-bold mt-2">{stats.active}</h2>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow">
          <p className="text-sm opacity-80">Total Participants</p>
          <h2 className="text-3xl font-bold mt-2">{stats.participants}</h2>
        </div>
      </div>

      {/* Create/Edit Event Form */}
      {showForm && (
        <EventForm
          editingEvent={editingEvent}
          onEventCreated={handleEventCreated}
          onCancel={() => {
            setShowForm(false);
            setEditingEvent(null);
          }}
        />
      )}

      {/* Events List */}
      <div className="bg-white rounded-xl p-6 shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Events Dashboard</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            {showForm ? "Hide Form" : "+ Add Event"}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <p className="text-slate-500">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-lg">
            <p className="text-slate-500 text-lg mb-3">No events created yet</p>
            <p className="text-slate-400 text-sm mb-4">
              Create your first event to get started!
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Create Event
            </button>
          </div>
        ) : (
          <>
            {/* Filter */}
            <div className="flex gap-2 mb-4">
              {["all", "CREATED", "LIVE", "COMPLETED", "ARCHIVED"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    filter === status
                      ? "bg-rose-500 text-white"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                >
                  {status === "all" ? "All Events" : status}
                </button>
              ))}
            </div>

            {/* Events Grid */}
            {filteredEvents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-500">
                  No events found with status: {filter}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    onUpdate={fetchEvents}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
  