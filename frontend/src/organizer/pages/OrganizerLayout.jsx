import { Outlet, useNavigate } from "react-router-dom";
import OrganizerSidebar from "./OrganizerSidebar";

const OrganizerLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/login");
  };
  const userName = localStorage.getItem("userName") || "Organizer";

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar */}
      <OrganizerSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            Organizer Dashboard
          </h1>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-700">{userName}</p>
              <p className="text-xs text-slate-500">Organizer</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={handleLogout}
              className="ml-4 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Routed Page Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default OrganizerLayout;
