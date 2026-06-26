import React, { useState, useEffect } from "react";
// Line 2 stays the same - this is for routing
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Line 5 - rename our hook to avoid the clash
import { LocationProvider, useLocation as useUserLocation } from './context/LocationContext'
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthContext } from "./context/AuthContext"; 

// Layout Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import SavedHotels from "./components/SavedHotels";
import Settings from "./components/Settings";

// Page Sections
import Websites from "./components/Websites";
import Payment from "./components/Payment"
import Industry from "./components/Industry";
import Rating from "./components/Rating";
import BookingSummery from "./components/BookingSummery";
import Inspiration from "./components/Inspiration";
import BookNow from "./components/BookNow";
import Login from "./components/Login";
import Signup from "./components/Signup";

// View All Page + its data
import All, { HOTEL_ROOMS_DATA } from "./components/All";
import HotelDetail from "./components/HotelDetail";

// Hotel data for homepage cards



export const PROJECT_DATA = [
  // LAGOS - 3 different hotels
  {
    id: 201,
    slug: "crown-plaza-lagos-airport",
    title: "Crowne Plaza Lagos Airport",
    description: "4-star hotel connected to MMIA terminal with pool and gym.",
    image: "/lagos-bonus1.jpg",
    rating: 4.5,
    price: 58000,
    location: "Lagos",
    images: ["/lagos-bonus1.jpg", "/lagos-bonus1b.jpg", "/lagos-bonus1c.jpg"],
    amenities: ["Airport Shuttle", "Pool", "Gym", "Restaurant", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Direct access to Murtala Muhammed Airport terminal. Perfect for transit. Book: booking.com/hotel/ng/crowne-plaza-airport-lagos"
  },
  {
    id: 202,
    slug: "wellington-babcock-hotel-lagos",
    title: "Wellington Babcock Hotel",
    description: "Boutique hotel in Ikoyi with rooftop bar and modern rooms.",
    image: "/lagos-bonus2.jpg",
    rating: 4.4,
    price: 52000,
    location: "Lagos",
    images: ["/lagos-bonus2.jpg", "/lagos-bonus2b.jpg", "/lagos-bonus2c.jpg"],
    amenities: ["Rooftop Bar", "Free WiFi", "Restaurant", "24hr Service"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Quiet Ikoyi location at Bourdillon Rd. Great for business trips. Book: booking.com/hotel/ng/wellington-babcock"
  },
  {
    id: 203,
    slug: "cape-mansion-hotel-lekki",
    title: "Cape Mansion Hotel Lekki",
    description: "Beachfront hotel with pool and restaurant in Lekki Phase 1.",
    image: "/lagos-bonus3.jpg",
    rating: 4.3,
    price: 45000,
    location: "Lagos",
    images: ["/lagos-bonus3.jpg", "/lagos-bonus3b.jpg", "/lagos-bonus3c.jpg"],
    amenities: ["Beach Access", "Pool", "Restaurant", "Free WiFi", "Parking"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Close to Landmark Beach at Admiralty Way, Lekki. Book: booking.com/hotel/ng/cape-mansion-lekki"
  },

  // ABUJA FCT - 3 different hotels
  {
    id: 204,
    slug: "sheraton-abuja-hotel",
    title: "Sheraton Abuja Hotel",
    description: "5-star hotel with 2 pools and panoramic city views.",
    image: "/abuja-bonus1.jpg",
    rating: 4.7,
    price: 82000,
    location: "Abuja FCT",
    images: ["/abuja-bonus1.jpg", "/abuja-bonus1b.jpg", "/abuja-bonus1c.jpg"],
    amenities: ["2 Pools", "City View", "Spa", "Gym", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Iconic hotel at Ladi Kwali St, Wuse Zone 4. Close to CBD. Book: booking.com/hotel/ng/sheraton-abuja"
  },
  {
    id: 205,
    slug: "grand-i-hotel-abuja",
    title: "Grand I Hotel Abuja",
    description: "Modern hotel with rooftop restaurant and gym.",
    image: "/abuja-bonus2.jpg",
    rating: 4.4,
    price: 48000,
    location: "Abuja FCT",
    images: ["/abuja-bonus2.jpg", "/abuja-bonus2b.jpg", "/abuja-bonus2c.jpg"],
    amenities: ["Rooftop Restaurant", "Gym", "Free WiFi", "Parking"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Located at Aminu Kano Crescent, Wuse 2. Clean rooms, great service. Book: booking.com/hotel/ng/grand-i-abuja"
  },
  {
    id: 206,
    slug: "bolton-white-hotel-abuja",
    title: "Bolton White Hotel Abuja",
    description: "Budget hotel with conference hall near airport road.",
    image: "/abuja-bonus3.jpg",
    rating: 4.2,
    price: 32000,
    location: "Abuja FCT",
    images: ["/abuja-bonus3.jpg", "/abuja-bonus3b.jpg", "/abuja-bonus3c.jpg"],
    amenities: ["Conference Hall", "Restaurant", "Free WiFi", "24hr Service"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Affordable stay at Airport Rd, Gwarimpa. Book: booking.com/hotel/ng/bolton-white-abuja"
  },

  // RIVERS - 3 different hotels
  {
    id: 207,
    slug: "golden-tulip-port-harcourt",
    title: "Golden Tulip Port Harcourt",
    description: "4-star hotel with spa and business center.",
    image: "/rivers-bonus1.jpg",
    rating: 4.5,
    price: 42000,
    location: "Rivers",
    images: ["/rivers-bonus1.jpg", "/rivers-bonus1b.jpg", "/rivers-bonus1c.jpg"],
    amenities: ["Spa", "Business Center", "Pool", "Restaurant", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Central PH at 34 Trans-Amadi Industrial Layout. Book: booking.com/hotel/ng/golden-tulip-ph"
  },
  {
    id: 208,
    slug: "obelisk-hotel-port-harcourt",
    title: "Obelisk Hotel Port Harcourt",
    description: "Luxury hotel with gym and rooftop bar.",
    image: "/rivers-bonus2.jpg",
    rating: 4.4,
    price: 38000,
    location: "Rivers",
    images: ["/rivers-bonus2.jpg", "/rivers-bonus2b.jpg", "/rivers-bonus2c.jpg"],
    amenities: ["Gym", "Rooftop Bar", "Pool", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Modern hotel at 11 Stadium Rd, Port Harcourt. Book: booking.com/hotel/ng/obelisk-ph"
  },
  {
    id: 209,
    slug: "grand-hotel-ebonyi-ph",
    title: "Grand Hotel Ebonyi Port Harcourt",
    description: "Budget hotel with clean rooms and restaurant.",
    image: "/rivers-bonus3.jpg",
    rating: 4.1,
    price: 24000,
    location: "Rivers",
    images: ["/rivers-bonus3.jpg", "/rivers-bonus3b.jpg", "/rivers-bonus3c.jpg"],
    amenities: ["Restaurant", "Free WiFi", "Parking", "24hr Service"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Affordable at Aba Rd, Port Harcourt city center. Book: booking.com/hotel/ng/grand-ebonyi-ph"
  },

  // KANO - 3 different hotels
  {
    id: 210,
    slug: "grand-central-hotel-kano",
    title: "Grand Central Hotel Kano",
    description: "Premium hotel with pool and event hall.",
    image: "/kano-bonus1.jpg",
    rating: 4.5,
    price: 30000,
    location: "Kano",
    images: ["/kano-bonus1.jpg", "/kano-bonus1b.jpg", "/kano-bonus1c.jpg"],
    amenities: ["Pool", "Event Hall", "Restaurant", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Located at Zoo Rd, Kano city. Good for events. Book: booking.com/hotel/ng/grand-central-kano"
  },
  {
    id: 211,
    slug: "parkview-hotel-kano",
    title: "Parkview Hotel Kano",
    description: "Comfortable hotel with garden and restaurant.",
    image: "/kano-bonus2.jpg",
    rating: 4.2,
    price: 25000,
    location: "Kano",
    images: ["/kano-bonus2.jpg", "/kano-bonus2b.jpg", "/kano-bonus2c.jpg"],
    amenities: ["Garden", "Restaurant", "Free WiFi", "Parking"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Quiet location at Ibrahim Taiwo Rd, Kano. Book: booking.com/hotel/ng/parkview-kano"
  },
  {
    id: 212,
    slug: "meridian-hotel-kano",
    title: "Meridian Hotel Kano",
    description: "Budget hotel with 24hr power and clean rooms.",
    image: "/kano-bonus3.jpg",
    rating: 4.0,
    price: 18000,
    location: "Kano",
    images: ["/kano-bonus3.jpg", "/kano-bonus3b.jpg", "/kano-bonus3c.jpg"],
    amenities: ["24hr Power", "Free WiFi", "Restaurant"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Affordable at Murtala Mohammed Way, Kano. Book: booking.com/hotel/ng/meridian-kano"
  },

  // OYO - 3 different hotels
  {
    id: 213,
    slug: "best-western-plus-ibadan",
    title: "Best Western Plus Ibadan",
    description: "4-star hotel with pool and conference facilities.",
    image: "/oyo-bonus1.jpg",
    rating: 4.6,
    price: 34000,
    location: "Oyo",
    images: ["/oyo-bonus1.jpg", "/oyo-bonus1b.jpg", "/oyo-bonus1c.jpg"],
    amenities: ["Pool", "Conference Hall", "Restaurant", "Free WiFi", "Gym"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Located at 2 Yemetu Rd, Ibadan. Great for business. Book: booking.com/hotel/ng/best-western-ibadan"
  },
  {
    id: 214,
    slug: "lavendra-hotel-ibadan",
    title: "Lavendra Hotel Ibadan",
    description: "Boutique hotel with modern rooms in Bodija.",
    image: "/oyo-bonus2.jpg",
    rating: 4.3,
    price: 27000,
    location: "Oyo",
    images: ["/oyo-bonus2.jpg", "/oyo-bonus2b.jpg", "/oyo-bonus2c.jpg"],
    amenities: ["Free WiFi", "Restaurant", "Parking", "24hr Service"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Stylish boutique at Bodija Rd, Ibadan. Book: booking.com/hotel/ng/lavendra-ibadan"
  },
  {
    id: 215,
    slug: "royal-crown-hotel-ibadan",
    title: "Royal Crown Hotel Ibadan",
    description: "Budget hotel with clean rooms and good service.",
    image: "/oyo-bonus3.jpg",
    rating: 4.1,
    price: 20000,
    location: "Oyo",
    images: ["/oyo-bonus3.jpg", "/oyo-bonus3b.jpg", "/oyo-bonus3c.jpg"],
    amenities: ["Free WiFi", "Restaurant", "Parking"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Affordable at Challenge Rd, Ibadan. Book: booking.com/hotel/ng/royal-crown-ibadan"
  },

  // ENUGU - 3 different hotels
  {
    id: 216,
    slug: "golden-royale-hotel-enugu",
    title: "Golden Royale Hotel Enugu",
    description: "Premium hotel with pool and gym in GRA.",
    image: "/enugu-bonus1.jpg",
    rating: 4.5,
    price: 32000,
    location: "Enugu",
    images: ["/enugu-bonus1.jpg", "/enugu-bonus1b.jpg", "/enugu-bonus1c.jpg"],
    amenities: ["Pool", "Gym", "Restaurant", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Located at 5 Independence Ave, Enugu GRA. Book: booking.com/hotel/ng/golden-royale-enugu"
  },
  {
    id: 217,
    slug: "las-vegas-hotel-enugu",
    title: "Las Vegas Hotel Enugu",
    description: "Modern hotel with rooftop bar and event hall.",
    image: "/enugu-bonus2.jpg",
    rating: 4.3,
    price: 28000,
    location: "Enugu",
    images: ["/enugu-bonus2.jpg", "/enugu-bonus2b.jpg", "/enugu-bonus2c.jpg"],
    amenities: ["Rooftop Bar", "Event Hall", "Free WiFi", "Restaurant"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Contemporary hotel at Ogui Rd, Enugu city. Book: booking.com/hotel/ng/las-vegas-enugu"
  },
  {
    id: 218,
    slug: "de-enugu-hotel",
    title: "De Enugu Hotel",
    description: "Budget hotel with clean rooms and 24hr service.",
    image: "/enugu-bonus3.jpg",
    rating: 4.0,
    price: 19000,
    location: "Enugu",
    images: ["/enugu-bonus3.jpg", "/enugu-bonus3b.jpg", "/enugu-bonus3c.jpg"],
    amenities: ["24hr Service", "Free WiFi", "Restaurant"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Affordable at Old Park Rd, Enugu. Book: booking.com/hotel/ng/de-enugu-hotel"
  },

  // DELTA - 3 different hotels
  {
    id: 219,
    slug: "dennis-hotel-warri",
    title: "Dennis Hotel Warri",
    description: "Premium hotel with pool and conference hall.",
    image: "/delta-bonus1.jpg",
    rating: 4.5,
    price: 30000,
    location: "Delta",
    images: ["/delta-bonus1.jpg", "/delta-bonus1b.jpg", "/delta-bonus1c.jpg"],
    amenities: ["Pool", "Conference Hall", "Restaurant", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Top hotel at Airport Rd, Warri. Good for oil & gas business. Book: booking.com/hotel/ng/dennis-warri"
  },
  {
    id: 220,
    slug: "royal-park-hotel-asaba",
    title: "Royal Park Hotel Asaba",
    description: "Comfortable hotel with garden and restaurant.",
    image: "/delta-bonus2.jpg",
    rating: 4.3,
    price: 25000,
    location: "Delta",
    images: ["/delta-bonus2.jpg", "/delta-bonus2b.jpg", "/delta-bonus2c.jpg"],
    amenities: ["Garden", "Restaurant", "Free WiFi", "Parking"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Peaceful stay at Okpanam Rd, Asaba. Book: booking.com/hotel/ng/royal-park-asaba"
  },
 
];


function AppContent() {
  // 👉 FIXED: Access the dynamic authentication context
  const { user } = React.useContext(AuthContext);
  const userEmail = user?.email || "guest";

  // 👉 FIXED: State initializes as blank arrays/objects; loaded dynamically via useEffect below
  const [favorites, setFavorites] = useState([]);
  const [profile, setProfile] = useState({
    name: "Guest User",
    email: "guest@yourdomain.com",
    phone: "N/A",
    avatar: ""
  });

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const location = useLocation();

  // 👉 FIXED: Listen to userEmail changes to load specific user data immediately
  // 👉 REPLACE your first useEffect inside AppContent with this:
useEffect(() => {
  const savedFavorites = localStorage.getItem(`${userEmail}_favorites`);
  setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);

  const savedProfile = localStorage.getItem(`${userEmail}_profile`);
  
  if (savedProfile && userEmail !== "guest") {
    try {
      const parsedProfile = JSON.parse(savedProfile);
      
      if ((parsedProfile.name === "Guest User" || !parsedProfile.name) && user?.displayName) {
        parsedProfile.name = user.displayName;
      }
      
      setProfile(parsedProfile);
    } catch (e) {
      console.error("Error reading profile data", e);
    }
  } else {
    // 👈 THIS AUTO-RESETS THE LAYOUT IF AN ACCOUNT IS DELETED
    setProfile({
      name: user?.displayName || "Guest User", 
      email: userEmail !== "guest" ? userEmail : "guest@yourdomain.com",
      phone: "N/A",
      avatar: ""
    });
  }
}, [userEmail, user]);




  // 👉 FIXED: Save state to specific user slots in localStorage
  useEffect(() => {
    if (userEmail !== "guest") {
      localStorage.setItem(`${userEmail}_favorites`, JSON.stringify(favorites));
    }
  }, [favorites, userEmail]);

  useEffect(() => {
    if (userEmail !== "guest") {
      localStorage.setItem(`${userEmail}_profile`, JSON.stringify(profile));
    }
  }, [profile, userEmail]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleFavorite = (id, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };
  
  // Page checks
  const isExplorePage = location.pathname.toLowerCase() === "/view-all";
  const isSavedPage = location.pathname === "/saved";
  const isSettingsPage = location.pathname === "/settings";
  const isHotelDetailPage = location.pathname.startsWith("/hotel") || location.pathname.startsWith("/allhotel") || PROJECT_DATA.some(h => location.pathname === `/${h.slug}`) || HOTEL_ROOMS_DATA.some(h => location.pathname === `/${h.slug}`);
  const isBookNowPage = location.pathname === "/book-now";
  const isBookingSummeryPage = location.pathname === "/booking-summery";
   const isPaymeny = location.pathname === "/payment";

  // Auth checks
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  const shouldHideNavbar = isHotelDetailPage || isAuthPage || isBookNowPage || (isExplorePage && isDesktop) || isBookingSummeryPage || isPaymeny;
  const shouldHideFooter = isHotelDetailPage || isExplorePage || isSavedPage || isSettingsPage || isAuthPage || isBookNowPage || isBookingSummeryPage || isPaymeny;

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const allHotelsCombined = [...PROJECT_DATA, ...HOTEL_ROOMS_DATA];

  return (
    <div className={theme}>
      {!shouldHideNavbar && <Navbar favoritesCount={favorites.length} />}
       
     <Routes>
  <Route
    path="/"
    element={
      <ProtectedRoute>
        <Hero profile={profile} />
        <Websites favorites={favorites} toggleFavorite={toggleFavorite} PROJECT_DATA={PROJECT_DATA} />
        <Industry />
        <Inspiration />
        <Rating/>
      </ProtectedRoute>
    }
  />

  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  <Route
    path="/view-all"
    element={
      <ProtectedRoute>
        <All favorites={favorites} toggleFavorite={toggleFavorite} />
      </ProtectedRoute>
    }
  />

  {PROJECT_DATA.map((hotel) => (
    <Route
      key={hotel.id}
      path={`/${hotel.slug}`}
      element={
        <ProtectedRoute>
          <HotelDetail hotel={hotel} favorites={favorites} toggleFavorite={toggleFavorite} />
        </ProtectedRoute>
      }
    />
  ))}

  {HOTEL_ROOMS_DATA.map((hotel) => (
    <Route
      key={hotel.id}
      path={`/${hotel.slug}`}
      element={
        <ProtectedRoute>
          <HotelDetail hotel={hotel} favorites={favorites} toggleFavorite={toggleFavorite} />
        </ProtectedRoute>
      }
    />
  ))}

  <Route
    path="/allhotel/:id"
    element={
      <ProtectedRoute>
        <HotelDetail hotel={null} allHotels={allHotelsCombined} favorites={favorites} toggleFavorite={toggleFavorite} />
      </ProtectedRoute>
    }
  />

  <Route
    path="/hotel/:id"
    element={
      <ProtectedRoute>
        <HotelDetail hotel={null} allHotels={PROJECT_DATA} favorites={favorites} toggleFavorite={toggleFavorite} />
      </ProtectedRoute>
    }
  />

  {/* 👉 FIXED: Secured feature routes below using ProtectedRoute wrappers */}
  <Route 
    path="/saved" 
    element={
      <ProtectedRoute>
        <SavedHotels favorites={favorites} toggleFavorite={toggleFavorite} allHotels={allHotelsCombined} />
      </ProtectedRoute>
    } 
  />
  <Route 
    path="/settings" 
    element={
      <ProtectedRoute>
        <Settings profile={profile} setProfile={setProfile} theme={theme} toggleTheme={toggleTheme} />
      </ProtectedRoute>
    } 
  />

  <Route 
    path="/booking-summery" 
    element={
      <ProtectedRoute>
        <BookingSummery />
      </ProtectedRoute>
    } 
  />

  {/* Added Payment Route */}
  <Route 
    path="/payment" 
    element={
      <ProtectedRoute>
        <Payment />
      </ProtectedRoute>
    } 
  />

  <Route 
    path="/book-now" 
    element={
      <ProtectedRoute>
        <BookNow allHotels={allHotelsCombined} />
      </ProtectedRoute>
    } 
  />
</Routes>



     


      {!shouldHideFooter && <Footer />}
    </div>
  );
}
function AppContentWithLocation() {
  const { location } = useUserLocation(); // from our context
  
  // Sort: user state first, then others
  const sortedHotels = [...PROJECT_DATA].sort((a, b) => {
    if (!location) return 0; // no location set = no sorting
    if (a.state === location.state && b.state !== location.state) return -1;
    if (b.state === location.state && a.state !== location.state) return 1;
    return 0;
  });

  return <AppContent sortedHotels={sortedHotels} />;
}

// Update your default export
export default function App() {
  return (
    <BrowserRouter>
      <LocationProvider>
        <AppContentWithLocation />
      </LocationProvider>
    </BrowserRouter>
  );
}
