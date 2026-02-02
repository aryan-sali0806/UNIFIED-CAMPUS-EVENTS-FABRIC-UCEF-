const AuthCard = ({ mode, role }) => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-2 capitalize">
          {mode} as {role}
        </h2>
  
        <p className="text-sm text-slate-500 mb-6">
          {role === "organizer"
            ? "Manage events, rounds, and participation."
            : role === "admin"
            ? "System oversight and verification access."
            : "Participate, qualify, and track your journey."}
        </p>
  
        <form className="space-y-4">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              className="auth-input"
            />
          )}
  
          <input
            type="email"
            placeholder="Email address"
            className="auth-input"
          />
  
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
          />
  
          {mode === "signup" && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="auth-input"
            />
          )}
  
          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-xl
                       bg-gradient-to-r from-indigo-600 to-violet-600
                       text-white font-semibold
                       hover:opacity-90 transition shadow"
          >
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>
  
        {/* SOCIAL (DESIGN ONLY) */}
        <div className="mt-6 text-center text-sm text-slate-400">
          or continue with
        </div>
  
        <div className="flex gap-3 mt-4">
          <button className="social-btn">Google</button>
          <button className="social-btn">LinkedIn</button>
        </div>
      </div>
    );
  };
  
  export default AuthCard;
  