import { useState } from "react";
import { Link } from "react-router-dom"; // Imported to fix the Link reference breaking the page
import "./Hero.css";

// 👉 FIXED: Accepted profile directly from components props
function Hero({ HotelPage = [], profile }) {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 

  // Fallback string extraction logic to safely catch missing names or extra spaces
  const userInitials = profile?.name 
    ? profile.name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase() 
    : "U";

  // Added a fallback empty array check to prevent errors if data is temporarily missing
  // 👉 NOTE: Check your data object properties. If your data uses 'title' instead of 'name', 
  // you might want to switch hotel.name to hotel.title to prevent filtering crashes.
  const filteredHotels = HotelPage.filter(hotel =>
    (hotel.name || hotel.title || "").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="hero">
      {/* Dark Overlay for Text Readability (Desktop Only) */}
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        {/* Mobile-Only Greeting Row */}
        <div className="user-greeting-row">
          <div className="user-profile-meta-block" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* 👉 FIXED: Render live uploaded avatar file bubble or string initials bubble fallback */}
            {profile?.avatar ? (
              <img 
                src={profile.avatar} 
                alt="User Profile Avatar" 
                style={{
                  width: "43px",
                  height: "43px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #ffffff"
                }}
              />
            ) : (
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                backgroundColor: "#4f46e5",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "14px",
                border: "2px solid #ffffff"
              }}>
                {userInitials}
              </div>
            )}
            
            {/* 👉 FIXED: Renders the first name dynamically based on profile state entry */}
            <h2 className="user-greeting">Hi, {profile?.name ? profile.name.split(' ')[0] : "Guest"}</h2>
          </div>
          <Link to="/settings" className="notification-bell">🔔</Link>
        </div>

        {/* Floating Mobile Card Wrapper */}
       <div className="hero-card-banner">
  <div className="hero-card-overlay"></div>
  <h1 className="hero-title">Experience Luxury & Comfort</h1>
  <p className="hero-desc">Book your stay at world-class destinations and enjoy premium amenities tailored just for you.</p>
  {/* 👉 FIXED: Added the '=' sign to the 'to' attribute below */}
  <Link to="/View-all" className="btn-explore-mobile">Explore Now</Link>
</div>

        
        {/* Integrated Hotel Booking Bar */}
        <div className="booking-bar">
          {/* Mobile-Only Search Pill */}
          <div className="mobile-search-pill">
            <span className="search-icon"></span>
            <input 
              type="text" 
              placeholder="Where do you want to stay?" 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
            />
            <button className="btn-filter-icon" type="button">🔍</button>
          </div>

          {/* Desktop Form Fields */}
          <div className="input-group">
            <label>Destination</label>
            <input 
              type="text" 
              placeholder="Where are you going?" 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
            />
            {searchQuery && (
              <button 
                className="cle-search-btn" 
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>
          <div className="input-group">
            <label>Check-in</label>
            <input type="date" />
          </div>
          <div className="input-group">
            <label>Check-out</label>
            <input type="date" />
          </div>
          <div className="input-group">
            <label>Guests</label>
            <select>
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3+ Guests</option>
            </select>
          </div>
          <button className="btn-search">Search Rooms</button>
        </div>

      </div>
    </section>
  );
}

export default Hero;
