import React from 'react';
import "./Footer.css";

const Footer = () => {
 return (
  <footer className="hotel-footer">
    <div className="footer-container">
      
      {/* Brand & Newsletter Section */}
      <div className="footer-brand-section">
        <h3 className="footer-logo">StayEase</h3>
        <p className="footer-brand-desc">
          Book your perfect stay instantly. Discover millions of luxury hotels, boutique rooms, and holiday rentals worldwide.
        </p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Your email address" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      {/* Link Column 1: Explore */}
      <div className="footer-links-column">
        <h4>Explore</h4>
        <ul>
          <li><a href="#hotels">Hotels</a></li>
          <li><a href="#resorts">Luxury Resorts</a></li>
          <li><a href="#villas">Private Villas</a></li>
          <li><a href="#apartments">Serviced Apartments</a></li>
          <li><a href="#deals">Exclusive Deals</a></li>
        </ul>
      </div>

      {/* Link Column 2: Top Destinations */}
      <div className="footer-links-column">
        <h4>Popular Hubs</h4>
        <ul>
          <li><a href="#tokyo">Tokyo, Japan</a></li>
          <li><a href="#bangkok">Bangkok, Thailand</a></li>
          <li><a href="#paris">Paris, France</a></li>
          <li><a href="#london">London, UK</a></li>
          <li><a href="#ny">New York, USA</a></li>
        </ul>
      </div>

      {/* Link Column 3: Support */}
      <div className="footer-links-column">
        <h4>Support Desk</h4>
        <ul>
          <li><a href="#help">Help Centre</a></li>
          <li><a href="#cancel">Manage Bookings</a></li>
          <li><a href="#refunds">Refund Policies</a></li>
          <li><a href="#contact">24/7 Concierge Contact</a></li>
          <li><a href="#safety">Travel Advisories</a></li>
        </ul>
      </div>

    </div>

    {/* Bottom Copyright & Legal Bar */}
    <div className="footer-bottom-bar">
      <p>&copy; {new Date().getFullYear()} StayEase Inc. All rights reserved.</p>
      <div className="footer-legal-links">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
        <a href="#cookies">Cookie Preferences</a>
      </div>
    </div>
  </footer>
);

};

export default Footer;
