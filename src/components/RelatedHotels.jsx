// related.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from '../context/LocationContext'; // add this
import './RelatedHotels.css';

const RelatedHotels = ({ relatedHotelsList }) => {
  const navigate = useNavigate();
  const { location: userLocation } = useLocation(); // add this

  if (!relatedHotelsList || relatedHotelsList.length === 0) return null;

  // Split hotels
  const localHotels = userLocation 
    ? relatedHotelsList.filter(h => h.state === userLocation.state)
    : [];
  const otherHotels = userLocation
    ? relatedHotelsList.filter(h => h.state !== userLocation.state)
    : relatedHotelsList;

  const renderCard = (item) => (
    <div
      key={item.id}
      className="related-item-card"
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/hotel/${item.id}`)}
      onKeyDown={(e) => { if (e.key === "Enter") navigate(`/hotel/${item.id}`) }}
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
  );

  return (
    <div className="related-section-section">
      {localHotels.length > 0 && (
        <>
          <div className="related-section-header">
            <h2 className="related-section-title">Hotels in {userLocation.state}</h2>
          </div>
          <div className="related-horizontal-scroll-wrapper">
            <div className="related-cards-shelf">
              {localHotels.map(renderCard)}
            </div>
          </div>
        </>
      )}

      <div className="related-section-header">
        <h2 className="related-section-title">
          {userLocation ? 'Explore other locations' : 'Similar Stays Nearby'}
        </h2>
      </div>
      <div className="related-horizontal-scroll-wrapper">
        <div className="related-cards-shelf">
          {otherHotels.map(renderCard)}
        </div>
      </div>
    </div>
  );
};

export default RelatedHotels;