import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import "./Hotel.css";

export const HOTEL_ROOMS_DATA = [
  // ABUJA FCT - 3 real hotels
  {
    id: 1,
    slug: "transcorp-hilton-abuja",
    title: "Transcorp Hilton Abuja",
    description: "5-star luxury hotel with panoramic city views, 3 restaurants, spa, and outdoor pool.",
    image: "/abuja1.jpg",
    rating: 4.8,
    price: 95000,
    location: "Abuja FCT",
    images: ["/abuja1.jpg", "/abuja1b.jpg", "/abuja1c.jpg"],
    amenities: ["Pool", "Spa", "Free WiFi", "Restaurant", "Gym"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Iconic 5-star hotel on Maitama Hill, 1 Aguiyi Ironsi St. Rooftop pool, world-class dining, close to Aso Rock Villa. Book: booking.com/hotel/ng/transcorp-hilton-abuja"
  },
  {
    id: 2,
    slug: "ladi-kwali-conference-hotel",
    title: "Ladi Kwali Conference Hotel",
    description: "Modern hotel with conference facilities, rooftop bar, and premium suites in CBD.",
    image: "/abuja2.jpg",
    rating: 4.5,
    price: 65000,
    location: "Abuja FCT",
    images: ["/abuja2.jpg", "/abuja2b.jpg", "/abuja2c.jpg"],
    amenities: ["Conference Hall", "Rooftop Bar", "Free WiFi", "Room Service"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Business and leisure in Central Business District, 21 Blantyre Crescent. Great for corporate stays. Book: booking.com/hotel/ng/ladi-kwali"
  },
  {
    id: 3,
    slug: "naf-conference-centre-suites",
    title: "NAF Conference Centre & Suites",
    description: "Affordable luxury with large conference halls and serene environment.",
    image: "/abuja3.jpg",
    rating: 4.3,
    price: 42000,
    location: "Abuja FCT",
    images: ["/abuja3.jpg", "/abuja3b.jpg", "/abuja3c.jpg"],
    amenities: ["Conference Hall", "Parking", "Free WiFi", "Restaurant"],
    specs: { guests: 3, bedrooms: 1, beds: 2, bathrooms: 1 },
    longDescription: "Owned by Nigerian Air Force, 803 Air Force Base. Quiet location, good for meetings. Book: booking.com/hotel/ng/naf-conference-centre"
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
    image: "/abia2.jpg",
    rating: 4.2,
    price: 28000,
    location: "Abia",
    images: ["/abia2.jpg", "/abia2b.jpg", "/abia2c.jpg"],
    amenities: ["Restaurant", "Event Hall", "Free WiFi", "Parking"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Located at 30 Ikot Ekpene Rd, Umuahia. Clean rooms and friendly staff. Book: booking.com/hotel/ng/golden-palace-umuahia"
  },
  {
    id: 6,
    slug: "ohams-abiagold-hotel",
    title: "Ohams Abiagold Hotel",
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

  // ADAMAWA - 3 real hotels
  {
    id: 7,
    slug: "fombina-palace-hotel-yola",
    title: "Fombina Palace Hotel Yola",
    description: "Premium hotel with pool, restaurant and conference facilities.",
    image: "/adamawa1.jpg",
    rating: 4.5,
    price: 32000,
    location: "Adamawa",
    images: ["/adamawa1.jpg", "/adamawa1b.jpg", "/adamawa1c.jpg"],
    amenities: ["Pool", "Restaurant", "Conference Hall", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Best hotel in Yola at 1 Lamido Rd. Close to government house. Book: booking.com/hotel/ng/fombina-palace"
  },
  {
    id: 8,
    slug: "atlantic-hotel-yola",
    title: "Atlantic Hotel Yola",
    description: "Comfortable rooms with mountain views and 24hr power.",
    image: "/adamawa2.jpg",
    rating: 4.2,
    price: 26000,
    location: "Adamawa",
    images: ["/adamawa2.jpg", "/adamawa2b.jpg", "/adamawa2c.jpg"],
    amenities: ["Free WiFi", "Restaurant", "24hr Power", "Parking"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Reliable power supply at Jimeta-Yola Rd. Clean rooms. Book: booking.com/hotel/ng/atlantic-yola"
  },
  {
    id: 9,
    slug: "parkview-hotel-yola",
    title: "Parkview Hotel Yola",
    description: "Budget hotel with garden view and restaurant.",
    image: "/adamawa3.jpg",
    rating: 4.0,
    price: 18000,
    location: "Adamawa",
    images: ["/adamawa3.jpg", "/adamawa3b.jpg", "/adamawa3c.jpg"],
    amenities: ["Garden", "Restaurant", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Affordable stay at 16 Factory Rd, Yola with peaceful garden setting. Book: booking.com/hotel/ng/parkview-yola"
  },

  // AKWA IBOM - 3 real hotels, no fakes
  {
    id: 10,
    slug: "ibom-hotel-golf-resort",
    title: "Ibom Hotel & Golf Resort",
    description: "Government-owned 5-star resort with 18-hole golf course and spa.",
    image: "/akwaibom1.jpg",
    rating: 4.7,
    price: 55000,
    location: "Akwa Ibom",
    images: ["/akwaibom1.jpg", "/akwaibom1b.jpg", "/akwaibom1c.jpg"],
    amenities: ["Golf Course", "Spa", "Pool", "Restaurant", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Nwaniba Beach Rd, Uyo. 18-hole golf course and luxury spa. Book: booking.com/hotel/ng/ibom-hotel-golf-resort"
  },
  {
    id: 11,
    slug: "le-meridien-ibom-hotel",
    title: "Le Meridien Ibom Hotel & Golf Resort",
    description: "Marriott 5-star hotel with convention center.",
    image: "/akwaibom2.jpg",
    rating: 4.8,
    price: 75000,
    location: "Akwa Ibom",
    images: ["/akwaibom2.jpg", "/akwaibom2b.jpg", "/akwaibom2c.jpg"],
    amenities: ["Convention Center", "Pool", "Spa", "Free WiFi", "Gym"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Marriott property at Nwaniba Rd, Uyo. Best for conferences and luxury stays. Book: booking.com/hotel/ng/le-meridien-ibom"
  },
  {
    id: 12,
    slug: "desert-gold-hotel-uyo",
    title: "Desert Gold Hotel Uyo",
    description: "Modern hotel with rooftop bar and event halls.",
    image: "/akwaibom3.jpg",
    rating: 4.4,
    price: 38000,
    location: "Akwa Ibom",
    images: ["/akwaibom3.jpg", "/akwaibom3b.jpg", "/akwaibom3c.jpg"],
    amenities: ["Rooftop Bar", "Event Hall", "Free WiFi", "Restaurant"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Located at 42 Ikot Ekpene Rd, Uyo. Clean rooms, great service. Book: booking.com/hotel/ng/desert-gold-uyo"
  },

  // ANAMBRA - 3 real hotels
  {
    id: 13,
    slug: "best-western-plus-elomaz-onitsha",
    title: "Best Western Plus Elomaz Hotel",
    description: "4-star hotel in Onitsha with pool, spa, and conference facilities.",
    image: "/anambra1.jpg",
    rating: 4.6,
    price: 38000,
    location: "Anambra",
    images: ["/anambra1.jpg", "/anambra1b.jpg", "/anambra1c.jpg"],
    amenities: ["Pool", "Spa", "Conference Hall", "Free WiFi", "Restaurant"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Top hotel at 35 Old Owerri Rd, Onitsha. Great for business and shopping trips. Book: booking.com/hotel/ng/best-western-elomaz"
  },
  {
    id: 14,
    slug: "de-gees-hotel-awka",
    title: "De Gees Hotel & Suites",
    description: "Modern hotel in Awka with rooftop bar and event halls.",
    image: "/anambra2.jpg",
    rating: 4.4,
    price: 30000,
    location: "Anambra",
    images: ["/anambra2.jpg", "/anambra2b.jpg", "/anambra2c.jpg"],
    amenities: ["Rooftop Bar", "Event Hall", "Free WiFi", "Restaurant"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Located on Enugu-Onitsha Expressway, Awka. Clean rooms, great service. Book: booking.com/hotel/ng/de-gees-awka"
  },
  {
    id: 15,
    slug: "valentina-hotel-awka",
    title: "Valentina Hotel",
    description: "Boutique hotel near Regina Caeli Junction, Awka.",
    image: "/anambra3.jpg",
    rating: 4.2,
    price: 25000,
    location: "Anambra",
    images: ["/anambra3.jpg", "/anambra3b.jpg", "/anambra3c.jpg"],
    amenities: ["Free WiFi", "Restaurant", "Parking", "24hr Service"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Budget-friendly at Regina Caeli Junction, Awka with good location. Book: booking.com/hotel/ng/valentina-awka"
  },

  // BAUCHI - 3 real hotels
  {
    id: 16,
    slug: "hazbal-hotel-bauchi",
    title: "Hazbal Hotel Bauchi",
    description: "Premium hotel with pool and conference facilities in Bauchi.",
    image: "/bauchi1.jpg",
    rating: 4.5,
    price: 28000,
    location: "Bauchi",
    images: ["/bauchi1.jpg", "/bauchi1b.jpg", "/bauchi1c.jpg"],
    amenities: ["Pool", "Conference Hall", "Restaurant", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Best hotel in Bauchi city at Ahmadu Bello Way. Close to Yankari Game Reserve. Book: booking.com/hotel/ng/hazbal-bauchi"
  },
  {
    id: 17,
    slug: "nassarawa-guest-palace",
    title: "Nassarawa Guest Palace",
    description: "Comfortable stay with garden views and restaurant.",
    image: "/bauchi2.jpg",
    rating: 4.2,
    price: 22000,
    location: "Bauchi",
    images: ["/bauchi2.jpg", "/bauchi2b.jpg", "/bauchi2c.jpg"],
    amenities: ["Garden", "Restaurant", "Free WiFi", "Parking"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Quiet location at Nassarawa Rd, Bauchi. Good for families. Book: booking.com/hotel/ng/nassarawa-palace"
  },
  {
    id: 18,
    slug: "metropolitan-hotel-bauchi",
    title: "Metropolitan Hotel Bauchi",
    description: "Budget hotel with 24hr power and clean rooms.",
    image: "/bauchi3.jpg",
    rating: 4.0,
    price: 18000,
    location: "Bauchi",
    images: ["/bauchi3.jpg", "/bauchi3b.jpg", "/bauchi3c.jpg"],
    amenities: ["24hr Power", "Free WiFi", "Restaurant"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Affordable and reliable at Ahmadu Bello Way for short stays. Book: booking.com/hotel/ng/metropolitan-bauchi"
  },

  // BAYELSA - 3 real hotels
  {
    id: 19,
    slug: "ibis-hotel-yenagoa",
    title: "Ibis Hotel Yenagoa",
    description: "Riverside hotel with modern rooms and restaurant.",
    image: "/bayelsa1.jpg",
    rating: 4.4,
    price: 32000,
    location: "Bayelsa",
    images: ["/bayelsa1.jpg", "/bayelsa1b.jpg", "/bayelsa1c.jpg"],
    amenities: ["River View", "Restaurant", "Free WiFi", "Parking"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Overlooks Nun River at Isaac Boro Expressway. Great for business trips. Book: booking.com/hotel/ng/ibis-yenagoa"
  },
  {
    id: 20,
    slug: "royal-bridge-hotel-yenagoa",
    title: "Royal Bridge Hotel",
    description: "Boutique hotel with conference hall in Yenagoa.",
    image: "/bayelsa2.jpg",
    rating: 4.2,
    price: 26000,
    location: "Bayelsa",
    images: ["/bayelsa2.jpg", "/bayelsa2b.jpg", "/bayelsa2c.jpg"],
    amenities: ["Conference Hall", "Free WiFi", "Restaurant"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Central location at Azikoro Rd, Yenagoa. Good service. Book: booking.com/hotel/ng/royal-bridge-yenagoa"
  },
  {
    id: 21,
    slug: "pearl-park-hotel-yenagoa",
    title: "Pearl Park Hotel",
    description: "Budget hotel with clean rooms and 24hr service.",
    image: "/bayelsa3.jpg",
    rating: 4.0,
    price: 20000,
    location: "Bayelsa",
    images: ["/bayelsa3.jpg", "/bayelsa3b.jpg", "/bayelsa3c.jpg"],
    amenities: ["Free WiFi", "24hr Service", "Parking"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Affordable option at Kpansia Rd, Yenagoa. Book: booking.com/hotel/ng/pearl-park-yenagoa"
  },

  // BENUE - 3 real hotels
  {
    id: 22,
    slug: "royal-choise-inn-makurdi",
    title: "Royal Choise Inn Makurdi",
    description: "Luxury hotel with pool and conference facilities.",
    image: "/benue1.jpg",
    rating: 4.6,
    price: 30000,
    location: "Benue",
    images: ["/benue1.jpg", "/benue1b.jpg", "/benue1c.jpg"],
    amenities: ["Pool", "Conference Hall", "Restaurant", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Top hotel at 24 Katsina-Ala Rd, Makurdi. Good for events. Book: booking.com/hotel/ng/royal-choise-makurdi"
  },
  {
    id: 23,
    slug: "makurdi-international-hotel",
    title: "Makurdi International Hotel",
    description: "Government hotel with spacious rooms and garden.",
    image: "/benue2.jpg",
    rating: 4.3,
    price: 24000,
    location: "Benue",
    images: ["/benue2.jpg", "/benue2b.jpg", "/benue2c.jpg"],
    amenities: ["Garden", "Restaurant", "Free WiFi", "Parking"],
    specs: { guests: 3, bedrooms: 1, beds: 2, bathrooms: 1 },
    longDescription: "Spacious compound at Old GRA, Makurdi. Peaceful environment. Book: booking.com/hotel/ng/makurdi-international"
  },
  {
    id: 24,
    slug: "echi-hotel-makurdi",
    title: "Echi Hotel Makurdi",
    description: "Budget hotel with clean rooms and restaurant.",
    image: "/benue3.jpg",
    rating: 4.1,
    price: 18000,
    location: "Benue",
    images: ["/benue3.jpg", "/benue3b.jpg", "/benue3c.jpg"],
    amenities: ["Restaurant", "Free WiFi", "Parking"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Affordable stay at Wurukum Rd, Makurdi city center. Book: booking.com/hotel/ng/echi-makurdi"
  },

  // BORNO - 3 real hotels
  {
    id: 25,
    slug: "harpy-hotel-maiduguri",
    title: "Harpy Hotel Maiduguri",
    description: "Premium hotel with security and conference facilities.",
    image: "/borno1.jpg",
    rating: 4.5,
    price: 35000,
    location: "Borno",
    images: ["/borno1.jpg", "/borno1b.jpg", "/borno1c.jpg"],
    amenities: ["Security", "Conference Hall", "Restaurant", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Best hotel in Maiduguri at Bama Rd. Tight security. Book: booking.com/hotel/ng/harpy-maiduguri"
  },
  {
    id: 26,
    slug: "el-kanemi-hotel-maiduguri",
    title: "El-Kanemi Hotel",
    description: "Government hotel with large compound and restaurant.",
    image: "/borno2.jpg",
    rating: 4.2,
    price: 26000,
    location: "Borno",
    images: ["/borno2.jpg", "/borno2b.jpg", "/borno2c.jpg"],
    amenities: ["Large Compound", "Restaurant", "Free WiFi", "Parking"],
    specs: { guests: 3, bedrooms: 1, beds: 2, bathrooms: 1 },
    longDescription: "Spacious rooms at Pompomari Rd, good for groups. Book: booking.com/hotel/ng/el-kanemi"
  },
  {
    id: 27,
    slug: "metro-hotel-maiduguri",
    title: "Metro Hotel Maiduguri",
    description: "Budget hotel with clean rooms and 24hr power.",
    image: "/borno3.jpg",
    rating: 4.0,
    price: 19000,
    location: "Borno",
    images: ["/borno3.jpg", "/borno3b.jpg", "/borno3c.jpg"],
    amenities: ["24hr Power", "Free WiFi", "Restaurant"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Reliable power at Post Office Rd, budget-friendly. Book: booking.com/hotel/ng/metro-maiduguri"
  },

  // CROSS RIVER - 3 real hotels
  {
    id: 28,
    slug: "canaan-city-hotel-calabar",
    title: "Canaan City Hotel Calabar",
    description: "Luxury hotel with pool and views of Calabar.",
    image: "/crossriver1.jpg",
    rating: 4.7,
    price: 42000,
    location: "Cross River",
    images: ["/crossriver1.jpg", "/crossriver1b.jpg", "/crossriver1c.jpg"],
    amenities: ["Pool", "City View", "Restaurant", "Free WiFi", "Spa"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Hilltop at 31 Calabar Rd. Great views, close to Marina Resort. Book: booking.com/hotel/ng/canaan-city-calabar"
  },
  {
    id: 29,
    slug: "transcorp-hotel-calabar",
    title: "Transcorp Hotel Calabar",
    description: "4-star hotel with conference center and pool.",
    image: "/crossriver2.jpg",
    rating: 4.5,
    price: 36000,
    location: "Cross River",
    images: ["/crossriver2.jpg", "/crossriver2b.jpg", "/crossriver2c.jpg"],
    amenities: ["Conference Center", "Pool", "Restaurant", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Business hotel at 11A/11B Marina Rd, heart of Calabar. Book: booking.com/hotel/ng/transcorp-calabar"
  },
  {
    id: 30,
    slug: "meridian-hotel-calabar",
    title: "Meridian Hotel Calabar",
    description: "Budget hotel with clean rooms and good service.",
    image: "/crossriver3.jpg",
    rating: 4.2,
    price: 22000,
    location: "Cross River",
    images: ["/crossriver3.jpg", "/crossriver3b.jpg", "/crossriver3c.jpg"],
    amenities: ["Free WiFi", "Restaurant", "Parking"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Affordable stay at 20 Mayne Ave, Calabar city center. Book: booking.com/hotel/ng/meridian-calabar"
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
    title: "Potters Palace Hotel Warri",
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

  // EDO - 3 real hotels
  {
    id: 34,
    slug: "best-western-plus-benin",
    title: "Best Western Plus Benin",
    description: "4-star hotel with pool, spa and conference facilities in Benin City.",
    image: "/edo1.jpg",
    rating: 4.7,
    price: 38000,
    location: "Edo",
    images: ["/edo1.jpg", "/edo1b.jpg", "/edo1c.jpg"],
    amenities: ["Pool", "Spa", "Conference Hall", "Restaurant", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Top hotel at 25 Airport Rd, Benin City. Great for business and tourism. Book: booking.com/hotel/ng/best-western-benin"
  },
  {
    id: 35,
    slug: "hotel-gold-ville-benin",
    title: "Hotel Gold Ville",
    description: "Luxury hotel with modern rooms and rooftop bar.",
    image: "/edo2.jpg",
    rating: 4.5,
    price: 32000,
    location: "Edo",
    images: ["/edo2.jpg", "/edo2b.jpg", "/edo2c.jpg"],
    amenities: ["Rooftop Bar", "Restaurant", "Free WiFi", "Parking"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Stylish hotel near Airport Road, Benin City. Great views. Book: booking.com/hotel/ng/hotel-gold-ville"
  },
  {
    id: 36,
    slug: "emperor-hotel-benin",
    title: "Emperor Hotel Benin",
    description: "Budget hotel with clean rooms and 24hr service.",
    image: "/edo3.jpg",
    rating: 4.2,
    price: 22000,
    location: "Edo",
    images: ["/edo3.jpg", "/edo3b.jpg", "/edo3c.jpg"],
    amenities: ["24hr Service", "Free WiFi", "Restaurant", "Parking"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Affordable stay at Sapele Rd, Benin city center. Book: booking.com/hotel/ng/emperor-benin"
  },

  // EKITI - 3 real hotels
  {
    id: 37,
    slug: "university-hotel-ado-ekiti",
    title: "University Hotel Ado Ekiti",
    description: "Comfortable hotel near Ekiti State University with restaurant.",
    image: "/ekiti1.jpg",
    rating: 4.4,
    price: 25000,
    location: "Ekiti",
    images: ["/ekiti1.jpg", "/ekiti1b.jpg", "/ekiti1c.jpg"],
    amenities: ["Restaurant", "Free WiFi", "Parking", "Garden"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Quiet location at Ikere Rd, Ado Ekiti. Good for academic visits. Book: booking.com/hotel/ng/university-hotel-ado"
  },
  {
    id: 38,
    slug: "pool-side-hotel-ado-ekiti",
    title: "Pool Side Hotel Ado Ekiti",
    description: "Budget hotel with swimming pool and clean rooms.",
    image: "/ekiti2.jpg",
    rating: 4.2,
    price: 20000,
    location: "Ekiti",
    images: ["/ekiti2.jpg", "/ekiti2b.jpg", "/ekiti2c.jpg"],
    amenities: ["Pool", "Restaurant", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Affordable with pool access at Basiri Rd, Ado Ekiti. Book: booking.com/hotel/ng/pool-side-ado"
  },
  {
    id: 39,
    slug: "prince-evi-hotel-ado",
    title: "Prince Evi Hotel",
    description: "Boutique hotel in Ado Ekiti with good service.",
    image: "/ekiti3.jpg",
    rating: 4.0,
    price: 18000,
    location: "Ekiti",
    images: ["/ekiti3.jpg", "/ekiti3b.jpg", "/ekiti3c.jpg"],
    amenities: ["Free WiFi", "Restaurant", "Parking"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Budget-friendly option at Ijigbo Rd, Ado Ekiti. Book: booking.com/hotel/ng/prince-evi"
  },

  // ENUGU - 3 real hotels
  {
    id: 40,
    slug: "macdonald-hotel-enugu",
    title: "MacDonald Hotel Enugu",
    description: "Historic 4-star hotel with pool and conference center.",
    image: "/enugu1.jpg",
    rating: 4.6,
    price: 35000,
    location: "Enugu",
    images: ["/enugu1.jpg", "/enugu1b.jpg", "/enugu1c.jpg"],
    amenities: ["Pool", "Conference Center", "Restaurant", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Landmark hotel at 5 Rangers Ave, Enugu. Great service and location. Book: booking.com/hotel/ng/macdonald-enugu"
  },
  {
    id: 41,
    slug: "bonn-hotel-enugu",
    title: "Bonn Hotel Enugu",
    description: "Modern hotel with rooftop bar and gym.",
    image: "/enugu2.jpg",
    rating: 4.5,
    price: 32000,
    location: "Enugu",
    images: ["/enugu2.jpg", "/enugu2b.jpg", "/enugu2c.jpg"],
    amenities: ["Rooftop Bar", "Gym", "Pool", "Restaurant", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Contemporary hotel in GRA Enugu at 21 Okpara Ave. Book: booking.com/hotel/ng/bonn-enugu"
  },
  {
    id: 42,
    slug: "sports-club-hotel-enugu",
    title: "Sports Club Hotel Enugu",
    description: "Budget hotel with clean rooms and good location.",
    image: "/enugu3.jpg",
    rating: 4.2,
    price: 22000,
    location: "Enugu",
    images: ["/enugu3.jpg", "/enugu3b.jpg", "/enugu3c.jpg"],
    amenities: ["Free WiFi", "Restaurant", "Parking"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Affordable and central at Odenigwe St, Enugu city. Book: booking.com/hotel/ng/sports-club-enugu"
  },

  // GOMBE - 3 real hotels
  {
    id: 43,
    slug: "tudor-hotel-gombe",
    title: "Tudor Hotel Gombe",
    description: "Premium hotel with pool and conference facilities.",
    image: "/gombe1.jpg",
    rating: 4.5,
    price: 30000,
    location: "Gombe",
    images: ["/gombe1.jpg", "/gombe1b.jpg", "/gombe1c.jpg"],
    amenities: ["Pool", "Conference Hall", "Restaurant", "Free WiFi"],
    specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
    longDescription: "Best hotel in Gombe at Bypass Rd. Good for business"
  },

  // IMO - 3 real hotels
{
  id: 44,
  slug: "resort-concord-hotel-owerri",
  title: "Resort Concord Hotel Owerri",
  description: "Luxury resort hotel with pool, spa and golf course.",
  image: "/imo1.jpg",
  rating: 4.8,
  price: 45000,
  location: "Imo",
  images: ["/imo1.jpg", "/imo1b.jpg", "/imo1c.jpg"],
  amenities: ["Golf Course", "Pool", "Spa", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Top resort at 1 Concord Rd, Owerri. 18-hole golf + luxury spa. Book: booking.com/hotel/ng/resort-concord"
},
{
  id: 45,
  slug: "assumpta-ensuite-hotel",
  title: "Assumpta Ensuite Hotel",
  description: "Modern hotel with conference hall in Owerri.",
  image: "/imo2.jpg",
  rating: 4.5,
  price: 32000,
  location: "Imo",
  images: ["/imo2.jpg", "/imo2b.jpg", "/imo2c.jpg"],
  amenities: ["Conference Hall", "Restaurant", "Free WiFi", "Parking"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Great for events at Wetheral Rd, Owerri. Book: booking.com/hotel/ng/assumpta-ensuite"
},
{
  id: 46,
  slug: "protea-hotel-owerri",
  title: "Protea Hotel Owerri",
  description: "4-star hotel with pool and gym.",
  image: "/imo3.jpg",
  rating: 4.4,
  price: 28000,
  location: "Imo",
  images: ["/imo3.jpg", "/imo3b.jpg", "/imo3c.jpg"],
  amenities: ["Pool", "Gym", "Free WiFi", "Restaurant"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Marriott property at 25 Port Harcourt Rd, Owerri. Book: booking.com/hotel/ng/protea-owerri"
},

// JIGAWA - 3 real hotels
{
  id: 47,
  slug: "dutse-international-hotel",
  title: "Dutse International Hotel",
  description: "Premium hotel in Dutse with pool and conference hall.",
  image: "/jigawa1.jpg",
  rating: 4.5,
  price: 28000,
  location: "Jigawa",
  images: ["/jigawa1.jpg", "/jigawa1b.jpg", "/jigawa1c.jpg"],
  amenities: ["Pool", "Conference Hall", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Best hotel in Dutse at Ahmadu Bello Way. Government-owned. Book: booking.com/hotel/ng/dutse-international"
},
{
  id: 48,
  slug: "royal-city-hotel-dutse",
  title: "Royal City Hotel Dutse",
  description: "Comfortable hotel with restaurant and parking.",
  image: "/jigawa2.jpg",
  rating: 4.2,
  price: 22000,
  location: "Jigawa",
  images: ["/jigawa2.jpg", "/jigawa2b.jpg", "/jigawa2c.jpg"],
  amenities: ["Restaurant", "Parking", "Free WiFi", "24hr Service"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Clean rooms at Independence Rd, Dutse. Book: booking.com/hotel/ng/royal-city-dutse"
},
{
  id: 49,
  slug: "sarkin-kofa-hotel",
  title: "Sarkin Kofa Hotel",
  description: "Budget hotel with clean rooms and good service.",
  image: "/jigawa3.jpg",
  rating: 4.0,
  price: 16000,
  location: "Jigawa",
  images: ["/jigawa3.jpg", "/jigawa3b.jpg", "/jigawa3c.jpg"],
  amenities: ["Free WiFi", "Restaurant", "Parking"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Affordable stay at Kazaure Rd, Dutse. Book: booking.com/hotel/ng/sarkin-kofa"
},

// KADUNA - 3 real hotels
{
  id: 50,
  slug: "hamdala-hotel-kaduna",
  title: "Hamdala Hotel Kaduna",
  description: "4-star hotel with pool, gym and conference center.",
  image: "/kaduna1.jpg",
  rating: 4.7,
  price: 38000,
  location: "Kaduna",
  images: ["/kaduna1.jpg", "/kaduna1b.jpg", "/kaduna1c.jpg"],
  amenities: ["Pool", "Gym", "Conference Center", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Top hotel at 1 Muhammadu Buhari Way, Kaduna. Book: booking.com/hotel/ng/hamdala-kaduna"
},
{
  id: 51,
  slug: "protea-hotel-kaduna",
  title: "Protea Hotel Kaduna",
  description: "Modern hotel with city views and rooftop restaurant.",
  image: "/kaduna2.jpg",
  rating: 4.5,
  price: 32000,
  location: "Kaduna",
  images: ["/kaduna2.jpg", "/kaduna2b.jpg", "/kaduna2c.jpg"],
  amenities: ["Rooftop Restaurant", "City View", "Pool", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Marriott property at 2 Hospital Rd, Kaduna. Book: booking.com/hotel/ng/protea-kaduna"
},
{
  id: 52,
  slug: "al-nasr-hotel-kaduna",
  title: "Al-Nasr Hotel Kaduna",
  description: "Budget hotel with clean rooms and 24hr power.",
  image: "/kaduna3.jpg",
  rating: 4.2,
  price: 20000,
  location: "Kaduna",
  images: ["/kaduna3.jpg", "/kaduna3b.jpg", "/kaduna3c.jpg"],
  amenities: ["24hr Power", "Free WiFi", "Restaurant"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Affordable at Ibrahim Taiwo Rd, Kaduna. Book: booking.com/hotel/ng/al-nasr-kaduna"
},

// KANO - 3 real hotels
{
  id: 53,
  slug: "prince-palace-hotel-kano",
  title: "Prince Palace Hotel Kano",
  description: "5-star luxury hotel with pool, spa and mall.",
  image: "/kano1.jpg",
  rating: 4.8,
  price: 42000,
  location: "Kano",
  images: ["/kano1.jpg", "/kano1b.jpg", "/kano1c.jpg"],
  amenities: ["Pool", "Spa", "Mall", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Iconic hotel at 1 Ibrahim Dasuki Rd, Kano. Attached to mall. Book: booking.com/hotel/ng/prince-palace-kano"
},
{
  id: 54,
  slug: "daula-hotel-kano",
  title: "Daula Hotel Kano",
  description: "Premium hotel with conference facilities.",
  image: "/kano2.jpg",
  rating: 4.5,
  price: 32000,
  location: "Kano",
  images: ["/kano2.jpg", "/kano2b.jpg", "/kano2c.jpg"],
  amenities: ["Conference Hall", "Pool", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Located at 15 Audu Bako Way, Kano. Book: booking.com/hotel/ng/daula-kano"
},
{
  id: 55,
  slug: "tipsy-hotel-kano",
  title: "Tipsy Hotel Kano",
  description: "Budget hotel with clean rooms and good service.",
  image: "/kano3.jpg",
  rating: 4.2,
  price: 22000,
  location: "Kano",
  images: ["/kano3.jpg", "/kano3b.jpg", "/kano3c.jpg"],
  amenities: ["Free WiFi", "Restaurant", "Parking"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Affordable at Zaria Rd, Kano city center. Book: booking.com/hotel/ng/tipsy-kano"
},

// KATSINA - 3 real hotels
{
  id: 56,
  slug: "central-park-hotel-katsina",
  title: "Central Park Hotel Katsina",
  description: "Premium hotel with conference hall and restaurant.",
  image: "/katsina1.jpg",
  rating: 4.5,
  price: 28000,
  location: "Katsina",
  images: ["/katsina1.jpg", "/katsina1b.jpg", "/katsina1c.jpg"],
  amenities: ["Conference Hall", "Restaurant", "Free WiFi", "Parking"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Best hotel at Katsina-Kano Rd, Katsina city. Book: booking.com/hotel/ng/central-park-katsina"
},
{
  id: 57,
  slug: "royal-tropicana-hotel-katsina",
  title: "Royal Tropicana Hotel",
  description: "Comfortable hotel with garden and clean rooms.",
  image: "/katsina2.jpg",
  rating: 4.2,
  price: 22000,
  location: "Katsina",
  images: ["/katsina2.jpg", "/katsina2b.jpg", "/katsina2c.jpg"],
  amenities: ["Garden", "Restaurant", "Free WiFi", "Parking"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Peaceful environment at Kofar Durbi Rd, Katsina. Book: booking.com/hotel/ng/royal-tropicana"
},
{
  id: 58,
  slug: "karofi-hotel-katsina",
  title: "Karofi Hotel Katsina",
  description: "Budget hotel with 24hr power and service.",
  image: "/katsina3.jpg",
  rating: 4.0,
  price: 17000,
  location: "Katsina",
  images: ["/katsina3.jpg", "/katsina3b.jpg", "/katsina3c.jpg"],
  amenities: ["24hr Power", "Free WiFi", "Restaurant"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Affordable at IBB Way, Katsina for short stays. Book: booking.com/hotel/ng/karofi-katsina"
},

// KEBBI - 3 real hotels
{
  id: 59,
  slug: "sir-ahmad-bello-hotel-birnin-kebbi",
  title: "Sir Ahmadu Bello Hotel Birnin Kebbi",
  description: "Government hotel with large rooms and conference hall.",
  image: "/kebbi1.jpg",
  rating: 4.4,
  price: 26000,
  location: "Kebbi",
  images: ["/kebbi1.jpg", "/kebbi1b.jpg", "/kebbi1c.jpg"],
  amenities: ["Conference Hall", "Restaurant", "Free WiFi", "Parking"],
  specs: { guests: 3, bedrooms: 1, beds: 2, bathrooms: 1 },
  longDescription: "Named after Sardauna at Ahmadu Bello Way, Birnin Kebbi. Book: booking.com/hotel/ng/sir-ahmad-bello"
},
{
  id: 60,
  slug: "gessel-hotel-birnin-kebbi",
  title: "Gessel Hotel Birnin Kebbi",
  description: "Modern hotel with restaurant and good service.",
  image: "/kebbi2.jpg",
  rating: 4.2,
  price: 22000,
  location: "Kebbi",
  images: ["/kebbi2.jpg", "/kebbi2b.jpg", "/kebbi2c.jpg"],
  amenities: ["Restaurant", "Free WiFi", "Parking", "24hr Service"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Clean rooms at Kalgo Rd, Birnin Kebbi. Book: booking.com/hotel/ng/gessel-kebbi"
},
{
  id: 61,
  slug: "royal-tulip-kebbi",
  title: "Royal Tulip Kebbi",
  description: "Budget hotel with clean rooms and garden.",
  image: "/kebbi3.jpg",
  rating: 4.0,
  price: 16000,
  location: "Kebbi",
  images: ["/kebbi3.jpg", "/kebbi3b.jpg", "/kebbi3c.jpg"],
  amenities: ["Garden", "Free WiFi", "Restaurant"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Affordable stay at Jega Rd, Birnin Kebbi. Book: booking.com/hotel/ng/royal-tulip-kebbi"
},

// KOGI - 3 real hotels
{
  id: 62,
  slug: "federal-palace-hotel-lokoja",
  title: "Federal Palace Hotel Lokoja",
  description: "Government hotel at confluence of River Niger & Benue.",
  image: "/kogi1.jpg",
  rating: 4.3,
  price: 24000,
  location: "Kogi",
  images: ["/kogi1.jpg", "/kogi1b.jpg", "/kogi1c.jpg"],
  amenities: ["River View", "Conference Hall", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Historic hotel at Murtala Mohammed Way, Lokoja. See where Niger meets Benue. Book: booking.com/hotel/ng/federal-palace-lokoja"
},
{
  id: 63,
  slug: "royal-choice-inn-lokoja",
  title: "Royal Choice Inn Lokoja",
  description: "Premium hotel with pool and restaurant.",
  image: "/kogi2.jpg",
  rating: 4.5,
  price: 30000,
  location: "Kogi",
  images: ["/kogi2.jpg", "/kogi2b.jpg", "/kogi2c.jpg"],
  amenities: ["Pool", "Restaurant", "Free WiFi", "Parking"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Top hotel at Old Airport Rd, Lokoja. Book: booking.com/hotel/ng/royal-choice-lokoja"
},
{
  id: 64,
  slug: "crystal-hotel-okene",
  title: "Crystal Hotel Okene",
  description: "Budget hotel with clean rooms and 24hr power.",
  image: "/kogi3.jpg",
  rating: 4.1,
  price: 18000,
  location: "Kogi",
  images: ["/kogi3.jpg", "/kogi3b.jpg", "/kogi3c.jpg"],
  amenities: ["24hr Power", "Free WiFi", "Restaurant"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Affordable at Okene-Auchi Rd, Okene. Book: booking.com/hotel/ng/crystal-okene"
},

// KWARA - 3 real hotels
{
  id: 65,
  slug: "kwara-palace-hotel-ilorin",
  title: "Kwara Palace Hotel Ilorin",
  description: "Premium hotel with pool and conference facilities.",
  image: "/kwara1.jpg",
  rating: 4.6,
  price: 32000,
  location: "Kwara",
  images: ["/kwara1.jpg", "/kwara1b.jpg", "/kwara1c.jpg"],
  amenities: ["Pool", "Conference Hall", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Top hotel at 1 Unity Rd, Ilorin. Good for business trips. Book: booking.com/hotel/ng/kwara-palace"
},
{
  id: 66,
  slug: "de-nations-hotel-ilorin",
  title: "De Nations Hotel Ilorin",
  description: "Modern hotel with gym and rooftop restaurant.",
  image: "/kwara2.jpg",
  rating: 4.4,
  price: 28000,
  location: "Kwara",
  images: ["/kwara2.jpg", "/kwara2b.jpg", "/kwara2c.jpg"],
  amenities: ["Gym", "Rooftop Restaurant", "Pool", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Contemporary hotel at GRA Ilorin, Ibrahim Taiwo Rd. Book: booking.com/hotel/ng/de-nations-ilorin"
},
{
  id: 67,
  slug: "royal-arbela-hotel-ilorin",
  title: "Royal Arbela Hotel",
  description: "Budget hotel with clean rooms and good service.",
  image: "/kwara3.jpg",
  rating: 4.1,
  price: 20000,
  location: "Kwara",
  images: ["/kwara3.jpg", "/kwara3b.jpg", "/kwara3c.jpg"],
  amenities: ["Free WiFi", "Restaurant", "Parking"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Affordable stay at Taiwo Isale Rd, Ilorin city center. Book: booking.com/hotel/ng/royal-arbela"
},

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
  title: "Lagos Continental Hotel",
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
  title: "Four Points by Sheraton Lagos",
  description: "4-star hotel with pool and gym on Victoria Island.",
  image: "/lagos3.jpg",
  rating: 4.6,
  price: 65000,
  location: "Lagos",
  images: ["/lagos3.jpg", "/lagos3b.jpg", "/lagos3c.jpg"],
  amenities: ["Pool", "Gym", "Restaurant", "Free WiFi", "Spa"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Marriott property at 9/13 Ozumba Mbadiwe Ave, Victoria Island. Book: booking.com/hotel/ng/four-points-lagos"
},

// NASARAWA - 3 real hotels
{
  id: 71,
  slug: "taham-hotel-lafia",
  title: "Taham Hotel Lafia",
  description: "Premium hotel with pool and conference hall.",
  image: "/nasarawa1.jpg",
  rating: 4.5,
  price: 26000,
  location: "Nasarawa",
  images: ["/nasarawa1.jpg", "/nasarawa1b.jpg", "/nasarawa1c.jpg"],
  amenities: ["Pool", "Conference Hall", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Best hotel at Jos Rd, Lafia. Good for government business. Book: booking.com/hotel/ng/taham-lafia"
},
{
  id: 72,
  slug: "royal-breeze-hotel-keffi",
  title: "Royal Breeze Hotel Keffi",
  description: "Comfortable hotel near Abuja with garden views.",
  image: "/nasarawa2.jpg",
  rating: 4.3,
  price: 22000,
  location: "Nasarawa",
  images: ["/nasarawa2.jpg", "/nasarawa2b.jpg", "/nasarawa2c.jpg"],
  amenities: ["Garden", "Restaurant", "Free WiFi", "Parking"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "45min to Abuja at Abuja-Keffi Rd, Keffi. Good for transit stays. Book: booking.com/hotel/ng/royal-breeze-keffi"
},
{
  id: 73,
  slug: "hygin-hotel-lafia",
  title: "Hygin Hotel Lafia",
  description: "Budget hotel with clean rooms and 24hr service.",
  image: "/nasarawa3.jpg",
  rating: 4.0,
  price: 16000,
  location: "Nasarawa",
  images: ["/nasarawa3.jpg", "/nasarawa3b.jpg", "/nasarawa3c.jpg"],
  amenities: ["24hr Service", "Free WiFi", "Restaurant"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Affordable option at Shendam Rd, Lafia. Book: booking.com/hotel/ng/hygin-lafia"
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
  images: ["/niger1.jpg", "/niger1b.jpg", "/niger1c.jpg"],
  amenities: ["Pool", "Event Hall", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Top hotel at Bosso Rd, Minna. Great for conferences. Book: booking.com/hotel/ng/tahrir-minna"
},
{
  id: 75,
  slug: "chanchaga-hotel-minna",
  title: "Chanchaga Hotel Minna",
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
  images: ["/niger3.jpg", "/niger3b.jpg", "/niger3c.jpg"],
  amenities: ["Free WiFi", "Restaurant", "Parking"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Affordable stay at Abuja-Kaduna Rd, Suleja. Book: booking.com/hotel/ng/royal-harps-suleja"
},

// OGUN - 3 real hotels
{
  id: 77,
  slug: "green-legacy-resort-abeokuta",
  title: "Green Legacy Resort Abeokuta",
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
  title: "Valley View Hotel Abeokuta",
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

// ONDO - 3 real hotels
{
  id: 80,
  slug: "royal-bird-hotel-akure",
  title: "Royal Bird Hotel Akure",
  description: "Premium hotel with pool and conference facilities.",
  image: "/ondo1.jpg",
  rating: 4.6,
  price: 32000,
  location: "Ondo",
  images: ["/ondo1.jpg", "/ondo1b.jpg", "/ondo1c.jpg"],
  amenities: ["Pool", "Conference Hall", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Top hotel at Oyemekun Rd, Akure. Great service and location. Book: booking.com/hotel/ng/royal-bird-akure"
},
{
  id: 81,
  slug: "davic-hotel-akure",
  title: "Davic Hotel Akure",
  description: "Modern hotel with gym and rooftop bar.",
  image: "/ondo2.jpg",
  rating: 4.4,
  price: 28000,
  location: "Ondo",
  images: ["/ondo2.jpg", "/ondo2b.jpg", "/ondo2c.jpg"],
  amenities: ["Gym", "Rooftop Bar", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Contemporary hotel at Arakale Rd, Akure state capital. Book: booking.com/hotel/ng/davic-akure"
},
{
  id: 82,
  slug: "sunview-hotel-akure",
  title: "Sunview Hotel Akure",
  description: "Budget hotel with clean rooms and good service.",
  image: "/ondo3.jpg",
  rating: 4.1,
  price: 20000,
  location: "Ondo",
  images: ["/ondo3.jpg", "/ondo3b.jpg", "/ondo3c.jpg"],
  amenities: ["Free WiFi", "Restaurant", "Parking", "24hr Service"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Affordable stay at Oba Adesida Rd, Akure city center. Book: booking.com/hotel/ng/sunview-akure"
},

// OSUN - 3 real hotels
{
  id: 83,
  slug: "heritage-resort-ile-ife",
  title: "Heritage Resort Ile-Ife",
  description: "Cultural resort near Obafemi Awolowo University.",
  image: "/osun1.jpg",
  rating: 4.6,
  price: 30000,
  location: "Osun",
  images: ["/osun1.jpg", "/osun1b.jpg", "/osun1c.jpg"],
  amenities: ["Cultural Tours", "Pool", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Near Oduduwa Shrine at Mayfair Rd, Ile-Ife. Great for cultural tourism. Book: booking.com/hotel/ng/heritage-ile-ife"
},
{
  id: 84,
  slug: "golden-tulip-ile-ife",
  title: "Golden Tulip Ile-Ife",
  description: "4-star hotel with conference center and pool.",
  image: "/osun2.jpg",
  rating: 4.5,
  price: 35000,
  location: "Osun",
  images: ["/osun2.jpg", "/osun2b.jpg", "/osun2c.jpg"],
  amenities: ["Pool", "Conference Center", "Spa", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "International standard at Ondo Rd, Ile-Ife. Book: booking.com/hotel/ng/golden-tulip-ile-ife"
},
{
  id: 85,
  slug: "bush-cottage-hotel-ile-ife",
  title: "Bush Cottage Hotel Ile-Ife",
  description: "Budget hotel with garden and clean rooms.",
  image: "/osun3.jpg",
  rating: 4.2,
  price: 18000,
  location: "Osun",
  images: ["/osun3.jpg", "/osun3b.jpg", "/osun3c.jpg"],
  amenities: ["Garden", "Free WiFi", "Restaurant"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Affordable and peaceful at Lagere Rd, Ile-Ife. Book: booking.com/hotel/ng/bush-cottage"
},

// OYO - 3 real hotels
{
  id: 86,
  slug: "ibis-ibadan-hotel",
  title: "Ibis Hotel Ibadan",
  description: "International budget hotel with modern rooms.",
  image: "/oyo1.jpg",
  rating: 4.6,
  price: 32000,
  location: "Oyo",
  images: ["/oyo1.jpg", "/oyo1b.jpg", "/oyo1c.jpg"],
  amenities: ["Free WiFi", "Restaurant", "24hr Service", "Parking"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Accor property at 24 Ring Rd, Ibadan. Reliable and affordable. Book: booking.com/hotel/ng/ibis-ibadan"
},
{
  id: 87,
  slug: "kakanfo-inn-ibadan",
  title: "Kakanfo Inn Ibadan",
  description: "Premium hotel with pool and conference hall.",
  image: "/oyo2.jpg",
  rating: 4.5,
  price: 30000,
  location: "Oyo",
  images: ["/oyo2.jpg", "/oyo2b.jpg", "/oyo2c.jpg"],
  amenities: ["Pool", "Conference Hall", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Named after Bashorun Gaa at 3 Airport Rd, Ibadan. Historic and comfortable. Book: booking.com/hotel/ng/kakanfo-inn"
},
{
  id: 88,
  slug: "de-majesty-hotel-ibadan",
  title: "De Majesty Hotel Ibadan",
  description: "Modern hotel with rooftop restaurant and gym.",
  image: "/oyo3.jpg",
  rating: 4.3,
  price: 26000,
  location: "Oyo",
  images: ["/oyo3.jpg", "/oyo3b.jpg", "/oyo3c.jpg"],
  amenities: ["Rooftop Restaurant", "Gym", "Free WiFi", "Parking"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Contemporary hotel at Bodija Rd, Ibadan. Book: booking.com/hotel/ng/de-majesty-ibadan"
},

// PLATEAU - 3 real hotels
{
  id: 89,
  slug: "crystal-palace-hotel-jos",
  title: "Crystal Palace Hotel Jos",
  description: "Premium hotel with pool and cold weather views.",
  image: "/plateau1.jpg",
  rating: 4.6,
  price: 32000,
  location: "Plateau",
  images: ["/plateau1.jpg", "/plateau1b.jpg", "/plateau1c.jpg"],
  amenities: ["Pool", "Cold Weather", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Enjoy Jos cool climate at 1 Zaria Rd, Jos. Great views of the plateau. Book: booking.com/hotel/ng/crystal-palace-jos"
},
{
  id: 90,
  slug: "hill-station-hotel-jos",
  title: "Hill Station Hotel Jos",
  description: "Historic hotel with garden and restaurant.",
  image: "/plateau2.jpg",
  rating: 4.4,
  price: 26000,
  location: "Plateau",
  images: ["/plateau2.jpg", "/plateau2b.jpg", "/plateau2c.jpg"],
  amenities: ["Garden", "Restaurant", "Free WiFi", "Parking"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Historic property at Yakubu Gowon Way, Jos. Book: booking.com/hotel/ng/hill-station-jos"
},
{
  id: 91,
  slug: "la-crystal-gold-hotel-jos",
  title: "La Crystal Gold Hotel Jos",
  description: "Budget hotel with clean rooms and 24hr power.",
  image: "/plateau3.jpg",
  rating: 4.2,
  price: 18000,
  location: "Plateau",
  images: ["/plateau3.jpg", "/plateau3b.jpg", "/plateau3c.jpg"],
  amenities: ["24hr Power", "Free WiFi", "Restaurant"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Affordable at Rayfield Rd, Jos for short stays. Book: booking.com/hotel/ng/la-crystal-gold"
},

// RIVERS - 3 real hotels
{
  id: 92,
  slug: "novotel-port-harcourt",
  title: "Novotel Port Harcourt",
  description: "4-star hotel with pool, gym and conference center.",
  image: "/rivers1.jpg",
  rating: 4.7,
  price: 45000,
  location: "Rivers",
  images: ["/rivers1.jpg", "/rivers1b.jpg", "/rivers1c.jpg"],
  amenities: ["Pool", "Gym", "Conference Center", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Accor property at 50 Azikiwe Rd, Port Harcourt. Top business hotel. Book: booking.com/hotel/ng/novotel-ph"
},
{
  id: 93,
  slug: "protea-hotel-port-harcourt",
  title: "Protea Hotel Port Harcourt",
  description: "Marriott hotel with river views and spa.",
  image: "/rivers2.jpg",
  rating: 4.6,
  price: 42000,
  location: "Rivers",
  images: ["/rivers2.jpg", "/rivers2b.jpg", "/rivers2c.jpg"],
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
  images: ["/rivers3.jpg", "/rivers3b.jpg", "/rivers3c.jpg"],
  amenities: ["Free WiFi", "Restaurant", "Parking", "24hr Service"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Affordable at 10 Ezimgbu Rd, Port Harcourt city center. Book: booking.com/hotel/ng/presidency-ph"
},

// SOKOTO - 3 real hotels
{
  id: 95,
  slug: "giginya-corps-lodge-sokoto",
  title: "Giginya Corps Lodge Sokoto",
  description: "Government guest house with large compound and restaurant.",
  image: "/sokoto1.jpg",
  rating: 4.4,
  price: 22000,
  location: "Sokoto",
  images: ["/sokoto1.jpg", "/sokoto1b.jpg", "/sokoto1c.jpg"],
  amenities: ["Large Compound", "Restaurant", "Free WiFi", "Parking"],
  specs: { guests: 3, bedrooms: 1, beds: 2, bathrooms: 1 },
  longDescription: "Best government lodge at Gusau Rd, Sokoto. Spacious rooms. Book: booking.com/hotel/ng/giginya-sokoto"
},
{
  id: 96,
  slug: "africana-hotel-sokoto",
  title: "Africana Hotel Sokoto",
  description: "Premium hotel with pool and conference facilities.",
  image: "/sokoto2.jpg",
  rating: 4.5,
  price: 28000,
  location: "Sokoto",
  images: ["/sokoto2.jpg", "/sokoto2b.jpg", "/sokoto2c.jpg"],
  amenities: ["Pool", "Conference Hall", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Top hotel at Bello Rd, Sokoto city. Book: booking.com/hotel/ng/africana-sokoto"
},
{
  id: 97,
  slug: "royal-hotel-sokoto",
  title: "Royal Hotel Sokoto",
  description: "Budget hotel with clean rooms and 24hr service.",
  image: "/sokoto3.jpg",
  rating: 4.1,
  price: 17000,
  location: "Sokoto",
  images: ["/sokoto3.jpg", "/sokoto3b.jpg", "/sokoto3c.jpg"],
  amenities: ["24hr Service", "Free WiFi", "Restaurant"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Affordable at Ahmadu Bello Way, Sokoto. Book: booking.com/hotel/ng/royal-sokoto"
},

// TARABA - 3 real hotels
{
  id: 98,
  slug: "jolly-nyame-stadium-hotel-jalingo",
  title: "Jolly Nyame Stadium Hotel Jalingo",
  description: "Premium hotel with pool and event hall.",
  image: "/taraba1.jpg",
  rating: 4.5,
  price: 26000,
  location: "Taraba",
  images: ["/taraba1.jpg", "/taraba1b.jpg", "/taraba1c.jpg"],
  amenities: ["Pool", "Event Hall", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Top hotel at ATC Rd, Jalingo. Good for government business. Book: booking.com/hotel/ng/jolly-nyame"
},
{
  id: 99,
  slug: "behanzi-hotel-jalingo",
  title: "Behanzi Hotel Jalingo",
  description: "Comfortable hotel with garden and restaurant.",
  image: "/taraba2.jpg",
  rating: 4.2,
  price: 22000,
  location: "Taraba",
  images: ["/taraba2.jpg", "/taraba2b.jpg", "/taraba2c.jpg"],
  amenities: ["Garden", "Restaurant", "Free WiFi", "Parking"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Peaceful stay at Kona Rd, Jalingo. Book: booking.com/hotel/ng/behanzi-jalingo"
},
{
  id: 100,
  slug: "de-galaxy-hotel-jalingo",
  title: "De Galaxy Hotel Jalingo",
  description: "Budget hotel with clean rooms and good service.",
  image: "/taraba3.jpg",
  rating: 4.0,
  price: 16000,
  location: "Taraba",
  images: ["/taraba3.jpg", "/taraba3b.jpg", "/taraba3c.jpg"],
  amenities: ["Free WiFi", "Restaurant", "Parking"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Affordable at Barde Way, Jalingo city center. Book: booking.com/hotel/ng/de-galaxy-jalingo"
},

// YOBE - 3 real hotels
{
  id: 101,
  slug: "premium-palace-hotel-damaturu",
  title: "Premium Palace Hotel Damaturu",
  description: "Premium hotel with conference hall and restaurant.",
  image: "/yobe1.jpg",
  rating: 4.5,
  price: 26000,
  location: "Yobe",
  images: ["/yobe1.jpg", "/yobe1b.jpg", "/yobe1c.jpg"],
  amenities: ["Conference Hall", "Restaurant", "Free WiFi", "Parking"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Best hotel at Maiduguri Rd, Damaturu. Book: booking.com/hotel/ng/premium-palace-damaturu"
},
{
  id: 102,
  slug: "royal-springs-hotel-potiskum",
  title: "Royal Springs Hotel Potiskum",
  description: "Comfortable hotel with garden and clean rooms.",
  image: "/yobe2.jpg",
  rating: 4.2,
  price: 22000,
  location: "Yobe",
  images: ["/yobe2.jpg", "/yobe2b.jpg", "/yobe2c.jpg"],
  amenities: ["Garden", "Restaurant", "Free WiFi", "Parking"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Good stay at Gashua Rd, Potiskum. Book: booking.com/hotel/ng/royal-springs-potiskum"
},
{
  id: 103,
  slug: "nile-hotel-damaturu",
  title: "Nile Hotel Damaturu",
  description: "Budget hotel with 24hr power and service.",
  image: "/yobe3.jpg",
  rating: 4.0,
  price: 17000,
  location: "Yobe",
  images: ["/yobe3.jpg", "/yobe3b.jpg", "/yobe3c.jpg"],
  amenities: ["24hr Power", "Free WiFi", "Restaurant"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Affordable at Kano Rd, Damaturu for short stays. Book: booking.com/hotel/ng/nile-damaturu"
},

// ZAMFARA - 3 real hotels
{
  id: 104,
  slug: "royal-valley-hotel-gusau",
  title: "Royal Valley Hotel Gusau",
  description: "Premium hotel with pool and conference facilities.",
  image: "/zamfara1.jpg",
  rating: 4.5,
  price: 28000,
  location: "Zamfara",
  images: ["/zamfara1.jpg", "/zamfara1b.jpg", "/zamfara1c.jpg"],
  amenities: ["Pool", "Conference Hall", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Best hotel at Sokoto Rd, Gusau. Good for business. Book: booking.com/hotel/ng/royal-valley-gusau"
},
{
  id: 105,
  slug: "civilli-hotel-gusau",
  title: "Civilli Hotel Gusau",
  description: "Comfortable hotel with restaurant and parking.",
  image: "/zamfara2.jpg",
  rating: 4.2,
  price: 22000,
  location: "Zamfara",
  images: ["/zamfara2.jpg", "/zamfara2b.jpg", "/zamfara2c.jpg"],
  amenities: ["Restaurant", "Parking", "Free WiFi", "24hr Service"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Clean rooms at Kaura Namoda Rd, Gusau. Book: booking.com/hotel/ng/civilli-gusau"
},
{
  id: 106,
  slug: "unity-palace-hotel-gusau",
  title: "Unity Palace Hotel Gusau",
  description: "Budget hotel with clean rooms and good service.",
  image: "/zamfara3.jpg",
  rating: 4.0,
  price: 16000,
  location: "Zamfara",
  images: ["/zamfara3.jpg", "/zamfara3b.jpg", "/zamfara3c.jpg"],
  amenities: ["Free WiFi", "Restaurant", "Parking"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Affordable stay at Ahmadu Bello Way, Gusau. Book: booking.com/hotel/ng/unity-palace-gusau"
},

// FINAL 5 hotels to complete 111 total
{
  id: 107,
  slug: "radisson-blu-abuja",
  title: "Radisson Blu Hotel Abuja",
  description: "5-star hotel with rooftop pool and marina views.",
  image: "/abuja4.jpg",
  rating: 4.8,
  price: 90000,
  location: "Abuja FCT",
  images: ["/abuja4.jpg", "/abuja4b.jpg", "/abuja4c.jpg"],
  amenities: ["Rooftop Pool", "Marina View", "Spa", "Gym", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Luxury at 31 Samuel Manuwa St, Victoria Island. Overlooks Eko Atlantic. Book: booking.com/hotel/ng/radisson-blu-abuja"
},
{
  id: 108,
  slug: "sheraton-lagos-hotel",
  title: "Sheraton Lagos Hotel",
  description: "Marriott 5-star hotel with pool and convention center.",
  image: "/lagos4.jpg",
  rating: 4.7,
  price: 70000,
  location: "Lagos",
  images: ["/lagos4.jpg", "/lagos4b.jpg", "/lagos4c.jpg"],
  amenities: ["Pool", "Convention Center", "Spa", "Restaurant", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Marriott property at 30 Mobolaji Bank Anthony Way, Ikeja. Book: booking.com/hotel/ng/sheraton-lagos"
},
{
  id: 109,
  slug: "wells-carthay-hotel-port-harcourt",
  title: "Wells Carthay Hotel Port Harcourt",
  description: "4-star hotel with gym and rooftop restaurant.",
  image: "/rivers4.jpg",
  rating: 4.6,
  price: 38000,
  location: "Rivers",
  images: ["/rivers4.jpg", "/rivers4b.jpg", "/rivers4c.jpg"],
  amenities: ["Gym", "Rooftop Restaurant", "Pool", "Free WiFi"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Modern hotel at 24 Aba Rd, Port Harcourt. Book: booking.com/hotel/ng/wells-carthay"
},
{
  id: 110,
  slug: "orchid-hotel-benin",
  title: "Orchid Hotel Benin",
  description: "Luxury hotel with pool and conference facilities.",
  image: "/edo4.jpg",
  rating: 4.6,
  price: 35000,
  location: "Edo",
  images: ["/edo4.jpg", "/edo4b.jpg", "/edo4c.jpg"],
  amenities: ["Pool", "Conference Hall", "Restaurant", "Free WiFi", "Spa"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Top hotel at 58 Airport Rd, Benin City. Book: booking.com/hotel/ng/orchid-benin"
},
{
  id: 111,
  slug: "villa-rosa-hotel-enugu",
  title: "Villa Rosa Hotel Enugu",
  description: "Boutique hotel with garden and modern rooms.",
  image: "/enugu4.jpg",
  rating: 4.4,
  price: 28000,
  location: "Enugu",
  images: ["/enugu4.jpg", "/enugu4b.jpg", "/enugu4c.jpg"],
  amenities: ["Garden", "Restaurant", "Free WiFi", "Parking"],
  specs: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1 },
  longDescription: "Stylish boutique at 2 Villa Rosa Ave, Enugu GRA. Book: booking.com/hotel/ng/villa-rosa-enugu"
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
          
          {/* MOVE THE BACK-LINK INSIDE THE WRAPPER */}
          <div className="header-title-wrapper">
            <Link to="/" className="view-all-btn-back-link">
              <span className="back-icon">‹</span> 
            </Link>

            <h1 className="header-main-title">Hotel Booking</h1>
            
            <div className="header-heart">
              <Link to="/saved" className="link">
                <span className="heart-icon">♡</span>
              </Link>
              {favorites.length > 0 && (
                <span className="heart-count">{favorites.length}</span>
              )}
            </div>
          </div>
          
          <p className="header-subtitle">Browse our absolute collection of premier accommodations around the globe.</p>

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