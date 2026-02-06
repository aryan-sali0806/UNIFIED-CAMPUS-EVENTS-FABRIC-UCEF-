import { Navigate, Outlet } from "react-router-dom";

const OrganizerProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not organizer
  if (role !== "organizer") {
    return <Navigate to="/" replace />;
  }

  // Authorized organizer
  return <Outlet />;
};

export default OrganizerProtectedRoute;
