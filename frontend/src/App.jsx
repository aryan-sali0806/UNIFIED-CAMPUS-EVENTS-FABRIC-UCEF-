import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Hackathons from "./pages/Hackathons";
import Quizzes from "./pages/Quizzes";
import Workshops from "./pages/Workshops";
import Cultural from "./pages/Cultural";
import Festivals from "./pages/Festivals";
import Practice from "./pages/Practice";
import Mentorship from "./pages/MentorShip";
import OrganizerProtectedRoute from "./routes/OrganizerProtectedRoute";
import OrganizerLayout from "./organizer/pages/OrganizerLayout";
import Dashboard from "./organizer/pages/Dashboard";
import Events from "./organizer/pages/Events";
import Customization from "./organizer/pages/Customization";



function App() {
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hackathons" element={<Hackathons />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/cultural" element={<Cultural />} />
        <Route path="/festivals" element={<Festivals />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/mentorship" element={<Mentorship />} />
        
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/organizer" element={<OrganizerProtectedRoute />}>
          <Route element={<OrganizerLayout />}>
           <Route index element={<Dashboard />} />
           <Route path="events" element={<Events />} />
           <Route path="customize" element={<Customization />} />
          </Route>
        </Route>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

