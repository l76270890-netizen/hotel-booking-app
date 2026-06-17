import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./HotelDetail.css";

export default function HotelDetail({ hotel, favorites, toggleFavorite }) {
  const [activeImage, setActiveImage] = useState(hotel?.images?.[0] || hotel?.image);
  const navigate = useNavigate();
  const isFavorite = favorites?.includes(hotel?.id);


  const handleBookNowClick = () => {
    navigate("/book-now", {state: {hotel: hotel}});
  };

  // Fallback state if hotel is missing to prevent layout crashing
  if (!hotel) return <div style={{padding: "100px", textAlign: "center"}}>Loading hotel...</div>;

  const amenitiesList = hotel.amenities || ["Free Wi-Fi", "Air Conditioning", "Room Service", "Free Parking"];
  const offersList = hotel.offers || [
    { icon: "🏊‍♂️", title: "Swimming Pool", desc: "Access to our climate-controlled outdoor pool." },
    { icon: "🍳", title: "Complimentary Breakfast", desc: "Fresh local and continental options daily." },
    { icon: "🏋️‍♀️", title: "Fitness Center", desc: "Fully equipped gym open 24/7." },
    { icon: "⏰", title: "24/7 Front Desk", desc: "Round-the-clock concierge and security services." }
  ];

  return (
    <div className="hotel-detail-container">
      <div className="detail-header">
        <button onClick={() => navigate(-1)} className="back-btn">‹</button>
        <button
          className={`detail-heart-icon ${isFavorite ? 'active' : ''}`}
          onClick={(e) => toggleFavorite(hotel.id, e)}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="detail-grid">
        <div className="detail-main-content">
          <div className="gallery-section">
            <div className="main-image-wrapper">
              <img src={activeImage} className="main-image" alt={hotel.title} />
            </div>
            {hotel.images && (
              <div className="thumbnail-row">
                {hotel.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Thumbnail"
                    className={`thumbnail ${activeImage === img ? 'selected' : ''}`}
                    onClick={() => setActiveImage(img)}
                  />
                ))}
              </div>
            )}
          </div>

          <h1 className="hotel-title">{hotel.title}</h1>
          <p className="hotel-location">📍 {hotel.location || "Location not set"}</p>
          <div className="rating-badge">
            <span className="star">★</span> {hotel.rating} 
          </div>

          <hr className="divider" />
          
          <div className="specs-row">
             {amenitiesList.map((amenity, i) => (
               <span key={i} className="spec-badge">✓ {amenity}</span>
             ))}
          </div>

          <div className="description-section">
            <h3>About this stay</h3>
            <p>{hotel.description}</p>
          </div>

          <hr className="divider" />

          <div className="offers-section">
            <h3>What this place offers</h3>
            <div className="offers-grid">
              {offersList.map((offer, i) => (
                <div key={i} className="offer-item">
                  <span className="offer-icon">{offer.icon}</span>
                  <div className="offer-text">
                    <h4>{offer.title}</h4>
                    <p>{offer.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="booking-sticky-card">
          <div className="booking-card-header">
            <h2>${hotel.price} <span className="per-night">/ night</span></h2>
          </div>
          {/* 👉 FIXED: Removed the broken 'user' check and linked it to your navigation function */}
  <button className="book-btn" onClick={handleBookNowClick}>
    Book Now
  </button>
        </div>
      </div>
    </div>
  );
}
