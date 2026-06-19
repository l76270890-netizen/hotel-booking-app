import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookNow.css";

const DEFAULT_ROOM = {
  id: "default-room",
  title: "Deluxe Family Suite",
  hotelName: "The Grand Luminary Hotel",
  price: 149,
  image: "/4.jpg",
  maxGuests: 4
};

export default function BookNow() {
  const routerLocation = useLocation();
  const navigate = useNavigate();

  const selectedHotel = routerLocation.state?.hotel || DEFAULT_ROOM;
  const basePricePerNight = selectedHotel.price || 120;
  const maxGuests = selectedHotel.specs?.guests || selectedHotel.maxGuests || 3;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    specialRequests: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const pricingSummary = useMemo(() => {
    if (!formData.checkIn || !formData.checkOut) {
      return { nights: 0, finalTotal: 0 };
    }

    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    
    start.setHours(0,0,0,0);
    end.setHours(0,0,0,0);
    
    const timeDiff = end.getTime() - start.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (nights <= 0) return { nights: 0, finalTotal: 0 };

    const finalTotal = nights * basePricePerNight;

    return { nights, finalTotal };
  }, [formData.checkIn, formData.checkOut, basePricePerNight]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (pricingSummary.nights <= 0) {
      setError("Please select a valid check-out date occurring after your check-in date.");
      return;
    }

    setIsSubmitted(true);
  };

  const todayString = new Date().toISOString().split("T")[0];

  if (isSubmitted) {
    return (
      <div className="success-container">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h2>Booking Confirmed!</h2>
          <p className="success-message">
            Thank you, <strong>{formData.firstName}</strong>. Your stay at <strong>{selectedHotel.title || selectedHotel.hotelName}</strong> is secured.
          </p>
          <button onClick={() => navigate("/")} className="primary-btn">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page-container">
      <div className="booking-phone-mockup">
        {/* Dynamic Header Block */}
        <header className="booking-app-header">
          <h1>Book Now</h1>
          <button type="button" onClick={() => navigate(-1)} className="hamburger-menu-btn">
            ✕
          </button>
        </header>

        {/* Unified Card & Inputs Form Area */}
        <form onSubmit={handleSubmit} className="booking-phone-form">
          
          {/* Top Embedded Selected Hotel Summary Card */}
          <div className="embedded-hotel-card">
            <div className="hotel-thumbnail-wrapper">
              <img src={selectedHotel.image} alt={selectedHotel.title} />
            </div>
            <div className="hotel-text-details">
              <h3>{selectedHotel.title || selectedHotel.hotelName}</h3>
              <p className="location-txt">{selectedHotel.location || "Maldives"}</p>
              <div className="sub-price-row">
                <span className="geo-label">Maldives</span>
                <span className="price-tag">${basePricePerNight}</span>
              </div>
            </div>
          </div>

          {/* Form Input Parameter Stacks */}
          <div className="parameter-input-group">
            <label>Check-In Date</label>
            <input 
              type="date" 
              name="checkIn" 
              required 
              min={todayString} 
              value={formData.checkIn} 
              onChange={handleInputChange} 
              className="parameter-field"
            />
          </div>

          <div className="parameter-input-group">
            <label>Check-Out Date</label>
            <input 
              type="date" 
              name="checkOut" 
              required 
              min={formData.checkIn || todayString} 
              value={formData.checkOut} 
              onChange={handleInputChange} 
              className="parameter-field"
            />
          </div>

          <div className="parameter-input-group">
            <label>Guest Information</label>
            <select name="guests" value={formData.guests} onChange={handleInputChange} className="parameter-field select-field">
              {[...Array(maxGuests)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? "s" : ""}</option>
              ))}
            </select>
          </div>

          {/* Hidden/Desktop Identification Fields integrated smoothly */}
          <div className="identification-fields-hidden">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required className="parameter-field" />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required className="parameter-field" />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required className="parameter-field" />
            <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} className="parameter-field" />
          </div>

          {/* Pricing Calculation Summary Layout Box */}
          <div className="price-summary-card">
            <h4>Price Summary</h4>
            
            <div className="summary-data-inputs">
              <input type="text" placeholder="Full Name" disabled className="summary-stub-input" />
              <div className="calculation-row">
                <input type="email" placeholder="Email Address" disabled className="summary-stub-input" />
                <span className="multiplication-text">
                  {pricingSummary.nights} Night, 1/ = ${pricingSummary.finalTotal}
                </span>
              </div>
            </div>

            <div className="summary-total-footer">
              <span className="total-label">Total</span>
              <span className="total-value">${pricingSummary.finalTotal}</span>
            </div>
          </div>

          {error && <div className="error-banner">{error}</div>}

          {/* Primary Blueprint Call To Action Submit Button */}
          <button type="submit" className="confirm-booking-action-btn">
            Confirm & Book
          </button>
        </form>
      </div>
    </div>
  );
}
