import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("userName", res.data.user.name);
      
      alert("Signup successful");
      
      // Redirect based on role
      if (res.data.user.role === "organizer") {
        navigate("/organizer");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <input 
        name="name" 
        placeholder="Name" 
        onChange={handleChange}
        required 
      />
      <input 
        name="email" 
        placeholder="Email" 
        onChange={handleChange}
        required 
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <div>
        <label>I am a: </label>
        <select name="role" value={form.role} onChange={handleChange} required>
          <option value="student">Student</option>
          <option value="organizer">Event Organizer</option>
        </select>
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
