import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingSummery.css';

export default function BookingSummery() {
  const location = useLocation();
  const navigate = useNavigate();

  // Safely intercept the router location state payload objects
  const bookingData = location.state?.bookingData;
  const formData = location.state?.formData;

  // Safety Shield: Redirect to homepage if a user refreshes the tab manually and context is wiped out
  if (!bookingData || !formData) {
    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <h2>No Active Booking Session Found</h2>
        <button onClick={() => navigate("/")} style={{ padding: "10px 20px", cursor: "pointer" }}>
          Return to Dashboard
        </button>
      </div>
    );
  }

  const totalRoomPrice = bookingData.pricePerNight * bookingData.nights;
  const totalAmount = totalRoomPrice + bookingData.taxesAndFees;

  return (
    <div className="booking-container">
      <h1 className="booking-title">Review Your Booking</h1>
      <div className="booking-layout">
        
        {/* Guest Information Presentation Box */}
        <div className="guest-details-card">
          <h2 className="card-title">Guest Details</h2>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Guest Name</label>
              <p className="form-input-text">{formData.firstName} {formData.lastName}</p>
            </div>
            <div className="form-group col-span-2">
              <label className="form-label">Email Address</label>
              <p className="form-input-text">{formData.email}</p>
            </div>
          </div>
        </div>

        {/* Dynamic Sidebar Receipt Calculations Invoice */}
        <div className="summary-sidebar-card">
          <h2 className="card-title">Summary</h2>
          <p><strong>Hotel:</strong> {bookingData.hotelName}</p>
          <p><strong>Nights:</strong> {bookingData.nights}</p>
          <p><strong>Total Price:</strong> ${totalAmount.toFixed(2)}</p>
          
          <button className="submit-button" onClick={() => navigate("/payment", { state: location.state })}>
            Proceed to Payment
          </button>
        </div>

      </div>
    </div>
  );
}
