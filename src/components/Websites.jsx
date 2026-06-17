import React, { useState } from "react";
import "./Websites.css";
import { Link } from "react-router-dom";

function Websites({ favorites = [], toggleFavorite, showFavoritesOnly = false, PROJECT_DATA }) {
  const [searchQuery, setSearchQuery] = useState("");

  const favoritesFiltered = showFavoritesOnly
   ? PROJECT_DATA.filter((project) => favorites.includes(project.id))
    : PROJECT_DATA;

  const filteredProjects = favoritesFiltered.filter((project) => {
    const cleanQuery = searchQuery.toLowerCase().trim();
    return (
      project.title.toLowerCase().includes(cleanQuery) ||
      project.description.toLowerCase().includes(cleanQuery)
    );
  });

  if (showFavoritesOnly && favorites.length === 0) {
    return (
      <div className="no-results-box">
        <h2>No saved hotels yet ❤️</h2>
        <p>Click the heart icon on any hotel to save it.</p>
      </div>
    );
  }

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <h1>{showFavoritesOnly? "Saved Hotels" : "Nearby Destination"}</h1>
        {!showFavoritesOnly && (
          <Link to="/view-all" className="view-all-btn">View All</Link>
        )}
      </div>

      <div className="search-box-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search hotels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="portfolio-search-input"
        />
        {searchQuery && (
          <button className="cle-search-btn" onClick={() => setSearchQuery("")}>✕</button>
        )}
      </div>

      {filteredProjects.length > 0? (
        <div className="web-grid">
          {filteredProjects.map((project) => {
            const currentRating = project.rating || 0;
            const fullStars = Math.floor(currentRating);
            const emptyStars = 5 - fullStars;
            const isFavorited = favorites.includes(project.id);

            return (
              // CHANGED: to={`/${project.slug}`} instead of /hotel/${id}
              <Link to={`/${project.slug}`} className="web-card-link" key={project.id}>
                <div className="web-card">
                  <div className="card-image-wrapper">
                    <img src={project.image} alt={project.title} loading="lazy" />
                    <button
                      className={`card-favorite-btn ${isFavorited? "active" : ""}`}
                      onClick={(e) => toggleFavorite(project.id, e)}
                      aria-label="Save to favorites"
                    >
                      ♥
                    </button>
                  </div>

                  <div className="card-content">
                    <div className="card-text-block">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>

                    <div className="card-rating">
                      <span className="stars-gold">{"★".repeat(fullStars)}</span>
                      <span className="stars-gray">{"☆".repeat(emptyStars)}</span>
                      <span className="rating-text">({currentRating.toFixed(1)})</span>
                    </div>

                    <div className="card-footer-meta">
                      <div className="card-price-wrapper">
                        <span className="card-price-amount">${project.price}</span>
                        <span className="card-price-label"> / night</span>
                      </div>
                      <button className="hotel-card-btn" onClick={(e) => e.preventDefault()}>
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="no-results-box">
          <p>No hotels match "{searchQuery}"</p>
          <button onClick={() => setSearchQuery("")}>Reset Filter</button>
        </div>
      )}
    </div>
  );
}

export default Websites;