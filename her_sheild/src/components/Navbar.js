import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.jpg'; // Logo import
import '../styles.css';
import UserContext from '../context/UserContext'; // Import UserContext

const Navbar = ({ showProfile }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useContext(UserContext); // Access the user context

  // Toggle dropdown menu
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <header className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Her Shield Logo" className="logo" />
      </div>

      <nav className="nav-links">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li className="programs" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
            <Link to="/programs">Programs</Link>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/Emergency-Contact">Emergency Contact</Link></li>
                <li><Link to="/speak-out">Speak Out!</Link></li>
                <li><Link to="/check-mate">Check Mate</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contactus">Contact Us</Link></li>
          <li><Link to="/Profile">Profile </Link></li>
        </ul>

        <div className="auth-buttons">
          {user ? (
            showProfile ? (
              <>
                {/* Profile button and Logout button when logged in */}
                <Link to="/ Profile">
                  <button className="profile-btn">Profile</button>
                </Link>
                <button className="logout-btn" onClick={logout}>Logout</button>
              </>
            ) : null // No profile or logout button when not showProfile
          ) : (
            <>
              {/* Login and Signup buttons when logged out */}
              <Link to="/login">
                <button className="login-btn">Login</button>
              </Link>
              <Link to="/signup">
                <button className="signup-btn">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
