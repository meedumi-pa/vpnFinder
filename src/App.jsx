import * as React from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import Inputform from "./Routes/Admin/Inputvpn/Inputform";
import "./apps.css";
import Searchbar from "./Routes/Admin/searchBar/Searchbar";
import CSVDownload from "./Routes/Reports/CSVDownload";
import Loginsignup from "./Routes/LoginSignup/Loginsignup";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Search from "./Routes/User/Search_User/Search";
import Admin from "./Routes/Admin/Admin";
import User from "./Routes/User/User";

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};
const ProtectedRoute = ({ children, role, requiredRole }) => {
  if (role !== requiredRole) {
    return <Navigate to="/" />;
  }
  return children;
};
const AppLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleLogin = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
    navigate(userRole === "admin" ? "/admin" : "/user");
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3001/logout");
      console.log("Logout successful");
      setIsLoggedIn(false);
      setRole("");
      // Redirect to the login page
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Loginsignup onLogin={handleLogin} />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute role={role} requiredRole="user">
              <User isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          <Route path="search-user" element={<Search />} />
          <Route path="reports" element={<CSVDownload />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute role={role} requiredRole="admin">
              <Admin isLoggedIn={isLoggedIn} />
            </ProtectedRoute>
          }
        >
          <Route path="search" element={<Searchbar />} />

          <Route path="addvpn" element={<Inputform />} />
          <Route path="reports" element={<CSVDownload />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
};

// const root = createRoot(document.getElementById("root"));

// root.render(<App />);

export default App;
