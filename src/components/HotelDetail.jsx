import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RelatedHotels from "./RelatedHotels"; 
import "./HotelDetail.css";

const ALL_HOTELS_DATABASE = [
  {
    id: 1,
    slug: "hotel1",
     title: "Radisson Blu Anchorage Hotel",
    description: "Modern Scandinavian-style hotel on the lagoon. Known for surface Bar & Grill and toptier suites.",
    image: "2.jpg",
    rating: 4.6,
    price: 263,
    location: "Victoria Island, Lagos Nigeria",
    images: ["/2.jpg", "/3.jpg", "/card5.jpg"],
    amenities: ["Lagoon views", "Pool", "Breakfast", "Parking", "Meeting Room", "fine dining", "Free Wi-Fi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Step into luxury at Coffee Shop Landing. Wake up to ocean waves and enjoy our rooftop infinity pool."
  },
  {
    id: 2,
    slug: "hotel2",
    title: "The Delborough Lagos",
    description: "A dark-mode dashboard showcasing real-time workout metrics, interactive progress charts, and personalized goal tracking.",
    image: "/4.jpg",
    rating: 4.8,
    price: 180,
    location: "Lagos, Nigeria",
    images: ["/4.jpg", "/atomic 2.jpg", "/card4.jpg"],
    amenities: ["Gym", "Spa", "Wi-Fi", "Restaurant"]
  },
  {
    id: 3,
    slug: "hotel3",
    title: "Golden Tulip Hotel",
    description: "A minimalist retail experience built with rapid filtering, high-resolution lookbooks, and a one-click checkout system.",
    image: "/6.jpg",
    rating: 4.3, 
    price: 250,
    location: "Port Harcourt, Nigeria",
    images: ["/6.jpg", "/5.jpg", "/11.jpg"],
    amenities: ["Pool", "Bar", "Wi-Fi", "Room Service"]
  },
  {
    id: 4,
    slug: "hotel4",
    title: "Diamond Heights Suites",
    description: "An immersive portal designed with dynamic destination maps, custom itinerary builders, and automated fare alerts.",
    image: "/9.jpg",
    rating: 4.9,
    price: 250,
    location: "Port Harcourt, Nigeria",
    images: ["/9.jpg", "/7.jpg", "/5.jpg"],
    amenities: ["Beach Access", "Spa", "All-Inclusive", "Wi-Fi"]
  },
  {
    id: 5,
    slug: "hotel5",
    title: "Carlton Swiss Grand Hotel",
    description: "A clean food blog offering intelligent portion scaling, automated grocery lists, and step-by-step video playback.",
    image: "/card7.jpg",
    rating: 4.5,
    price: 95,
    location: "Enugu, Nigeria",
    images: ["/card7.jpg", "/12.jpg", "/13.jpg"],
    amenities: ["Kitchen", "Wi-Fi", "Parking"]
  },
  {
    id: 7,
    slug: "hotel7",
    title: "Sunset Ridge Cabins",
    description: "A stunning coastal escape perched perfectly to capture Nigeria’s finest golden hours. It blends rustic cabin warmth with modern glass architecture, offering panoramic Atlantic ocean views and private sun lounges.",
    image: "/card6.jpg",
    rating: 4.7,
    price: 420,
    location: "Lagos Island",
    images: ["/card6.jpg", "/15.jpg", "/download (1).jpg"],
    amenities: ["Ocean View Balcony", "Private Hot Tub", "Beach Front Access", "Cocktail Bar"]
  },
  {
    id: 9,
     slug: "hotel9",
    title: "Novotal Port Harcourt",
    description: "French Accor brand. Modern business hotel popular with oil & gas executives",
    image: "/card2.jpg",
    rating: 4.7,
    price: 130,
    location: "Port Harcort, Rivers State",
    images: ["/card2.jpg", "/12.jpg", "/download (1).jpg"],
    amenities: ["Bar", "Smart Room Automation", "24-hour room service", "Meeting rooms", "Airport shuttle"],
    specs: { guests: 4, bedrooms: 3, beds: 3, bathrooms: 2 }
  }
];


export default function HotelDetail({ hotel: initialHotel, favorites, toggleFavorite }) {
  const { id } = useParams(); // Tracks URL /hotel/:id
  const navigate = useNavigate();
  const pageContainerRef = useRef(null); // Ref added to handle inner container scroll drops
  
  // Manage internal active context states
  const [activeHotel, setActiveHotel] = useState(initialHotel || ALL_HOTELS_DATABASE[0]);
  const [activeImage, setActiveImage] = useState("");
  const [dynamicRelatedList, setDynamicRelatedList] = useState([]);

  const isFavorite = favorites?.includes(activeHotel?.id);

  // Automatically recalculate states when the browser URL changes or when the initial hotel changes
  useEffect(() => {
    // Priority 1: Check if there's a dynamic URL ID parameters match
    let targetHotel = ALL_HOTELS_DATABASE.find(item => String(item.id) === String(id));
    
    // Priority 2: Fallback to passed prop if route query parameters are empty
    if (!targetHotel) targetHotel = initialHotel;

    if (targetHotel) {
      setActiveHotel(targetHotel);
      setActiveImage(targetHotel?.images?.[0] || targetHotel?.image);

      // Filter out the current active card so it does not recommend itself
      const otherHotels = ALL_HOTELS_DATABASE.filter(item => String(item.id) !== String(targetHotel.id));
      
      // Point ranking scoring track
      const scoredHotels = otherHotels.map(item => {
        let score = 0;
        if (item.location === targetHotel.location) score += 10;
        if (Math.abs(item.price - targetHotel.price) <= 100) score += 3;
        if (item.rating >= 4.5) score += 2;
        return { ...item, matchScore: score };
      });

      const sortedRecommendations = scoredHotels.sort((a, b) => b.matchScore - a.matchScore);
      setDynamicRelatedList(sortedRecommendations.slice(0, 4));

      // 📱 INSTANT MOBILE TOP ALIGNMENT CORRECTIONS
      // 1. Force the layout window back to zero coordinate position immediately
      window.scrollTo(0, 0);

      // 2. Safe-reset global HTML structures if layouts bypass standard window targets
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // 3. Reset wrapper container coordinate position directly if inner heights are fixed
      if (pageContainerRef.current) {
        pageContainerRef.current.scrollTop = 0;
      }
    }
  }, [id, initialHotel]);

  if (!activeHotel) return <div style={{padding: "100px", textAlign: "center"}}>Loading hotel...</div>;

  const offersList = [
    { icon: "🏊‍♂️", title: "Swimming Pool" },
    { icon: "🍳", title: "Complimentary Breakfast" },
    { icon: "🏋️‍♀️", title: "Fitness Center" },
    { icon: "⏰", title: "24/7 Front Desk" }
  ];

  return (
    /* Attached pageContainerRef right here to catch inner scroll overflows on mobile screens */
    <div ref={pageContainerRef} className="hotel-detail-container">
      <div className="gallery-section">
        <div className="main-image-wrapper">
          <img src={activeImage} className="main-image" alt={activeHotel.title} />
          
          <div className="detail-header-overlay">
            <button onClick={() => navigate(-1)} className="back-btn">‹</button>
            <div className="header-actions-right">
              <button
                className={`detail-heart-icon ${isFavorite ? 'active' : ''}`}
                onClick={(e) => toggleFavorite(activeHotel.id, e)}
              >
                {isFavorite ? "♥" : "♡"}
              </button>
              <button className="share-btn">↗</button>
            </div>
          </div>
        </div>
        
        {activeHotel.images && (
          <div className="thumbnail-row">
            {activeHotel.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Thumbnail"
                className={`thumbnail ${activeImage === img ? 'selected' : ''}`}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="detail-content-scroll">
        <div className="hotel-main-header">
          <div className="header-left">
            <h1 className="hotel-title">{activeHotel.title}</h1>
            <p className="hotel-location">📍 {activeHotel.location || "Location not set"}</p>
            <div className="rating-badge">
              <span className="star">★</span> {activeHotel.rating} <span className="reviews-count">(6.8K reviews)</span>
            </div>
          </div>
          <div className="header-right-price">
            <h2>${activeHotel.price}<span className="per-night">/night</span></h2>
          </div>
        </div>

        <hr className="divider" />

        <div className="description-section">
          <p>{activeHotel.description} <span className="read-more-text">...Read more</span></p>
        </div>

        <div className="offers-section">
          <h3>What we offer</h3>
          <div className="offers-grid">
            {offersList.map((offer, i) => (
              <div key={i} className="offer-item">
                <span className="offer-icon">{offer.icon}</span>
                <span className="offer-title-text">{offer.title}</span>
              </div>
            ))}
          </div>
        </div>

        <hr className="divider" />
        
        <div className="review-preview-section">
          <h3>Review</h3>
        </div>

        <hr className="divider" />

        <div className="related-hotels-detail-wrapper">
          <RelatedHotels relatedHotelsList={dynamicRelatedList} />
        </div>
      </div>

      <div className="booking-sticky-card">
        <button className="book-btn" onClick={() => navigate("/book-now", {state: {hotel: activeHotel}})}>
          Book Now
        </button>
      </div>
    </div>
  );
}
