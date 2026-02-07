import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ParticipationForm from "../components/ParticipationForm";
import eventService from "../services/eventService";
import { Calendar, MapPin, Users, Zap } from "lucide-react";

const Hackathons = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showParticipationForm, setShowParticipationForm] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await eventService.getPublishedEvents("hackathon");
        setEvents(response.data || []);
      } catch (err) {
        console.error("Error fetching hackathons:", err);
        setError(err.message || "Failed to load hackathons");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleParticipate = async (event) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("role");
    
    console.log("Participate button clicked");
    console.log("Token:", token ? "Present" : "Missing");
    console.log("User ID:", userId);
    console.log("User Role:", userRole);
    console.log("Event ID:", event._id);
    
    if (!token || !userId) {
      setError("Please log in to participate");
      return;
    }
    
    try {
      // First register for the event
      await eventService.registerForEvent(event._id);
      
      // Then show the participation form
      setSelectedEvent(event);
      setShowParticipationForm(true);
    } catch (err) {
      const errorMsg = typeof err === 'string' ? err : err.message || "Error registering for event";
      setError(errorMsg);
      console.error("Registration error full:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
    }
  };

  const handleParticipationSubmit = () => {
    setShowParticipationForm(false);
    setSelectedEvent(null);
    alert("Participation details submitted successfully! 🎉");
  };

  return (
    <div className="flex w-full">
      <Sidebar />
      <main className="flex-1 px-10 py-8">
        <Header />

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-2">Hackathons 🏆</h2>
          <p className="text-slate-600 mb-8">
            Participate in exciting hackathons and showcase your skills
          </p>

          {loading && <div className="text-center py-12">Loading hackathons...</div>}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {!loading && events.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No hackathons available yet
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 border border-slate-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-900 flex-1">
                    {event.title}
                  </h3>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                    {event.eventType}
                  </span>
                </div>

                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2 mb-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(event.startDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {event.mode}
                  </div>
                  {event.isTeamEvent && (
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      Up to {event.maxTeamSize} members per team
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-4 p-2 bg-slate-50 rounded-lg">
                  <Zap size={16} className="text-yellow-500" />
                  <span className="text-sm text-slate-700">
                    {event.numberOfRounds || event.rounds?.length || 0} rounds
                  </span>
                </div>

                <button 
                  onClick={() => handleParticipate(event)}
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition">
                  Participate Now
                </button>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </main>

      {showParticipationForm && selectedEvent && (
        <ParticipationForm
          event={selectedEvent}
          onSubmit={handleParticipationSubmit}
          onCancel={() => {
            setShowParticipationForm(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
};

export default Hackathons;
