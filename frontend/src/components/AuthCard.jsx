import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthCard = ({ mode, role }) => {
  const navigate = useNavigate();

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (mode === "signup") {
      if (!name.trim()) {
        alert("Please enter your full name");
        return;
      }
    }

    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    if (!password.trim() || password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const url =
        mode === "login"
          ? "http://localhost:5000/api/auth/login"
          : "http://localhost:5000/api/auth/register";

      const payload =
        mode === "login"
          ? { email, password }
          : { name, email, password, role };

      const res = await axios.post(url, payload);

      // store token + role + user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("userName", res.data.user.name);

      // Clear form
      setName("");
      setEmail("");
      setPassword("");

      // role-based redirect
      if (res.data.user.role === "organizer") {
        navigate("/organizer");
      } else if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        // candidate, student, or any other role
        navigate("/");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message 
        || (err.message && err.message.includes("Network") ? "Cannot connect to server. Make sure backend is running on http://localhost:5000" : "")
        || err.message 
        || "Authentication failed. Please try again.";
      
      console.error("Auth Error:", {
        status: err.response?.status,
        message: err.response?.data?.message,
        error: err.message,
        fullError: err
      });
      
      alert(errorMsg);
    } finally {
      setLoading(false);
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
          disabled={loading}
          className="w-full mt-4 py-3 rounded-xl
                     bg-gradient-to-r from-indigo-600 to-violet-600
                     text-white font-semibold
                     hover:opacity-90 transition shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (mode === "login" ? "Logging in..." : "Creating account...") : (mode === "login" ? "Login" : "Create Account")}
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

  