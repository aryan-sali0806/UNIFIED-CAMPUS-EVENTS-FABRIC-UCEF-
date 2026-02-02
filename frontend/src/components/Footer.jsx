import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-10 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* LOGO + ABOUT */}
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-4">
            UCEF
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Unified Campus Events Fabric — a participation intelligence platform
            that tracks contribution, not just attendance.
          </p>
        </div>

        {/* FEATURES */}
        <div>
          <h3 className="text-white font-semibold mb-4">Features</h3>
          <ul className="space-y-2 text-sm">
            <li>Event Lifecycle Management</li>
            <li>Hackathons & Quizzes</li>
            <li>Attendance Tracking</li>
            <li>Certificates & Records</li>
            <li>Participation Profiles</li>
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/hackathons" className="hover:text-white">Hackathons</Link></li>
            <li><Link to="/workshops" className="hover:text-white">Workshops</Link></li>
            <li><Link to="/mentorship" className="hover:text-white">Mentorship</Link></li>
          </ul>
        </div>

        {/* LEGAL + SOCIAL */}
        <div>
          <h3 className="text-white font-semibold mb-4">Connect</h3>

          <div className="flex items-center gap-4 mb-6">
            <a href="/" className="hover:text-white"><Github /></a>
            <a href="/" className="hover:text-white"><Linkedin /></a>
            <a href="/" className="hover:text-white"><Twitter /></a>
            <a href="/" className="hover:text-white"><Instagram /></a>
          </div>

          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link to="/" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-slate-800 text-center py-5 text-sm text-slate-400">
        © {new Date().getFullYear()} UCEF. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
