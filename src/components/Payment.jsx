import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state?.bookingData;
  const formData = location.state?.formData;

  const [paymentMethod, setPaymentMethod] = useState("card");

  if (!bookingData || !formData) {
    return (
      <div className="payment-error">
        <h2>No Active Booking Found</h2>

        <button
          onClick={() => navigate("/")}
          className="back-btn"
        >
          Return Home
        </button>
      </div>
    );
  }

  const totalRoomPrice =
    bookingData.pricePerNight * bookingData.nights;

  const totalAmount =
    totalRoomPrice + bookingData.taxesAndFees;

  const handlePayment = () => {
    alert("Payment Successful!");

    navigate("/", {
      replace: true
    });
  };

  return (
    <div className="payment-page">
       <button
    className="back-btn"
    onClick={() => navigate(-1)}
  >
    ← Back
  </button>

      <div className="payment-container">

        {/* LEFT SIDE */}

        <div className="payment-form">

          <h2>Payment Details</h2>

          <p className="subtitle">
            Complete your reservation securely.
          </p>

          {/* Guest Information */}

          <div className="section">

            <h3>Guest Information</h3>

            <div className="info-box">
              <p>
                <strong>Name:</strong>{" "}
                {formData.firstName} {formData.lastName}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {formData.email}
              </p>
            </div>

          </div>

          {/* Payment Method */}

          <div className="section">

            <h3>Select Payment Method</h3>

            <div className="methods">

              <button
                className={
                  paymentMethod === "card"
                    ? "method active"
                    : "method"
                }
                onClick={() =>
                  setPaymentMethod("card")
                }
              >
                💳 Card
              </button>

              <button
                className={
                  paymentMethod === "paystack"
                    ? "method active"
                    : "method"
                }
                onClick={() =>
                  setPaymentMethod("paystack")
                }
              >
                Paystack
              </button>

            </div>

          </div>

          {/* Card Form */}

          {paymentMethod === "card" && (

            <div className="section">

              <input
                type="text"
                placeholder="Card Number"
              />

              <div className="row">

                <input
                  type="text"
                  placeholder="MM / YY"
                />

                <input
                  type="password"
                  placeholder="CVV"
                />

              </div>

              <input
                type="text"
                placeholder="Card Holder Name"
              />

            </div>

          )}

          {paymentMethod === "paystack" && (

            <div className="paystack-box">
              You will be redirected to Paystack
              after clicking Pay Now.
            </div>

          )}

          <button
            className="pay-btn"
            onClick={handlePayment}
          >
            Pay ${totalAmount.toFixed(2)}
          </button>

          <p className="secure">
            🔒 Secure SSL Protected Payment
          </p>

        </div>

        {/* RIGHT SIDE */}

        <div className="booking-summary">

          <h2>Booking Summary</h2>

          {bookingData.image && (
            <img
              src={bookingData.image}
              alt={bookingData.hotelName}
            />
          )}

          <h3>{bookingData.hotelName}</h3>

          <div className="summary-item">
            <span>Guest</span>
            <span>
              {formData.firstName}
            </span>
          </div>

          <div className="summary-item">
            <span>Room Price</span>
            <span>
              ${bookingData.pricePerNight}
            </span>
          </div>

          <div className="summary-item">
            <span>Nights</span>
            <span>
              {bookingData.nights}
            </span>
          </div>

          <div className="summary-item">
            <span>Room Total</span>
            <span>
              ${totalRoomPrice.toFixed(2)}
            </span>
          </div>

          <div className="summary-item">
            <span>Taxes & Fees</span>
            <span>
              ${bookingData.taxesAndFees.toFixed(2)}
            </span>
          </div>

          <hr />

          <div className="summary-item total">
            <span>Total Amount</span>
            <span>
              ${totalAmount.toFixed(2)}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}