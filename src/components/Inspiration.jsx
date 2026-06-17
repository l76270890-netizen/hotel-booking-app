import React from 'react';
import "./Inspiration.css";

const Inspiration = () => {
  const destinations = [
    { city: "Jakarta", country: "Indonesia", img: "last.jpeg" },
    { city: "Kuala Lumpur", country: "Malaysia", img: "card2.jpg" },
    { city: "Tokyo", country: "Japan", img: "tokyo.jpeg" },
    { city: "London", country: "England", img: "london.jpeg" },
    { city: "Paris", country: "France", img: "paris.jpeg" },
    { city: "Lagos", country: "Nigeria", img: "card3.jpg" },
    { city: "Madrid", country: "Spain", img: "niger.jpeg" },
    { city: "Hanoi", country: "Vietnam", img: "card4.jpg" }
  ];

  // Duplicate the array to create a flawless, seamless infinite loop link
  const duplicatedDestinations = [...destinations, ...destinations];

  return (
    <section className="inspiration-section">
      <h2 className="inspiration-title">Need Inspiration?</h2>
      <p className="inspiration-subtitle">View our hand-picked list of destinations</p>

      {/* Overflow wrapper hides cards extending beyond screen edges */}
      <div className="inspiration-marquee-wrapper">
        <div className="inspiration-track">
          {duplicatedDestinations.map((dest, index) => (
            <div className="inspiration-card" key={index}>
              <div className="image-circle-container">
                <img src={dest.img} alt={dest.city} />
              </div>
              <h4 className="dest-city">{dest.city}</h4>
              <p className="dest-country">{dest.country}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Inspiration;
