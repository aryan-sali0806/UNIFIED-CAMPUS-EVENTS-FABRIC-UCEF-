import { NavLink } from "react-router-dom";
import { LayoutDashboard, CalendarDays, Settings } from "lucide-react";

const OrganizerSidebar = () => {
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

      {/* Footer */}
      <div className="px-4 py-4 text-xs text-slate-400 border-t">
        © 2026 UCEF
      </div>
    </aside>
  );
};

export default OrganizerSidebar;
