import React from 'react';
import { Link } from 'react-router-dom';
import "./Websites.css"; 

// 👉 FIXED: Destructure allHotels instead of PROJECT_DATA to capture both hotel arrays
const SavedHotels = ({ favorites = [], toggleFavorite, allHotels = [] }) => {
  
  // Filters out the saved hotels from the combined listing data passed from app.jsx
  const likedHotels = allHotels.filter((project) => favorites.includes(project.id));

  return (
    <div className="portfolio-container" style={{ paddingBottom: '100px', paddingTop: '100px' }}>
      <div className="portfolio-header">
        <h1>Your Saved Accommodations</h1>
        <Link to="/" className="view-all-btn">
           Back
        </Link>
      </div>

      {likedHotels.length > 0 ? (
        <div className="web-grid">
          {likedHotels.map((project) => {
            const currentRating = project.rating || 0;
            const fullStars = Math.floor(currentRating);
            const emptyStars = Math.max(0, 5 - fullStars); // Ensured fallback floor limit

            return (
              <Link 
                to={project.slug ? `/${project.slug}` : `/hotel/${project.id}`} 
                className="web-card-link" 
                key={project.id}
              >
                <div className="web-card">
                  {/* IMAGE WRAPPER PANELS */}
                  <div className="card-image-wrapper">
                    <img src={project.image} alt={project.title} loading="lazy" />
                    <button 
                      className="card-favorite-btn active"
                      onClick={(e) => toggleFavorite(project.id, e)}
                      aria-label="Remove from favorites"
                    >
                      ♥
                    </button>
                  </div>

                  {/* DESCRIPTION META FIELDS */}
                  <div className="card-content">
                    <div className="card-text-block">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                    
                    {/* STAR REVIEW RENDERING */}
                    <div className="card-rating">
                      <span className="stars-gold">{"★".repeat(fullStars)}</span>
                      <span className="stars-gray">{"☆".repeat(emptyStars)}</span>
                      <span className="rating-text">({currentRating.toFixed(1)})</span>
                    </div>
                    
                    {/* CARD PRICING ACTION WRAPPERS */}
                    <div className="card-footer-meta">
                      <div className="card-price-wrapper">
                        <span className="card-price-amount">${project.price}</span>
                        <span className="card-price-label">/ night</span>
                      </div>
                      <button className="hotel-card-btn">Book Now</button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        /* FALLBACK DISPLAY CONTAINER WHEN LIST IS EMPTY */
        <div className="no-results-box" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <span style={{ fontSize: '48px' }}>❤️</span>
          <h2>No saved properties yet</h2>
          <p>Properties you favorite will appear here for easy access.</p>
          <Link to="/" className="view-all-btn" style={{ display: 'inline-block', marginTop: '15px' }}>
            Explore Hotels
          </Link>
        </div>
      )}
    </div>
  );
};

export default SavedHotels;
