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
    title: "Horizon Peak Resort",
    description: "A warm, cozy aesthetic featuring online ordering real-time workout metrics, interactive progress charts.",
    image: "2.jpg",
    rating: 4.6,
    price: 120,
    location: "Lagos, Nigeria",
    images: ["/2.jpg", "/3.jpg", "/card5.jpg"],
    amenities: ["Free Wi-Fi", "Pool", "Breakfast", "Parking"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Step into luxury at Coffee Shop Landing. Wake up to ocean waves and enjoy our rooftop infinity pool."
  },
  {
    id: 2,
    slug: "hotel2",
    title: "Royal Palm suites",
    description: "A dark-mode dashboard showcasing real-time workout metrics, interactive progress charts, and personalized goal tracking.",
    image: "/4.jpg",
    rating: 4.8,
    price: 180,
    location: "Abuja, Nigeria",
    images: ["/4.jpg", "/atomic 2.jpg", "/card4.jpg"],
    amenities: ["Gym", "Spa", "Wi-Fi", "Restaurant"],
    specs: { guests: 2, bedrooms: 1, beds: 2, bathrooms: 1 },
    longDescription: "Nestled in Abuja hills with mountain views and fireplace nights."
  },
  {
    id: 3,
    slug: "hotel3",
    title: "Saguna Hotel",
    description: "A minimalist retail experience built with rapid filtering, high-resolution lookbooks, and a one-click checkout system.",
    image: "/6.jpg",
    rating: 4.3,
    price: 250,
    location: "Port Harcourt, Nigeria",
    images: ["/6.jpg", "/5.jpg", "/11.jpg"],
    amenities: ["Pool", "Bar", "Wi-Fi", "Room Service"],
    specs: { guests: 4, bedrooms: 2, beds: 2, bathrooms: 2 }
  },
  {
    id: 4,
    slug: "hotel4",
    title: "Diamond Heights Suites",
    description: "An immersive portal designed with dynamic destination maps, custom itinerary builders, and automated fare alerts.",
    image: "/9.jpg",
    rating: 4.9,
    price: 310,
    location: "Maldives",
    images: ["/9.jpg", "/7.jpg", "/5.jpg"],
    amenities: ["Beach Access", "Spa", "All-Inclusive", "Wi-Fi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 }
  },
  {
    id: 5,
    slug: "hotel5",
    title: "Silver Fox Hotel",
    description: "A clean food blog offering intelligent portion scaling, automated grocery lists, and step-by-step video playback.",
    image: "/card7.jpg",
    rating: 4.5,
    price: 95,
    location: "Enugu, Nigeria",
    images: ["/card7.jpg", "/12.jpg", "/13.jpg"],
    amenities: ["Kitchen", "Wi-Fi", "Parking"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 }
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
    amenities: ["Ocean View Balcony", "Private Hot Tub", "Beach Front Access", "Cocktail Bar"],
    specs: { guests: 4, bedrooms: 3, beds: 3, bathrooms: 2 }
  },
  {
    id: 9, // Fixed duplicate ID
    slug: "hotel9",
    title: "Grey Suite Cabins Hotel",
    description: "A sophisticated wellness haven engineered with soundproof acoustic glass and minimalist monochrome designs. Perfectly curated to reduce stress, featuring state-of-the-art smart room tech and air purification.",
    image: "/card2.jpg",
    rating: 4.7,
    price: 420,
    location: "Lagos Island",
    images: ["/card2.jpg", "/12.jpg", "/download (1).jpg"],
    amenities: ["Infrared Sauna", "Smart Room Automation", "Yoga Studio", "Acoustic Soundproofing"],
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

  // Auth checks
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  const shouldHideNavbar = isHotelDetailPage || isAuthPage || isBookNowPage || (isExplorePage && isDesktop);
  const shouldHideFooter = isHotelDetailPage || isExplorePage || isSavedPage || isSettingsPage || isAuthPage || isBookNowPage;

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
