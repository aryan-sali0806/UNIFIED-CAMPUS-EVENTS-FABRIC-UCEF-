import { Search, Bell, User, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <header className="flex items-center justify-between mb-10">
      {/* Search */}
      <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-xl border shadow-sm w-full max-w-lg focus-within:ring-2 focus-within:ring-indigo-400">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search events, hackathons, workshops..."
          className="w-full text-sm outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 ml-6">
        <Link
          to="/login"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                     text-indigo-600 hover:bg-indigo-50 transition"
        >
          <LogIn size={16} />
          Login
        </Link>

        <Link
          to="/signup"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                     bg-gradient-to-r from-indigo-600 to-violet-600 text-white
                     hover:opacity-90 transition shadow"
        >
          <UserPlus size={16} />
          Sign Up
        </Link>

        <Bell className="text-slate-600 cursor-pointer" />

        <div className="flex items-center gap-4">
            {token && role === "organizer" && (
              <>
                <span className="text-sm text-slate-600">Organizer</span>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm rounded-lg bg-rose-500 text-white
                            hover:bg-rose-600 transition font-medium"
                >
                  Logout
                </button>
              </>
            )}
        </div>

      </div>
    </header>
  );
};

export default Header;




