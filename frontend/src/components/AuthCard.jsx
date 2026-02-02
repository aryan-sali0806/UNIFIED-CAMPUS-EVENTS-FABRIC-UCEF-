import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthCard = ({ mode, role }) => {
  const navigate = useNavigate();

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url =
        mode === "login"
          ? "/api/auth/login"
          : "/api/auth/register";

      const payload =
        mode === "login"
          ? { email, password, role }
          : { name, email, password, role };

      const res = await axios.post(url, payload);

      // store token + role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      // role-based redirect
      if (res.data.role === "organizer") {
        navigate("/organizer/dashboard");
      } else if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err.response?.data?.message || "Auth failed");
    }
  };

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

      <form className="space-y-4" onSubmit={handleSubmit}>
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
          required
        />

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

      {/* Social login – UI only for now */}
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

  