import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Hackathons from "./pages/Hackathons";
import Quizzes from "./pages/Quizzes";
import Workshops from "./pages/Workshops";
import Cultural from "./pages/Cultural";
import Festivals from "./pages/Festivals";
import Practice from "./pages/Practice";
import Mentorship from "./pages/MentorShip";


function App() {
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
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

