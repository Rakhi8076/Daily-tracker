import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <h1 className="logo">Daily Tracker</h1>

      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup" className="signup-btn">Signup</Link>
      </div>
    </div>
  );
}

export default Navbar;
