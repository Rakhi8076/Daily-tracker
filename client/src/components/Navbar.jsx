import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h1 className="logo">Daily Tracker</h1>

      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>

        {!isLoggedIn && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="signup-btn">
              Signup
            </Link>
          </>
        )}

        {isLoggedIn && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
