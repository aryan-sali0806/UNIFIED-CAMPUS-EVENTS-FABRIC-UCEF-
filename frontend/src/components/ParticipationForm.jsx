import { useState } from "react";
import { X, Plus } from "lucide-react";
import eventService from "../services/eventService";

const ParticipationForm = ({ event, user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    teamName: "",
    teamMembers: event?.isTeamEvent ? [{ name: "", email: "", rollNumber: "", department: "", year: "" }] : [],
    description: "",
    ideaTitle: event?.eventType === "hackathon" ? "" : undefined,
    techStack: event?.eventType === "hackathon" ? "" : undefined,
    githubLink: event?.eventType === "hackathon" ? "" : undefined,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      teamMembers: updatedMembers,
    }));
  };

  const addTeamMember = () => {
    if (formData.teamMembers.length < event.maxTeamSize) {
      setFormData((prev) => ({
        ...prev,
        teamMembers: [
          ...prev.teamMembers,
          { name: "", email: "", rollNumber: "", department: "", year: "" },
        ],
      }));
    }
  };

  const removeTeamMember = (index) => {
    if (formData.teamMembers.length > 1) {
      setFormData((prev) => ({
        ...prev,
        teamMembers: prev.teamMembers.filter((_, i) => i !== index),
      }));
    }
  };

  const validateForm = () => {
    if (!formData.description.trim()) {
      setError("Please enter a description");
      return false;
    }

    if (event?.isTeamEvent) {
      if (!formData.teamName.trim()) {
        setError("Please enter a team name");
        return false;
      }
      if (formData.teamMembers.length === 0) {
        setError("Please add at least one team member");
        return false;
      }
      for (let member of formData.teamMembers) {
        if (!member.name.trim() || !member.email.trim()) {
          setError("Please fill in all required team member fields");
          return false;
        }
      }
    }

    if (event?.eventType === "hackathon") {
      if (!formData.ideaTitle.trim()) {
        setError("Please enter your idea title");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const participationData = {
        eventId: event._id,
        participationDetails: {
          teamName: formData.teamName || undefined,
          teamMembers: event?.isTeamEvent ? formData.teamMembers : [],
          description: formData.description,
          ideaTitle: formData.ideaTitle || undefined,
          techStack: formData.techStack || undefined,
          githubLink: formData.githubLink || undefined,
        },
      };

      // Call the API
      await eventService.submitParticipation(participationData);
      
      setSuccess("Participation form submitted successfully! 🎉");
      setTimeout(() => {
        if (onSubmit) {
          onSubmit();
        }
      }, 1500);
    } catch (err) {
      const errorMsg = typeof err === "string" ? err : err.message || "Failed to submit participation form";
      setError(errorMsg);
      console.error("Participation submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Event Participation Form</h2>
            <p className="text-slate-600 text-sm mt-1">{event?.title}</p>
          </div>
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-slate-500 hover:text-slate-700 text-2xl"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-3 m-6 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-3 m-6 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Team Name (if team event) */}
          {event?.isTeamEvent && (
            <div>
              <label className="block text-sm font-semibold mb-2">
                Team Name *
              </label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                placeholder="e.g., Code Warriors"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          )}

          {/* Team Members (if team event) */}
          {event?.isTeamEvent && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-semibold">
                  Team Members * (Max {event.maxTeamSize})
                </label>
                {formData.teamMembers.length < event.maxTeamSize && (
                  <button
                    type="button"
                    onClick={addTeamMember}
                    className="flex items-center gap-1 text-sm bg-rose-100 text-rose-700 px-3 py-1 rounded hover:bg-rose-200 transition"
                  >
                    <Plus size={16} /> Add Member
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-sm font-semibold">Member {index + 1}</h4>
                      {formData.teamMembers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTeamMember(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 mb-1 block">
                          Name *
                        </label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) =>
                            handleTeamMemberChange(index, "name", e.target.value)
                          }
                          placeholder="Full name"
                          className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 mb-1 block">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) =>
                            handleTeamMemberChange(index, "email", e.target.value)
                          }
                          placeholder="Email"
                          className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 mb-1 block">
                          Roll Number
                        </label>
                        <input
                          type="text"
                          value={member.rollNumber}
                          onChange={(e) =>
                            handleTeamMemberChange(index, "rollNumber", e.target.value)
                          }
                          placeholder="Roll number"
                          className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 mb-1 block">
                          Department
                        </label>
                        <input
                          type="text"
                          value={member.department}
                          onChange={(e) =>
                            handleTeamMemberChange(index, "department", e.target.value)
                          }
                          placeholder="Department"
                          className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="text-xs font-semibold text-slate-700 mb-1 block">
                          Year
                        </label>
                        <select
                          value={member.year}
                          onChange={(e) =>
                            handleTeamMemberChange(index, "year", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                        >
                          <option value="">Select year</option>
                          <option value="1st">1st Year</option>
                          <option value="2nd">2nd Year</option>
                          <option value="3rd">3rd Year</option>
                          <option value="4th">4th Year</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Idea Title (for hackathons) */}
          {event?.eventType === "hackathon" && (
            <div>
              <label className="block text-sm font-semibold mb-2">
                Idea Title *
              </label>
              <input
                type="text"
                name="ideaTitle"
                value={formData.ideaTitle}
                onChange={handleChange}
                placeholder="What is the title of your project idea?"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          )}

          {/* Tech Stack (for hackathons) */}
          {event?.eventType === "hackathon" && (
            <div>
              <label className="block text-sm font-semibold mb-2">
                Tech Stack
              </label>
              <input
                type="text"
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                placeholder="e.g., React, Node.js, MongoDB"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          )}

          {/* GitHub Link (for hackathons) */}
          {event?.eventType === "hackathon" && (
            <div>
              <label className="block text-sm font-semibold mb-2">
                GitHub Repository Link
              </label>
              <input
                type="url"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Description/Comments *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={
                event?.eventType === "hackathon"
                  ? "Describe your project idea, features, and how it solves the problem..."
                  : "Share your expectations or any relevant information about your participation..."
              }
              rows="5"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={loading || success}
              className="flex-1 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-400 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              {loading ? "Submitting..." : success ? "Submitted!" : "Submit Participation"}
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
    </div>
  );
};

export default ParticipationForm;
