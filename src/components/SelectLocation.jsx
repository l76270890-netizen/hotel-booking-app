import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "./LocationContext"; // ✅ if both files in src/components/import { FiArrowLeft, FiMapPin, FiNavigation, FiSearch, FiX } from "react-icons/fi";
import "./SelectLocation.css";

const NIGERIAN_STATES = [
  "Lagos", "Abuja", "Rivers", "Kano", "Akwa Ibom", "Kaduna",
  "Oyo", "Enugu", "Edo", "Delta", "Anambra", "Imo", "Abia",
  "Plateau", "Borno", "Sokoto", "Katsina", "Cross River", 
  "Benue", "Niger", "Ogun", "Ondo", "Osun", "Ekiti",
  "Bayelsa", "Ebonyi", "Gombe", "Jigawa", "Kebbi", "Kogi",
  "Kwara", "Nasarawa", "Taraba", "Yobe", "Zamfara"
];

function SelectLocation() {
  const navigate = useNavigate();
  const { location, saveLocation } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStates = NIGERIAN_STATES.filter(state =>
    state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectState = (state) => {
    saveLocation({ country: "Nigeria", state });
    navigate(-1);
  };

  const handleNearby = () => {
    // Add geolocation logic here later
    saveLocation({ country: "Nigeria", state: "Nearby" });
    navigate(-1);
  };

  return (
    <div className="select-location-page">
      <div className="select-location-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FiArrowLeft size={24} />
        </button>
        <h1 className="page-title">Where to?</h1>
      </div>

      <div className="search-wrapper">
        <div className="search-input-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for a state"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery("")}>
              <FiX size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="location-options">
        {!searchQuery && (
          <>
            <button className="location-option nearby" onClick={handleNearby}>
              <div className="option-icon">
                <FiNavigation size={20} />
              </div>
              <div className="option-content">
                <p className="option-title">Nearby</p>
                <p className="option-subtitle">Find what's around you</p>
              </div>
            </button>
            <div className="location-divider"></div>
          </>
        )}

        {filteredStates.length > 0 ? (
          filteredStates.map(state => (
            <button
              key={state}
              onClick={() => handleSelectState(state)}
              className={`location-option ${location?.state === state ? 'active' : ''}`}
            >
              <div className="option-icon">
                <FiMapPin size={20} />
              </div>
              <div className="option-content">
                <p className="option-title">{state}, Nigeria</p>
              </div>
            </button>
          ))
        ) : (
          <div className="no-results">
            <p>No states found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectLocation;