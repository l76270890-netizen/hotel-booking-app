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
  const taxesAndFeesPerNight = Math.round(basePricePerNight * 0.15); 
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
      return { nights: 0, roomTotal: 0, taxTotal: 0, finalTotal: 0 };
    }

    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    
    start.setHours(0,0,0,0);
    end.setHours(0,0,0,0);
    
    const timeDiff = end.getTime() - start.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (nights <= 0) return { nights: 0, roomTotal: 0, taxTotal: 0, finalTotal: 0 };

    const roomTotal = nights * basePricePerNight;
    const taxTotal = nights * taxesAndFeesPerNight;
    const finalTotal = roomTotal + taxTotal;

    return { nights, roomTotal, taxTotal, finalTotal };
  }, [formData.checkIn, formData.checkOut, basePricePerNight, taxesAndFeesPerNight]);

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
            Thank you, <strong>{formData.firstName}</strong>. Your luxury stay at <strong>{selectedHotel.title || selectedHotel.hotelName}</strong> is fully secured.
          </p>
          <div className="success-details">
            <p><strong>Confirmation Email:</strong> {formData.email}</p>
            <p><strong>Duration:</strong> {pricingSummary.nights} Night(s)</p>
          </div>
          <button onClick={() => navigate("/")} className="primary-btn">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <header className="booking-header-wrapper">
        <div className="booking-header-text">
          <h1>Secure Checkout</h1>
          <p>Review stay metrics and finalize guest details below.</p>
        </div>
        <button onClick={() => navigate(-1)} className="header-back-btn" title="Go Back">
          ✕
        </button>
      </header>

      <div className="booking-layout">
        {/* Left Form Panel */}
        <section className="form-section">
          <form onSubmit={handleSubmit} className="booking-form">
            
            <div className="step-block">
              <div className="step-header">
                <span className="step-number">1</span>
                <h3 className="section-title">Guest Identification</h3>
              </div>
              
              <div className="form-row">
                <div className="input-group">
                  <label>First Name</label>
                  <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="booking-input" placeholder="John" />
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="booking-input" placeholder="Doe" />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Email Address</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="booking-input" placeholder="john.doe@example.com" />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="booking-input" placeholder="+234..." />
                </div>
              </div>
            </div>

            <div className="step-block">
              <div className="step-header">
                <span className="step-number">2</span>
                <h3 className="section-title">Stay Parameter Rules</h3>
              </div>
              
              <div className="form-row">
                <div className="input-group">
                  <label>Check-in Date</label>
                  <input type="date" name="checkIn" required min={todayString} value={formData.checkIn} onChange={handleInputChange} className="booking-input" />
                </div>
                <div className="input-group">
                  <label>Check-out Date</label>
                  <input type="date" name="checkOut" required min={formData.checkIn || todayString} value={formData.checkOut} onChange={handleInputChange} className="booking-input" />
                </div>
              </div>

              <div className="input-group">
                <label>Total Attendance</label>
                <select name="guests" value={formData.guests} onChange={handleInputChange} className="booking-input">
                  {[...Array(maxGuests)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? "s" : ""}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Special Arrangements (Optional)</label>
                <textarea name="specialRequests" rows="3" value={formData.specialRequests} onChange={handleInputChange} className="booking-input booking-textarea" placeholder="High floors, dietary preferences, late check-in..." />
              </div>
            </div>

            {error && <div className="error-banner">{error}</div>}

            <button type="submit" className="primary-btn submit-btn">
              Complete Secure Booking
            </button>
          </form>
        </section>

        {/* Right Summary Panel - Moves to bottom on mobile via CSS ordering */}
        <aside className="summary-section">
          <div className="summary-card">
            <div className="image-container">
              <img src={selectedHotel.image} alt={selectedHotel.title} className="room-image" />
              <span className="location-badge">{selectedHotel.location || "Premium Resort"}</span>
            </div>
            
            <div className="summary-content">
              <h3 className="room-name">{selectedHotel.title || selectedHotel.hotelName}</h3>
              <p className="hotel-subtext">Verified Luxury Accommodations</p>
              
              <hr className="price-divider" />

              <div className="price-row">
                <span className="label-text">Base Rate / Night</span>
                <span className="value-text">${basePricePerNight}</span>
              </div>
              <div className="price-row">
                <span className="label-text">Estimated Surcharges & Taxes</span>
                <span className="value-text">${taxesAndFeesPerNight}</span>
              </div>

              {pricingSummary.nights > 0 && (
                <>
                  <div className="price-row highlight">
                    <span className="label-text">Nights Count</span>
                    <span className="value-text">{pricingSummary.nights}x</span>
                  </div>
                  <hr className="price-divider" />
                  <div className="price-row total">
                    <span className="label-text">Total Cost</span>
                    <span className="value-text">${pricingSummary.finalTotal}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
