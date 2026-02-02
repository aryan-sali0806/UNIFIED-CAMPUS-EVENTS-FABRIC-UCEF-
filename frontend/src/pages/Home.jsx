import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StatsSection from "../components/statsSection";


import { Link } from "react-router-dom";
import {
  Trophy,
  HelpCircle,
  BookOpen,
  Music,
  Calendar,
  Target,
  Users,
} from "lucide-react";

const categories = [
  {
    name: "Hackathons",
    path: "/hackathons",
    icon: Trophy,
    color: "from-indigo-500 to-indigo-700",
  },
  {
    name: "Quizzes",
    path: "/quizzes",
    icon: HelpCircle,
    color: "from-violet-500 to-purple-700",
  },
  {
    name: "Workshops",
    path: "/workshops",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-600",
  },
  {
    name: "Cultural Events",
    path: "/cultural",
    icon: Music,
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "College Festivals",
    path: "/festivals",
    icon: Calendar,
    color: "from-orange-500 to-amber-600",
  },
  {
    name: "Practice",
    path: "/practice",
    icon: Target,
    color: "from-emerald-500 to-green-600",
  },
  {
    name: "Mentorship",
    path: "/mentorship",
    icon: Users,
    color: "from-teal-500 to-cyan-600",
  },
];




const Home = () => {
  return (
    <div className="flex w-full">
      <Sidebar />

      <main className="flex-1 px-10 py-8">
        <Header />

        {/* HERO */}
        <section
          className="bg-gradient-to-r from-indigo-600 to-violet-600
                    text-white rounded-3xl p-10 mb-12 shadow-lg
                    relative overflow-hidden
                    transition-all duration-500 ease-out
                    hover:shadow-2xl hover:-translate-y-1"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl
                          transition-all duration-500
                          hover:scale-110" />

          <h2 className="text-3xl font-bold mb-3">
            Discover & Track Your Campus Journey 🚀
          </h2>

          <p className="text-indigo-100 max-w-2xl">
            Participate in events, qualify rounds, earn certificates, and build a
            verified participation profile — all in one place.
          </p>
        </section>


        {/* CATEGORIES */}
        <section className="mb-14">
          <h3 className="text-lg font-semibold mb-6">Explore Categories</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map(({ name, path, icon: Icon, color }) => (
              <Link
                key={name}
                to={path}
                className="group bg-white rounded-2xl p-6 border shadow-sm
                          hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div
                  className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${color}
                              flex items-center justify-center text-white shadow`}
                >
                  <Icon size={22} />
                </div>

                <p className="font-medium text-slate-800 group-hover:text-indigo-600 transition">
                  {name}
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Explore opportunities →
                </p>
              </Link>
            ))}
          </div>
        </section>


        {/* FEATURED EVENTS */}
        <section>
          <h3 className="text-lg font-semibold mb-6">Featured Events</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border p-6 shadow-sm
                           hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  LIVE
                </span>

                <h4 className="font-semibold mb-2">
                  Event Title
                </h4>

                <p className="text-sm text-slate-500 mb-4">
                  Short event description goes here. Explain format, rounds, etc.
                </p>

                <button className="text-indigo-600 font-medium text-sm hover:underline">
                  View Details →
                </button>
              </div>
            ))}
          </div>
        </section>
        <StatsSection />
        <Footer />
      </main>
    </div>
  );
};

export default Home;



