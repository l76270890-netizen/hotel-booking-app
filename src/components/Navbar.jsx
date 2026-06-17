import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Settings, Compass, Home, Heart } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

function Navbar({ favoritesCount = 0 }) {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  const path = location.pathname.toLowerCase();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className="desktop-navbar">
        <div className="Logo">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            LOG-X
          </Link>
        </div>

        <ul className="desktop-links">
          <li>
            <Link to="/" className={path === "/" ? "desktop-active" : ""}>
              <Home size={18} /> Home
            </Link>
          </li>

          <li>
            <Link
              to="/view-all"
              className={path === "/view-all" ? "desktop-active" : ""}
            >
              <Compass size={18} /> Explore
            </Link>
          </li>

          <li>
            <Link
              to="/saved"
              className={path === "/saved" ? "desktop-active" : ""}
            >
              <Heart size={18} /> Saved
              {favoritesCount > 0 && (
                <span className="nav-badge">{favoritesCount}</span>
              )}
            </Link>
          </li>

          <li>
            <Link
              to="/settings"
              className={path === "/settings" ? "desktop-active" : ""}
            >
              <Settings size={18} /> Settings
            </Link>
          </li>

          {/* AUTH */}
          <li>
            {loading ? (
              <span>Loading...</span>
            ) : user ? (
              <div className="auth-user">
                <span>{user.email}</span>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>

        <Link to="/view-all" className="nav-btn">
          Book Now
        </Link>
      </nav>
{/* MOBILE NAVBAR */}
      <nav className="mobile-floating-bottom-bar">
        <Link
          to="/"
          className={`bottom-tab-item ${path === "/" ? "active" : ""}`}
        >
          <Home size={20} />
          <span>Home</span>
        </Link>

        <Link
          to="/view-all"
          className={`bottom-tab-item ${path === "/view-all" ? "active" : ""}`}
        >
          <Compass size={20} />
          <span>Explore</span>
        </Link>

        <Link
          to="/saved"
          className={`bottom-tab-item ${path === "/saved" ? "active" : ""}`}
        >
          {/* 👉 FIXED: Added wrapper container to absolute position the notification circle */}
          <div className="mobile-heart-icon-wrapper" style={{ position: "relative", display: "inline-flex" }}>
            <Heart size={20} />
            
            {/* 👉 FIXED: Renders the dynamic favorites count badge */}
            {favoritesCount > 0 && (
              <span className="mobile-favorites-badge">
                {favoritesCount}
              </span>
            )}
          </div>
          <span>Saved</span>
        </Link>

        <Link
          to="/settings"
          className={`bottom-tab-item ${path === "/settings" ? "active" : ""}`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </nav>
    </>
  );
}

export default Navbar;
