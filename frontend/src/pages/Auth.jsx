import { useState } from "react";
import AuthCard from "../components/AuthCard";

const Auth = () => {
  const [mode, setMode] = useState("login"); // login | signup
  const [role, setRole] = useState("candidate"); // candidate | organizer | admin

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-100 px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* LEFT – VISUAL / BRAND */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-10">
          <h1 className="text-4xl font-extrabold mb-4">UCEF</h1>
          <p className="text-indigo-100 text-center max-w-sm">
            Track participation, qualify rounds, earn certificates and build
            your campus journey — all in one place.
          </p>
        </div>

        {/* RIGHT – AUTH CARD */}
        <div className="p-8 md:p-12">
          {/* MODE SWITCH */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
            {["login", "signup"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition
                  ${mode === m
                    ? "bg-white shadow text-indigo-600"
                    : "text-slate-500"}`}
              >
                {m === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* ROLE SWITCH */}
          <div className="flex gap-2 mb-8">
            {["candidate", "organizer", "admin"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition
                  ${role === r
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* FORM */}
          <AuthCard mode={mode} role={role} />
        </div>
      </div>
    </div>
  );
};

export default Auth;
