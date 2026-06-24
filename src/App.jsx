import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
const PROJECT_DATA = [
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
    title: "Tahir Guest Palace",
    description: "Most lixuriouse hotel in Northern Nigeria. Palace-style architecture with islamic design.",
    image: "/4.jpg",
    rating: 4.8,
    price: 140,
    location: "Kano, Kano State",
    images: ["/4.jpg", "/atomic 2.jpg", "/card4.jpg"],
    amenities: ["Outdoor pool", "Spa", "Gym", "Conference center", "Multiple restaurants", "Extensive gardens"],
    specs: { guests: 2, bedrooms: 1, beds: 2, bathrooms: 1 },
    longDescription: "Nestled in Abuja hills with mountain views and fireplace nights."
  },
  {
    id: 3,
    slug: "hotel3",
    title: "Eko Hotel Main Building",
    description: "Iconic 5-star on VI. Kown for deep soaking bathtubs, premium bedding, and being Lagos' Comference hub.",
    image: "/6.jpg",
    rating: 4.3,
    price: 234,
    location: "Plot 1415 Adetokunbo Ademola Street,Victoria Island, Lagos",
    images: ["/6.jpg", "/5.jpg", "/11.jpg"],
    amenities: ["Pool", "7 Bar", "9 restaurants", "2 outdooor tennis court", "spa", "sauna", "gym", "airport shuttle","24-hour business center" ],
    specs: { guests: 4, bedrooms: 2, beds: 2, bathrooms: 2 }
  },
  {
    id: 4,
    slug: "hotel4",
    title: "Transcorp Hilton Abuja",
    description: "Abuja's landmark 5-star. Where presidents and diplomats stay. Huge gardens, multiple wings",
    image: "/9.jpg",
    rating: 4.9,
    price: 200,
    location: "Abuja",
    images: ["/9.jpg", "/7.jpg", "/5.jpg"],
    amenities: ["Sophisticated design", "Spa", "Pool", "Elevated comfort", "Tennis courts", "7 restaurants"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 }
  },
  {
    id: 5,
    slug: "hotel5",
    title: "Ibom Icon Hotel & Golf Resort",
    description: "5-star resort set on 174 hectares with an 18-hole championship golf course. One of Nigerian's best resort experiences.",
    image: "/card7.jpg",
    rating: 4.5,
    price: 180,
    location: "Uyo, Akwa Ibom State",
    images: ["/card7.jpg", "/12.jpg", "/13.jpg"],
    amenities: ["Golf course", "Marina", "Spa", "3 restaurants", "outdoor pool", "Tennis courts", "Conference center", "Lagoon views"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 }
  },
  
  {
    id: 7,
    slug: "hotel7",
    title: "Hotel Presidential Port Harcourt",
    description: "Historic 5-star hotel. Rebuild to international standards. Known as 'The pride of the Garden city'.",
    image: "/card6.jpg",
    rating: 4.7,
    price: 120,
    location: "Port Harcourt, Rivers State",
    images: ["/card6.jpg", "/15.jpg", "/download (1).jpg"],
    amenities: ["Outdoor Pool", "Spa", "Gym", "3 restaurants", "Casino", "Tennis court", "Conference halls"],
    specs: { guests: 4, bedrooms: 3, beds: 3, bathrooms: 2 }
  },
  {
    id: 9, // Fixed duplicate ID
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

  // Auth checks
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  const shouldHideNavbar = isHotelDetailPage || isAuthPage || isBookNowPage || (isExplorePage && isDesktop) || isBookingSummeryPage;
  const shouldHideFooter = isHotelDetailPage || isExplorePage || isSavedPage || isSettingsPage || isAuthPage || isBookNowPage || isBookingSummeryPage;

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

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
