import { NavLink } from "react-router-dom";
import {
  Home,
  Trophy,
  HelpCircle,
  BookOpen,
  Music,
  Calendar,
  Target,
  Users,
} from "lucide-react";

const links = [
  { name: "Home", path: "/", icon: Home },
  { name: "Hackathons", path: "/hackathons", icon: Trophy },
  { name: "Quizzes", path: "/quizzes", icon: HelpCircle },
  { name: "Workshops", path: "/workshops", icon: BookOpen },
  { name: "Cultural Events", path: "/cultural", icon: Music },
  { name: "College Festivals", path: "/festivals", icon: Calendar },
  { name: "Practice", path: "/practice", icon: Target },
  { name: "Mentorship", path: "/mentorship", icon: Users },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 px-5 py-6">
      <h1 className="text-2xl font-extrabold text-indigo-600 mb-10 tracking-tight">
        UCEF
      </h1>

      <nav className="space-y-1">
        {links.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `
              flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
              transition-all duration-200
              ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:translate-x-1"
              }
            `
            }
          >
            <Icon size={18} />
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;




