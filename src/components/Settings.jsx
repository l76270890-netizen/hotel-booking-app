import React, { useState } from "react";
import { Link } from "react-router-dom"; // Imported to fix the Link reference breaking the page
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, deleteUser } from "firebase/auth";

import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import "./Settings.css";

function Settings({ theme, toggleTheme, profile, setProfile }) {
const { user } = useContext(AuthContext);
const navigate = useNavigate();

if (!profile) {
  return <div>Loading...</div>;
}

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          avatar: reader.result // Base64 data string saves permanently in localStorage
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const [notifications, setNotifications] = useState({
    bookingConfirmations: true,
    priceAlerts: false,
    promotions: true,
  });

  const [currency, setCurrency] = useState("USD");

  const handleToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  
  /*logout account*/
const handleLogout = async () => {
  try {
    await signOut(auth);

    localStorage.removeItem("user_profile");

    navigate("/login");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};


/* Delete Account Completely */
const handleDeleteAccount = async () => {
  const confirmed = window.confirm(
    "Are you absolutely sure you want to permanently delete your account? This cannot be undone."
  );

  if (!confirmed) return;

  try {
    const emailToDelete = auth.currentUser?.email;

    // 1. Delete user from Firebase auth servers
    await deleteUser(auth.currentUser);

    // 2. Clean up this specific user's local cache files
    if (emailToDelete) {
      localStorage.removeItem(`${emailToDelete}_profile`);
      localStorage.removeItem(`${emailToDelete}_favorites`);
    }

    alert("Your account has been permanently deleted.");
    
    // 3. Send them to the homepage route
    navigate("/");

    // 4. 👉 ADD THIS EXACT LINE HERE: Forces the whole browser tab to completely hard-refresh
    window.location.reload();

  } catch (error) {
    console.error(error);

    // Firebase security trap: Users must have logged in recently to delete their account
    if (error.code === "auth/requires-recent-login") {
      alert("For security reasons, please log out, log back in, and try deleting your account again immediately.");
    } else {
      alert(error.message);
    }
  }
};


return (
  <div className="settings-page-wrapper">
    <div className="settings-container">

      {!user && (
        <div className="settings-card" style={{ textAlign: "center" }}>
          <h2>Please Login</h2>
          <p>You must be logged in to manage your account settings.</p>

          <button
            className="settings-btn-secondary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      )}

      {user && (
        <>
          <h1
            className="settings-main-title"
            style={{ marginTop: "15px" }}
          >
            Account Settings
          </h1>

          <p className="settings-subtitle">
            Manage your profile dashboard, hotel preferences, and active
            notifications.
          </p>

          {/* KEEP ALL YOUR EXISTING SECTIONS HERE */}
          {/* Personal Profile */}
         <div className="profile-card">

  <div className="profile-header">

    <div className="profile-avatar-wrapper">
      {profile.avatar ? (
        <img
          src={profile.avatar}
          alt="Profile"
          className="profile-avatar-img"
        />
      ) : (
        <div className="profile-avatar-placeholder">
          {profile.name
            ? profile.name
                .split(" ")
                .filter(Boolean)
                .map((n) => n[0])
                .join("")
                .toUpperCase()
            : "G"}
        </div>
      )}

      <label htmlFor="avatar-upload" className="camera-badge">
        📷
      </label>

      <input
        type="file"
        id="avatar-upload"
        accept="image/*"
        onChange={handleImageChange}
        hidden
      />
    </div>

    <h2>{profile.name || "Guest User"}</h2>
    <p>{profile.email || "No email added"}</p>

    <span className="profile-status">
      ✨ Premium Traveler
    </span>

  </div>

  

  <div className="settings-input-group">
    <label>Full Name</label>
    <input
      type="text"
      value={profile.name}
      onChange={(e) =>
        setProfile({
          ...profile,
          name: e.target.value,
        })
      }
    />
  </div>

  <div className="settings-input-row">

    <div className="settings-input-group">
      <label>Email Address</label>
      <input
        type="email"
        value={profile.email}
        onChange={(e) =>
          setProfile({
            ...profile,
            email: e.target.value,
          })
        }
      />
    </div>

    <div className="settings-input-group">
      <label>Phone Number</label>
      <input
        type="text"
        value={profile.phone}
        onChange={(e) =>
          setProfile({
            ...profile,
            phone: e.target.value,
          })
        }
      />
    </div>

  </div>

</div>


          {/* Booking Preferences */}
           <section className="settings-section">
          <h2 className="section-title">Booking Preferences</h2>
          <div className="settings-card">
            <div className="setting-item-row">
              <div className="setting-item-text">
                <h3>Preferred Currency</h3>
                <p>Choose the default currency format displayed for room prices.</p>
              </div>
              <select 
                className="settings-select" 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">USD ($) - US Dollar</option>
                <option value="NGN">NGN (₦) - Nigerian Naira</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
              </select>
            </div>
          </div>
        </section>
          {/* Notifications & Appearance */}

           <section className="settings-section">
          <h2 className="section-title">Notifications & Appearance</h2>
          <div className="settings-card">
            <div className="setting-item-row">
              <div className="setting-item-text">
                <h3>Booking Confirmations</h3>
                <p>Receive check-in alerts, digital keys, and reservation receipts via email.</p>
              </div>
              <label className="switch-toggle">
                <input 
                  type="checkbox" 
                  checked={notifications.bookingConfirmations} 
                  onChange={() => handleToggle("bookingConfirmations")}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item-row">
              <div className="setting-item-text">
                <h3>Hotel Price Drops</h3>
                <p>Get notified when rooms in your Saved List offer temporary discounts.</p>
              </div>
              <label className="switch-toggle">
                <input 
                  type="checkbox" 
                  checked={notifications.priceAlerts} 
                  onChange={() => handleToggle("priceAlerts")}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item-row">
              <div className="setting-item-text">
                <h3>Exclusive Member Perks</h3>
                <p>Receive updates regarding holiday deals and loyalty points program milestones.</p>
              </div>
              <label className="switch-toggle">
                <input 
                  type="checkbox" 
                  checked={notifications.promotions} 
                  onChange={() => handleToggle("promotions")}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item-row">
              <div className="setting-item-text">
                <h3>Appearance Mode</h3>
                <p>Toggle between Light Mode and Dark Mode for your interface display preferences.</p>
              </div>
              <label className="switch-toggle">
                <input 
                  type="checkbox" 
                  checked={theme === "dark"} 
                  onChange={toggleTheme} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </section>
          {/* Private Settings */}
          <section className="settings-section">
          <h2 className="section-title">Private Settings</h2>
          <div className="settings-card">
            <div className="setting-item-row">
              <div className="setting-item-text">
                <h3>Session Activity</h3>
                <p>Monitor system entry activity or sign out of your profile session securely.</p>
              </div>
              <button 
                className="settings-btn-secondary" 
                style={{ borderColor: '#ff4b2b', color: '#ff4b2b', padding: '10px 20px' }}
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>

            <div className="setting-item-row" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginTop: '20px' }}>
              <div className="setting-item-text">
                <h3 style={{ color: '#ff4b2b' }}>Delete Account</h3>
                <p>Permanently remove your account dashboard profile completely.</p>
              </div>
              <button 
                className="settings-btn-secondary" 
                style={{ backgroundColor: '#ff4b2b', color: '#fff', padding: '10px 20px', border: 'none' }}
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </section>

        </>
      )}

    </div>
  </div>
);

}

export default Settings;
