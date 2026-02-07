import { useState } from "react";
import eventService from "../../services/eventService";

const EventCard = ({ event, onUpdate, onDelete, onEdit }) => {
  const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "LIVE":
        return "bg-green-100 text-green-800";
      case "CREATED":
        return "bg-yellow-100 text-yellow-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      case "ARCHIVED":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getModeColor = (mode) => {
    switch (mode) {
      case "ONLINE":
        return "text-blue-600";
      case "OFFLINE":
        return "text-rose-600";
      case "HYBRID":
        return "text-purple-600";
      default:
        return "text-slate-600";
    }
  };

  const handlePublish = async () => {
    if (window.confirm("Publish this event?")) {
      setLoading(true);
      try {
        await eventService.publishEvent(event._id);
        if (onUpdate) onUpdate();
      } catch (error) {
        console.error("Failed to publish event:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleComplete = async () => {
    if (window.confirm("Mark this event as completed?")) {
      setLoading(true);
      try {
        await eventService.completeEvent(event._id);
        if (onUpdate) onUpdate();
      } catch (error) {
        console.error("Failed to complete event:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleArchive = async () => {
    if (window.confirm("Archive this event?")) {
      setLoading(true);
      try {
        await eventService.archiveEvent(event._id);
        if (onUpdate) onUpdate();
      } catch (error) {
        console.error("Failed to archive event:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = () => {
    if (onEdit) onEdit(event);
  };

  return (
    <div className="border border-slate-200 rounded-lg p-4 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">{event.title}</h3>
          <p className="text-sm text-slate-600 mb-2 line-clamp-2">
            {event.description}
          </p>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.eventState)}`}>
          {event.eventState}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
        <div>
          <span className="text-slate-500">Type:</span>
          <span className="font-semibold capitalize ml-1">{event.eventType}</span>
        </div>
        <div>
          <span className="text-slate-500">Mode:</span>
          <span className={`font-semibold ml-1 ${getModeColor(event.mode)}`}>
            {event.mode}
          </span>
        </div>
        <div className="col-span-2">
          <span className="text-slate-500">📅</span>
          <span className="ml-1 text-xs">
            {formatDate(event.startDate)} - {formatDate(event.endDate)}
          </span>
        </div>
        {event.isTeamEvent && (
          <div className="col-span-2">
            <span className="text-slate-500">👥</span>
            <span className="ml-1 text-xs">
              Team Event • Max {event.maxTeamSize} members
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-3 border-t">
        {event.eventState === "CREATED" && (
          <button
            onClick={handlePublish}
            disabled={loading}
            className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-slate-400 text-white text-sm font-semibold py-1 px-3 rounded transition"
          >
            {loading ? "..." : "Publish"}
          </button>
        )}

        {event.eventState === "LIVE" && (
          <button
            onClick={handleComplete}
            disabled={loading}
            className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-400 text-white text-sm font-semibold py-1 px-3 rounded transition"
          >
            {loading ? "..." : "Complete"}
          </button>
        )}

        {event.eventState === "COMPLETED" && (
          <button
            onClick={handleArchive}
            disabled={loading}
            className="flex-1 bg-slate-400 hover:bg-slate-500 disabled:bg-slate-300 text-white text-sm font-semibold py-1 px-3 rounded transition"
          >
            {loading ? "..." : "Archive"}
          </button>
        )}

        {(event.eventState === "CREATED" || event.eventState === "LIVE") && (
          <button 
            onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-1 px-3 rounded transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
