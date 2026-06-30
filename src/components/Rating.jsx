import React from 'react';
import "./Rating.css";

const Rating = () => {
  // Sample data that would normally come from your hotel details object
  const ratingSummary = {
    average: 4.8,
    totalReviews: 124,
    label: "Exceptional"
  };

  const attributes = [
    { name: "Cleanliness", score: 4.9 },
    { name: "Location", score: 4.8 },
    { name: "Service", score: 4.7 },
    { name: "Value for Money", score: 4.6 }
  ];

  const reviews = [
    {
      id: 1,
      user: "Sarah M.",
      avatar: "public/Testimonial 2.jpeg",
      date: "June 2026",
      score: 5.0,
      comment: "Absolutely stunning property! The view from the infinity pool was breathtaking and the room service felt incredibly bespoke. Will definitely come back next holiday season."
    },
    {
      id: 2,
      user: "David K.",
      avatar: "public/Testimonial 3.jpeg",
      date: "May 2026",
      score: 4.5,
      comment: "Very clean rooms and exceptionally polite staff. Location is perfect for exploring local hub restaurants, though the check-in queue was slightly slow during peak hours."
    },

    {
      id: 3,
      user: "Amanda W.",
      avatar: "public/Testimonial 4.jpeg",
      date: "May 2026",
      score: 4.5,
      comment: "Very clean rooms and exceptionally polite staff. Location is perfect for exploring local hub restaurants, though the check-in queue was slightly slow during peak hours."
    },

    {
      id: 4,
      user: "John M.",
      avatar: "public/Testimonials 1.jpeg",
      date: "May 2026",
      score: 4.5,
      comment: "Very clean rooms and exceptionally polite staff. Location is perfect for exploring local hub restaurants, though the check-in queue was slightly slow during peak hours."
    }
  ];

  return (
    <section className="rating-section-wrapper">
      <h3 className="section-title">Guest Reviews</h3>
      
      {/* Top Summary Block Grid */}
      <div className="rating-overview-grid">
        
        {/* Big Number Score Badge */}
        <div className="score-summary-card">
          <div className="big-score-badge">{ratingSummary.average.toFixed(1)}</div>
          <div className="score-text-block">
            <h4>{ratingSummary.label}</h4>
            <p>Based on {ratingSummary.totalReviews} verified stays</p>
          </div>
        </div>

        {/* Linear Attribute Breakdown Progress Bars */}
        <div className="attributes-breakdown-panel">
          {attributes.map((attr, index) => (
            <div key={index} className="attribute-row">
              <span className="attr-name">{attr.name}</span>
              <div className="progress-bar-track">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${(attr.score / 5) * 100}%` }}
                ></div>
              </div>
              <span className="attr-score">{attr.score.toFixed(1)}</span>
            </div>
          ))}
        </div>

      </div>

      {/* User Reviews Feed List */}
      <div className="user-reviews-feed">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-card-header">
              <div className="user-profile-meta">
                <img src={review.avatar} alt={review.user} className="user-avatar" />
                <div>
                  <h5>{review.user}</h5>
                  <span className="review-date">{review.date}</span>
                </div>
              </div>
              <div className="user-given-score">
                ★ {review.score.toFixed(1)}
              </div>
            </div>
            <p className="review-text-content">{review.comment}</p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Rating;
