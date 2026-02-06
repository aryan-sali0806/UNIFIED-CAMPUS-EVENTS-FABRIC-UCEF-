import { Outlet } from "react-router-dom";
import OrganizerSidebar from "./OrganizerSidebar";
import { useNavigate } from "react-router-dom";

const OrganizerLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

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

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">Organizer</span>
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
              O
            </div>
          </div>
        </div>

        {/* Routed Page Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default OrganizerLayout;
