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
 // LAGOS - 3 real hotels
{
  id: 68,
  slug: "eko-hotels-suites",
  title: "Eko Hotels & Suites",
  description: "5-star beachfront hotel with 7 restaurants and pool.",
  image: "/lagos1.jpg",
  rating: 4.8,
  price: 85000,
  location: "Lagos",
  images: ["/lagos1.jpg", "/lagos1b.jpg", "/lagos1c.jpg"],
  amenities: ["Beachfront", "Pool", "7 Restaurants", "Spa", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Iconic Victoria Island hotel at 1415 Adetokunbo Ademola St. Best views of Atlantic. Book: booking.com/hotel/ng/eko-hotels"
},
{
  id: 69,
  slug: "lagos-continental-hotel",
  title: "Albergo Hotel and Suites",
  description: "Luxury hotel in Kofo Abayomi with marina views.",
  image: "/lagos2.jpg",
  rating: 4.7,
  price: 75000,
  location: "Lagos",
  images: ["/lagos2.jpg", "/lagos2b.jpg", "/lagos2c.jpg"],
  amenities: ["Marina View", "Pool", "Spa", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Rebuilt landmark at 52 Kofo Abayomi St, Victoria Island. Modern luxury. Book: booking.com/hotel/ng/lagos-continental"
},
{
  id: 70,
  slug: "four-points-sheraton-lagos",
  title: "Sheraton Lagos",
  description: "4-star hotel with pool and gym on Victoria Island.",
  image: "/lagos3.jpg",
  rating: 4.6,
  price: 65000,
  location: "Lagos",
  images: ["/lagos3.jpg", "/lagos3b.jpg", "/3.jpg"],
  amenities: ["Pool", "Gym", "Restaurant", "Free WiFi", "Spa"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Marriott property at 9/13 Ozumba Mbadiwe Ave, Victoria Island. Book: booking.com/hotel/ng/four-points-lagos"
},

  // ABUJA FCT - 3 real hotels
   {
    id: 1,
    slug: "transcorp-hilton-abuja",
    title: "Transcorp Hilton Abuja",
    description: "5-star luxury hotel with panoramic city views, 3 restaurants, spa, and outdoor pool.",
    image: "/sk.jpg",
    rating: 4.8,
    price: 95000,
    location: "Abuja FCT",
    images: [  "/sk.jpg","/tropic2.jpg", "/tropic3.jpg", "/tropic4.jpg"],
    amenities: ["Pool", "Spa", "Free WiFi", "Restaurant", "Gym"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Iconic 5-star hotel on Maitama Hill, 1 Aguiyi Ironsi St. Rooftop pool, world-class dining, close to Aso Rock Villa. Book: booking.com/hotel/ng/transcorp-hilton-abuja"
  },
  {
    id: 2,
    slug: "ladi-kwali-conference-hotel",
    title: "Ladi Kwali Conference Hotel",
    description: "Modern hotel with conference facilities, rooftop bar, and premium suites in CBD.",
    image: "/abuja2a.jpg",
    rating: 4.5,
    price: 65000,
    location: "Abuja FCT",
    images: ["/abuja2a.jpg", "/abuja2b.jpg", "/abuja2.jpg", "/abuja2c.jpg"],
    amenities: ["Conference Hall", "Rooftop Bar", "Free WiFi", "Room Service"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Business and leisure in Central Business District, 21 Blantyre Crescent. Great for corporate stays. Book: booking.com/hotel/ng/ladi-kwali"
  },
  {
    id: 3,
    slug: "naf-conference-centre-suites",
    title: "Abuja Continental Hotel",
    description: "Affordable luxury with large conference halls and serene environment.",
    image: "/abuja3.jpg",
    rating: 4.3,
    price: 42000,
    location: "Abuja FCT",
    images: ["/abuja3.jpg", "/17.jpg", "/3.jpg", "/abuja3b.jpg"],
    amenities: ["Conference Hall", "Parking", "Free WiFi", "Restaurant"],
    specs: { guests: 3, bedrooms: 1, beds: 2, bathrooms: 1 },
    longDescription: "Owned by Nigerian Air Force, 803 Air Force Base. Quiet location, good for meetings. Book: booking.com/hotel/ng/naf-conference-centre"
  },

  // RIVERS - 3 real hotels
{
  id: 92,
  slug: "novotel-port-harcourt",
  title: "Gordonsville Escape Boutique Hotel ans Spa",
  description: "4-star hotel with pool, gym and conference center.",
  image: "/rivers1.jpg",
  rating: 4.7,
  price: 45000,
  location: "Rivers",
  images: ["/rivers1.jpg", "/rivers1b.jpg", "/rivers1c.jpg", "/rivers1d.jpg"],
  amenities: ["Pool", "Gym", "Conference Center", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Accor property at 50 Azikiwe Rd, Port Harcourt. Top business hotel. Book: booking.com/hotel/ng/novotel-ph"
},
{
  id: 93,
  slug: "protea-hotel-port-harcourt",
  title: "Swiss International Mabisel Port Harcourt",
  description: "Marriott hotel with river views and spa.",
  image: "/rivers2.jpg",
  rating: 4.6,
  price: 42000,
  location: "Rivers",
  images: ["/rivers2.jpg", "/rivers2b.jpg", "/rivers2c.jpg", "/rivers2d.jpg"],
  amenities: ["River View", "Spa", "Pool", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Marriott at 24 Stadium Rd, Port Harcourt. Great river views. Book: booking.com/hotel/ng/protea-ph"
},
{
  id: 94,
  slug: "presidency-hotel-port-harcourt",
  title: "Presidency Hotel Port Harcourt",
  description: "Budget hotel with clean rooms and good service.",
  image: "/rivers3.jpg",
  rating: 4.3,
  price: 26000,
  location: "Rivers",
  images: ["/rivers3.jpg", "/rivers3b.jpg", "/rivers3c.jpg", "/rivers3d.jpg"],
  amenities: ["Free WiFi", "Restaurant", "Parking", "24hr Service"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Affordable at 10 Ezimgbu Rd, Port Harcourt city center. Book: booking.com/hotel/ng/presidency-ph"
},

 // NIGER - 3 real hotels
{
  id: 74,
  slug: "tahrir-hotel-minna",
  title: "Tahrir Hotel Minna",
  description: "Premium hotel with pool and event hall.",
  image: "/niger1.jpg",
  rating: 4.6,
  price: 28000,
  location: "Niger",
  images: ["/niger1.jpg", "/3.jpg", "/5.jpg"],
  amenities: ["Pool", "Event Hall", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Top hotel at Bosso Rd, Minna. Great for conferences. Book: booking.com/hotel/ng/tahrir-minna"
},
{
  id: 75,
  slug: "chanchaga-hotel-minna",
  title: "Bavia Hotel Minna",
  description: "Government hotel with large compound.",
  image: "/niger2.jpg",
  rating: 4.3,
  price: 24000,
  location: "Niger",
  images: ["/niger2.jpg", "/niger2b.jpg", "/niger2c.jpg"],
  amenities: ["Large Compound", "Restaurant", "Free WiFi", "Parking"],
  specs: { guests: 3, bedrooms: 1, beds: 2, bathrooms: 1 },
  longDescription: "Spacious rooms at Abdulkareem Lafene Rd, Minna. Peaceful environment. Book: booking.com/hotel/ng/chanchaga-minna"
},
{
  id: 76,
  slug: "royal-harps-hotel-suleja",
  title: "Royal Harps Hotel Suleja",
  description: "Budget hotel in Suleja with clean rooms.",
  image: "/niger3.jpg",
  rating: 4.1,
  price: 18000,
  location: "Niger",
  images: ["/niger3.jpg", "/3.jpg", "/5.jpg"],
  amenities: ["Free WiFi", "Restaurant", "Parking"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Affordable stay at Abuja-Kaduna Rd, Suleja. Book: booking.com/hotel/ng/royal-harps-suleja"
},

// OGUN - 3 real hotels
{
  id: 77,
  slug: "green-legacy-resort-abeokuta",
  title: "Leksokky Hotel and Suites",
  description: "Luxury resort with pool, golf and conference center.",
  image: "/ogun1.jpg",
  rating: 4.7,
  price: 42000,
  location: "Ogun",
  images: ["/ogun1.jpg", "/ogun1b.jpg", "/ogun1c.jpg"],
  amenities: ["Golf Course", "Pool", "Conference Center", "Spa", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Obasanjo Presidential Library resort at Presidential Blvd, Abeokuta. 18-hole golf + luxury spa. Book: booking.com/hotel/ng/green-legacy"
},
{
  id: 78,
  slug: "park-inn-abeokuta",
  title: "Park Inn by Radisson Abeokuta",
  description: "International 4-star hotel with modern amenities.",
  image: "/ogun2.jpg",
  rating: 4.5,
  price: 38000,
  location: "Ogun",
  images: ["/ogun2.jpg", "/ogun2b.jpg", "/ogun2c.jpg"],
  amenities: ["Pool", "Gym", "Restaurant", "Free WiFi", "Conference Hall"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Radisson property at 16 Oba Adedotun Rd, Abeokuta. Great for business travelers. Book: booking.com/hotel/ng/park-inn-abeokuta"
},
{
  id: 79,
  slug: "valley-view-hotel-abeokuta",
  title: "Sandton Gold Hotels",
  description: "Budget hotel with rock views and restaurant.",
  image: "/ogun3.jpg",
  rating: 4.2,
  price: 24000,
  location: "Ogun",
  images: ["/ogun3.jpg", "/ogun3b.jpg", "/ogun3c.jpg"],
  amenities: ["Rock View", "Restaurant", "Free WiFi", "Parking"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Views of Olumo Rock at Ibara GRA, Abeokuta. Affordable and scenic. Book: booking.com/hotel/ng/valley-view-abeokuta"
},

 // DELTA - 3 real hotels
  {
    id: 31,
    slug: "grand-hotel-asaba",
    title: "Grand Hotel Asaba",
    description: "5-star hotel on Niger River with pool and spa.",
    image: "/delta1.jpg",
    rating: 4.8,
    price: 48000,
    location: "Delta",
    images: ["/delta1.jpg", "/delta1b.jpg", "/delta1c.jpg"],
    amenities: ["River View", "Pool", "Spa", "Restaurant", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Luxury on Niger River banks at Summit Rd, Asaba. Best in Asaba. Book: booking.com/hotel/ng/grand-hotel-asaba"
  },
  {
    id: 32,
    slug: "potters-palace-hotel-warri",
    title: "BridgeView Hotel Warri",
    description: "Premium hotel with gym and conference facilities.",
    image: "/delta2.jpg",
    rating: 4.5,
    price: 32000,
    location: "Delta",
    images: ["/delta2.jpg", "/delta2b.jpg", "/delta2c.jpg"],
    amenities: ["Gym", "Conference Hall", "Pool", "Restaurant", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Top hotel at 2 Potters Rd, Warri. Great for oil & gas business trips. Book: booking.com/hotel/ng/potters-palace-warri"
  },
  {
    id: 33,
    slug: "blossoms-hotel-asaba",
    title: "Blossoms Hotel Asaba",
    description: "Boutique hotel with modern rooms and restaurant.",
    image: "/delta3.jpg",
    rating: 4.3,
    price: 26000,
    location: "Delta",
    images: ["/delta3.jpg", "/delta3b.jpg", "/delta3c.jpg"],
    amenities: ["Restaurant", "Free WiFi", "Parking", "24hr Service"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Clean and modern at Nnebisi Rd, Asaba. Affordable. Book: booking.com/hotel/ng/blossoms-asaba"
  },
 // ABIA - 3 real hotels
  {
    id: 4,
    slug: "abikhe-suites-hotel-aba",
    title: "Abikhe Suites & Hotel",
    description: "Luxury hotel in Aba with rooftop pool and modern amenities.",
    image: "/abia1.jpg",
    rating: 4.4,
    price: 35000,
    location: "Abia",
    images: ["/abia1.jpg", "/abia1b.jpg", "/abia1c.jpg"],
    amenities: ["Pool", "Restaurant", "Free WiFi", "Parking"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Top-rated hotel at 25 Nwaogbo Rd, Aba. Great for business travelers. Book: booking.com/hotel/ng/abikhe-suites"
  },
  {
    id: 5,
    slug: "golden-palace-hotel-umuahia",
    title: "Golden Palace Hotel Umuahia",
    description: "Comfortable stay with restaurant and event hall in Umuahia.",
    image: "/abia2a.jpg",
    rating: 4.2,
    price: 28000,
    location: "Abia",
    images: ["/abia2a.jpg", "/abia2b.jpg", "/abia2c.jpg", "/abia2d.jpg"],
    amenities: ["Restaurant", "Event Hall", "Free WiFi", "Parking"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Located at 30 Ikot Ekpene Rd, Umuahia. Clean rooms and friendly staff. Book: booking.com/hotel/ng/golden-palace-umuahia"
  },
  {
    id: 6,
    slug: "ohams-abiagold-hotel",
    title: "Oxvera Hotel Limited",
    description: "Boutique hotel with modern rooms and 24/7 service.",
    image: "/abia3.jpg",
    rating: 4.1,
    price: 25000,
    location: "Abia",
    images: ["/abia3.jpg", "/abia3b.jpg", "/abia3c.jpg"],
    amenities: ["Free WiFi", "Restaurant", "24/7 Service"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Budget-friendly option at 24 Ehere Rd, Aba with good service. Book: booking.com/hotel/ng/ohams-abiagold"
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
