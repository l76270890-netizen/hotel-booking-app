import React from 'react';
import "./Industry.css";

const Industry = () => {
  return (
    <section className="easy-steps">
      <h2 className="section-title">Our Premium Services</h2>

      <div className="steps-container">
        
        {/* Service 1 */}
        <div className="step-column">
          <div className="visual-wrapper">
            <div className="bg-circle"></div>
            <div className="ui-graphic">
              <div className="photo photo-1"><img src="/card6.jpg" alt="Boutique Hotel" /></div>
              <div className="photo photo-2"><img src="/card5.jpg" alt="Luxury Resort" /></div>
              <div className="photo photo-3"><img src="/card9.jpg" alt="Villas" /></div>
            </div>
          </div>
          <h3 className="step-title">Global Hotel Booking</h3>
          <p className="step-desc">Gain instant access to millions of luxury suites, boutique hotels, and villas across 180 countries.</p>
        </div>

        {/* Service 2 */}
        <div className="step-column">
          <div className="visual-wrapper">
            <div className="bg-circle"></div>
            <div className="ui-graphic">
              <div className="deal-row row-1">
                <img src="/3.jpg" alt="Standard Rate" />
                <div className="deal-lines"><div className="line-sm"></div><div className="line-xs"></div></div>
                <div className="deal-price">$240</div>
              </div>
              <div className="deal-row row-2">
                <img src="/4.jpg" alt="Matched Lowest Rate" />
                <div className="deal-lines"><div className="line-sm"></div><div className="line-xs"></div></div>
                <div className="deal-price">$185</div>
              </div>
            </div>
          </div>
          <h3 className="step-title">Smart Price Match</h3>
          <p className="step-desc">Our live pricing engine scans top travel providers instantly to guarantee you secure the absolute lowest rate.</p>
        </div>

        {/* Service 3 */}
        <div className="step-column">
          <div className="visual-wrapper">
            <div className="bg-circle"></div>
            <div className="ui-graphic">
              <div className="modal-card">
                <div className="modal-top">
                  <img className="modal-img" src="/card3.jpg" alt="Concierge Pass" />
                  <div className="modal-info"><div className="line-sm"></div><div className="line-xs"></div></div>
                </div>
                <div className="modal-bottom">
                  <div className="modal-btn" style={{ backgroundColor: '#111' }}></div>
                  <div className="deal-price">24/7 Desk</div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="step-title">VIP Concierge Care</h3>
          <p className="step-desc">Enjoy dedicated 24/7 assistance for bespoke itinerary planning, premium dining reservations, and airport transfers.</p>
        </div>

      </div>
    </section>
  );
};

export default Industry;
