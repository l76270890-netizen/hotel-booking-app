import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import "./Hotel.css";

export const HOTEL_ROOMS_DATA = [
  //... keep your first 6 hotels as is
  // FIX: make slugs unique for last 7 hotels
  {
    id: 7,
    slug: "allhotel1",
    title: "The Grand Oasis Resort",
    description: "A breathtaking coastal luxury suite featuring panoramic ocean views, private infinity pool access, and inclusive 5-star fine dining options.",
    image: "/4.jpg",
    rating: 4.9,
    price: 340,
    location: "Maldives",
    images: ["/4.jpg", "/3.jpg", "/card5.jpg"],
    amenities: ["Infinity Pool", "Ocean View", "5-Star Dining", "Spa", "Free Wi-Fi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Wake up to turquoise waters at The Grand Oasis. Private butler service, sunset cruises, and overwater villas make this Maldives escape unforgettable."
  },
  {
    id: 8,
    slug: "allhotel2",
    title: "Alpine Timber Chalet",
    description: "Nestled in snowy peaks, featuring stone fireplaces, cedar hot tubs, ski-in/ski-out corridors, and heated terrace flooring.",
    image: "/card6.jpg",
    rating: 4.8,
    price: 210,
    location: "Zermatt, Switzerland",
    images: ["/card6.jpg", "/atomic 4.jpg", "/card4.jpg"],
    amenities: ["Ski-in/Ski-out", "Hot Tub", "Fireplace", "Mountain View"],
    specs: { guests: 4, bedrooms: 2, beds: 3, bathrooms: 2 },
    longDescription: "Cozy Alpine luxury with direct ski access. Warm up by the fire after a day on the slopes, then soak in your private hot tub under the stars."
  },
  {
    id: 9,
    slug: "allhotel3",
    title: "Urban Skyline Penthouse",
    description: "A minimal, state-of-the-art skyscraper suite offering multi-floor smart glass automation, rapid check-ins, and club access privileges.",
    image: "/card3.jpg",
    rating: 4.5,
    price: 185,
    location: "Tokyo, Japan",
    images: ["/card3.jpg", "/card4.jpg", "/atomic 2.jpg"],
    amenities: ["Smart Home", "City View", "Club Access", "24/7 Concierge"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 2 },
    longDescription: "Live above Tokyo. Floor-to-ceiling windows, voice-controlled everything, and direct elevator to the rooftop club."
  },
  {
    id: 10,
    slug: "allhotel4",
    title: "Emerald Rainforest Lodge",
    description: "An eco-conscious sanctuary with automated ventilation, private canopy suspension trails, and guided natural waterfall treks.",
    image: "/card4.jpg",
    rating: 4.7,
    price: 160,
    location: "Costa Rica",
    images: ["/card7.jpg", "/atomic 1.jpg", "/atomic 3.jpg"],
    amenities: ["Eco Lodge", "Waterfall Tours", "Canopy Walk", "Organic Meals"],
    specs: { guests: 3, bedrooms: 1, beds: 2, bathrooms: 1 },
    longDescription: "Sleep surrounded by jungle sounds. Guided nature walks, sustainable design, and waterfall swimming pools."
  },
  {
    id: 11,
    slug: "allhotel5",
    title: "Serene Desert Pavilion",
    description: "Unparalleled geometric villas with isolated stargazing glass roofs, custom dunebuggy rentals, and open sunset lounge areas.",
    image: "/card7.jpg",
    rating: 4.6,
    price: 295,
    location: "Dubai, UAE",
    images: ["/card7.jpg", "/atomic 1.jpg", "/atomic 3.jpg"],
    amenities: ["Glass Roof", "Dunebuggy", "Stargazing", "Sunset Lounge"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Luxury in the dunes. Transparent ceilings for night sky views, private dunebuggy safaris, and infinity pools in the desert."
  },
  {
    id: 12,
    slug: "allhotel6",
    title: "Mediterranean Cliffside Inn",
    description: "Traditional sun-washed stone rooms featuring cliffside balcony sun decks, infinity jacuzzis, and curated wine pairings.",
    image: "/2.jpg",
    rating: 4.9,
    price: 410,
    location: "Santorini, Greece",
    images: ["/2.jpg", "/5.jpg", "/12.jpg"],
    amenities: ["Cliffside View", "Jacuzzi", "Wine Tasting", "Sunset Deck"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Santorini perfection. Watch sunsets from your private balcony jacuzzi with a glass of local Assyrtiko wine."
  },
  {
  id: 13,
  slug: "pavilion-sweets",
  title: "Pavilion Sweets",
  description: "Unparalleled geometric villas with isolated stargazing glass roofs, custom dunebuggy rentals, and open sunset lounge areas.",
  image: "/card6.jpg",
  rating: 4.6,
  price: 295,
  location: "Dubai, UAE",
  images: ["/card6.jpg", "/atomic 2.jpg", "/card3.jpg"],
  amenities: ["Glass Roof", "Dunebuggy", "Stargazing", "Sunset Lounge"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Luxury in the dunes..."
},
{
  id: 14,
  slug: "light-house-retreat",
  title: "Light House Retreat",
  description: "Unparalleled geometric villas with isolated stargazing glass roofs...",
  image: "/9.jpg",
  rating: 4.6,
  price: 295,
  location: "Dubai, UAE",
  images: ["/9.jpg", "/card1.jpg", "/card3.jpg"],
  amenities: ["Glass Roof", "Dunebuggy", "Stargazing", "Sunset Lounge"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Luxury in the dunes..."
},
{
  id: 15,
  slug: "sapphire-bay-villas",
  title: "Sapphire Bay Villas",
  description: "Luxury coastal villas with modern design.",
  image: "/card8.jpg",
  rating: 4.6,
  price: 295,
  location: "Dubai, UAE",
  images: ["/card8.jpg", "/atomic 1.jpg", "/atomic 4.jpg"],
  amenities: ["Glass Roof", "Dunebuggy", "Stargazing", "Sunset Lounge"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Luxury in the dunes..."
},
{
  id: 16,
  slug: "golden-dune-resort",
  title: "Golden Dune Resort",
  description: "Luxury desert experience.",
  image: "/card9.jpg",
  rating: 4.6,
  price: 295,
  location: "Dubai, UAE",
  images: ["/card9.jpg", "/atomic 4.jpg", "/card3.jpg"],
  amenities: ["Glass Roof", "Dunebuggy", "Stargazing", "Sunset Lounge"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Luxury in the dunes..."
},
{
  id: 17,
  slug: "azure-coast-hotel",
  title: "Azure Coast Hotel",
  description: "Ocean luxury escape.",
  image: "/card7.jpg",
  rating: 4.6,
  price: 295,
  location: "Dubai, UAE",
  images: ["/card2.jpg", "/card1.jpg", "/card3.jpg"],
  amenities: ["Glass Roof", "Dunebuggy", "Stargazing", "Sunset Lounge"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Luxury in the dunes..."
},
{
  id: 18,
  slug: "velvet-moon-hotel",
  title: "Velvet Moon Hotel",
  description: "Luxury night-view hotel.",
  image: "/card5.jpg",
  rating: 4.6,
  price: 295,
  location: "Dubai, UAE",
  images: ["/card5.jpg", "/card1.jpg", "/card3.jpg"],
  amenities: ["Glass Roof", "Dunebuggy", "Stargazing", "Sunset Lounge"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Luxury in the dunes..."
},
{
  id: 19,
  slug: "crystal-lake-lodge",
  title: "Crystal Lake Lodge",
  description: "Lakeside luxury stay.",
  image: "/6.jpg",
  rating: 4.6,
  price: 295,
  location: "Dubai, UAE",
  images: ["/atomic-4.jpg", "/card8.jpg", "/card3.jpg"],
  amenities: ["Glass Roof", "Dunebuggy", "Stargazing", "Sunset Lounge"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Luxury in the dunes..."
}
];

const All = ({ favorites, toggleFavorite }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHotels = HOTEL_ROOMS_DATA.filter((hotel) => {
    const cleanQuery = searchQuery.toLowerCase().trim();
    return (
      hotel.title.toLowerCase().includes(cleanQuery) || 
      hotel.location.toLowerCase().includes(cleanQuery) ||
      hotel.description.toLowerCase().includes(cleanQuery)
    );
  });

  const navigate = useNavigate();
const { user } = useContext(AuthContext);

  return (
    <div className="hotel-app-container">
      <header className="hotel-header-section">
        <div className="title-header">
          <div className="header-title-wrapper">
            <h1 className="header-main-title">Hotel Booking</h1>
            
            {/* FIX 1: Heart icon with count badge */}
            <div className="header-heart">
              <Link to="/saved" className="view-all-btn-back-link">
              <span className="heart-icon">♡</span>
             </Link>
              {favorites.length > 0 && (
                <span className="heart-count">{favorites.length}</span>
              )}
            </div>
          </div>
          
          <p className="header-subtitle">Browse our absolute collection of premier accommodations around the globe.</p>
          
          <Link to="/" className="view-all-btn-back-link">
            <span className="back-icon">‹</span> 
          </Link>

          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search by city, region, or resort name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-box"
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery("")}>
                ✕
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="web-grid">
        {filteredHotels.map((hotel) => {
          const currentRating = hotel.rating || 0;
          const fullStars = Math.floor(currentRating);
          const emptyStars = 5 - fullStars;
          const isFavorited = favorites.includes(hotel.id);
          
          
          return (
            <Link to={`/${hotel.slug}`} className="web-card-link" key={hotel.id}>
              <div className="web-card">
                <div className="card-image-wrapper">
                  <img src={hotel.image} alt={hotel.title} loading="lazy" />
                  
                  {/* FIX 2: stopPropagation so click doesn't trigger Link */}
                  <button 
                    className={`card-favorite-btn ${isFavorited ? 'active' : ''}`}
                   onClick={(e) => {
  e.preventDefault();
  e.stopPropagation();

  if (!user) {
    navigate("/login");
    return;
  }

  toggleFavorite(hotel.id);
}}
                  >
                    {isFavorited ? '♥' : '♡'}
                  </button>
                </div>
                
                <div className="card-content">
                  <div className="card-text-block">
                    <h3>{hotel.title}</h3>
                    <p>{hotel.description}</p>
                  </div>
                  
                  <div className="card-rating">
                    <span className="stars-gold">{"★".repeat(fullStars)}</span>
                    <span className="stars-gray">{"☆".repeat(emptyStars)}</span>
                    <span className="rating-text">({currentRating.toFixed(1)})</span>
                  </div>
                  
                  <div className="card-footer-meta">
                    <div className="card-price-wrapper">
                      <span className="price-amount">${hotel.price}</span>
                      <span className="card-price-label">/ night</span>
                    </div>
                  <button
  className="hotel-card-btn"
  onClick={(e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    alert("Proceeding to booking...");
  }}
>
  Book Now
</button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default All;