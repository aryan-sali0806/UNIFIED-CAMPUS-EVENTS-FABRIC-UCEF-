import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, CalendarDays, Settings, LogOut } from "lucide-react";

const OrganizerSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-5 py-3 rounded-lg font-medium transition
     ${
       isActive
         ? "bg-indigo-600 text-white"
         : "text-slate-600 hover:bg-indigo-50"
     }`;

  return (
    <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 text-xl font-extrabold text-indigo-600">
        UCEF
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 space-y-1">
        <NavLink to="/organizer" end className={linkClass}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/organizer/events" className={linkClass}>
          <CalendarDays size={18} />
          Events
        </NavLink>

        <NavLink to="/organizer/customize" className={linkClass}>
          <Settings size={18} />
          Customize
        </NavLink>
      </nav>

      {/* Footer - Logout */}
      <div className="px-4 py-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium transition"
        >
          <LogOut size={18} />
          Logout
        </button>
        <div className="text-xs text-slate-400 mt-4 px-2">
          © 2026 UCEF
        </div>
      </div>
    </aside>
  );
};

export default OrganizerSidebar;
