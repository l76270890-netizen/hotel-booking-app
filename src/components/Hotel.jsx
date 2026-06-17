import React, { useState } from 'react';

export const HOTEL_ROOMS_DATA = [
  {
    id: 1,
    title: "The Grand Oasis Resort",
    description: "A breathtaking coastal luxury suite featuring panoramic ocean views, private infinity pool access, and inclusive 5-star fine dining options.",
    image: "card1.jpg",
    rating: 4.9,
    price: 340,
    location: "Maldives"
  },
  {
    id: 2,
    title: "Alpine Timber Chalet",
    description: "Nestled in snowy peaks, featuring stone fireplaces, cedar hot tubs, ski-in/ski-out corridors, and heated terrace flooring.",
    image: "https://unsplash.com",
    rating: 4.8,
    price: 210,
    location: "Zermatt, Switzerland"
  },
  {
    id: 3,
    title: "Urban Skyline Penthouse",
    description: "A minimal, state-of-the-art skyscraper suite offering multi-floor smart glass automation, rapid check-ins, and club access privileges.",
    image: "https://unsplash.com",
    rating: 4.5,
    price: 185,
    location: "Tokyo, Japan"
  },
  {
    id: 4,
    title: "Emerald Rainforest Lodge",
    description: "An eco-conscious sanctuary with automated ventilation, private canopy suspension trails, and guided natural waterfall treks.",
    image: "https://unsplash.com",
    rating: 4.7,
    price: 160,
    location: "Costa Rica"
  },
  {
    id: 5,
    title: "Serene Desert Pavilion",
    description: "Unparalleled geometric villas with isolated stargazing glass roofs, custom dunebuggy rentals, and open sunset lounge areas.",
    image: "https://unsplash.com",
    rating: 4.6,
    price: 295,
    location: "Dubai, UAE"
  },
  {
    id: 6,
    title: "Mediterranean Cliffside Inn",
    description: "Traditional sun-washed stone rooms featuring cliffside balcony sun decks, infinity jacuzzis, and curated wine pairings.",
    image: "https://unsplash.com",
    rating: 4.9,
    price: 410,
    location: "Santorini, Greece"
  }
];

const HotelPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  
  // Dynamic App Routing States: "featured" (landing view), "all" (complete catalog), "favorites" (saved items)
  const [viewMode, setViewMode] = useState("featured"); 

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  // Base Data routing switches depending on selected tab menu options
  const getBaseData = () => {
    if (viewMode === "favorites") {
      return HOTEL_ROOMS_DATA.filter(hotel => favorites.includes(hotel.id));
    }
    if (viewMode === "featured") {
      // Return only a curated slice of properties for the landing layout
      return HOTEL_ROOMS_DATA.slice(0, 3);
    }
    return HOTEL_ROOMS_DATA;
  };

  const filteredHotels = getBaseData().filter((hotel) => {
    const cleanQuery = searchQuery.toLowerCase().trim();
    return (
      hotel.title.toLowerCase().includes(cleanQuery) || 
      hotel.location.toLowerCase().includes(cleanQuery) ||
      hotel.description.toLowerCase().includes(cleanQuery)
    );
  });

  return (
    <div className="hotel-app-container">
      {/* 1. Global Navigation Bar Component */}
      <nav className="hotel-navbar">
        <div className="nav-brand" onClick={() => { setViewMode("featured"); setSearchQuery(""); }}>
          <span>✦</span> StayElite
        </div>
        <div className="nav-actions">
          <button 
            className={`nav-tab-btn ${viewMode === "featured" || viewMode === "all" ? "active" : ""}`}
            onClick={() => setViewMode("featured")}
          >
            Explore Stays
          </button>
          <button 
            className={`nav-tab-btn fav-tab ${viewMode === "favorites" ? "active" : ""}`}
            onClick={() => setViewMode("favorites")}
          >
            Saved Library <span className="badge">{favorites.length}</span>
          </button>
        </div>
      </nav>

      {/* 2. Page Dynamic Title Header Text block containing the dynamic View All button toggle */}
      <header className="hotel-header-section">
        <div className="portfolio-header">
          <h1 className="header-main-title">
            {viewMode === "favorites" && "Your Curated Wishlist"}
            {viewMode === "featured" && "Nearby Destination"}
            {viewMode === "all" && "Hotel Bookings"}
          </h1>
          
          {/* Dynamic View All trigger block option */}
          {viewMode === "featured" && (
            <p className="view-all-btn" onClick={() => setViewMode("all")}>
              View All
            </p>
          )}
          {viewMode === "all" && (
            <p className="view-all-btn back-link" onClick={() => setViewMode("featured")}>
              ← Back
            </p>
          )}
        </div>
        <p className="header-subtitle">
          {viewMode === "favorites" && "Review details for your hand-picked luxury suites."}
          {viewMode === "featured" && "Handpicked premier luxury suites for your immediate weekend getaway exploration."}
          {viewMode === "all" && "Browse our absolute collection of available premium accommodations around the globe."}
        </p>
      </header>

      {/* 3. Operational Input Search Box Filter system */}
      <div className="search-box-wrapper">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Search by city, region, or resort name..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="portfolio-search-input"
        />
        {searchQuery && (
          <button className="clear-search-btn" onClick={() => setSearchQuery("")}>✕</button>
        )}
      </div>

      {/* 4. Dynamic Listing Layout Grid */}
      {filteredHotels.length > 0 ? (
        <div className="web-grid">
          {filteredHotels.map((hotel) => {
            const currentRating = hotel.rating || 0;
            const fullStars = Math.floor(currentRating);
            const emptyStars = 5 - fullStars;
            const isFavorited = favorites.includes(hotel.id);

            return (
              <div className="web-card" key={hotel.id}>
                <div className="card-image-wrapper">
                  <img src={hotel.image} alt={hotel.title} loading="lazy" />
                  <span className="card-location-tag">{hotel.location}</span>
                  
                  <button 
                    className={`card-favorite-btn ${isFavorited ? 'active' : ''}`}
                    onClick={(e) => toggleFavorite(hotel.id, e)}
                    aria-label="Add suite to favorites"
                  >
                    ♥
                  </button>
                </div>

                <div className="card-content">
                  <div className="card-text-block">
                    <h3>{hotel.title}</h3>
                    <p>{hotel.description}</p>
                  </div>
                  
                  <div className="card-meta-row">
                    <div className="card-rating">
                      <span className="stars-gold">{"★".repeat(fullStars)}</span>
                      <span className="stars-gray">{"☆".repeat(emptyStars)}</span>
                      <span className="rating-text">({currentRating.toFixed(1)})</span>
                    </div>
                    <div className="card-pricing-block">
                      <span className="price-amount">${hotel.price}</span>
                      <span className="price-unit">/ night</span>
                    </div>
                  </div>
                  
                  <button className="hotel-card-btn">Confirm Reservation</button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* 5. Fallback context blocks */
        <div className="no-results-box">
          <div className="fallback-symbol">{viewMode === "favorites" ? "♥" : "🏙️"}</div>
          <h2>
            {viewMode === "favorites" ? "Your saved list is empty" : "No suites found"}
          </h2>
          <p>
            {viewMode === "favorites" 
              ? "Tap the love shape heart icon on any hotel card to compile properties here."
              : `We couldn't locate matching results for "${searchQuery}". Please verify spelling.`}
          </p>
          <button 
            className="reset-action-btn"
            onClick={() => { setViewMode("featured"); setSearchQuery(""); }}
          >
            Return to Explorations
          </button>
        </div>
      )}
    </div>
  );
};
export default HotelPage;
