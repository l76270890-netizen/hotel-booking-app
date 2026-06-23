import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RelatedHotels.css';

const RelatedHotels = ({ relatedHotelsList }) => {
  const navigate = useNavigate();

  // Safely intercept if there are no recommendations to show
  if (!relatedHotelsList || relatedHotelsList.length === 0) return null;

  return (
    <div className="related-section-section">
      {/* Integrated Section Heading */}
      <div className="related-section-header">
        <h2 className="related-section-title">Similar Stays Nearby</h2>
        <span className="related-section-subtitle">
          {relatedHotelsList.length} curated options you might like
        </span>
      </div>

      {/* Horizontal Scrollable Slider Container */}
      <div className="related-horizontal-scroll-wrapper">
        <div className="related-cards-shelf">
          {relatedHotelsList.map((item) => (
           <div
  key={item.id}
  className="related-item-card"
  role="button"
  tabIndex={0}
  onClick={() => {
    navigate(`/hotel/${item.id}`);
  }}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      navigate(`/hotel/${item.id}`);
    }
  }}
>
              <div className="related-card-image-frame">
                <img src={item.image} alt={item.title} className="related-card-img" />
                <div className="related-rating-badge">
                  <span className="star">★</span> {item.rating}
                </div>
              </div>

              <div className="related-card-details">
                <h4 className="related-hotel-title">{item.title}</h4>
                <p className="related-hotel-location">📍 {item.location}</p>
                
                <div className="related-pricing-row">
                  <p className="related-hotel-price">
                    <strong>${item.price}</strong>
                    <span className="per-night-text"> / night</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedHotels;
