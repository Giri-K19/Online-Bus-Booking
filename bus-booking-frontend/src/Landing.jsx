import { useState, useEffect } from "react";
import "./Landing.css";
import { useNavigate, Link } from "react-router-dom";

function Landing() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Error reading user from localStorage:", e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!from.trim() || !to.trim()) {
      alert("Please enter both departure and destination cities.");
      return;
    }
    navigate(`/buses?from=${encodeURIComponent(from.trim())}&to=${encodeURIComponent(to.trim())}&date=${date}`);
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSelectRoute = (fromCity, toCity) => {
    setFrom(fromCity);
    setTo(toCity);
    navigate(`/buses?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&date=${date}`);
  };

  const popularRoutes = [
    {
      from: "Bangalore",
      to: "Chennai",
      via: "Hosur, Vellore, Sriperumbudur",
      price: "₹499",
      buses: "45+ daily",
      type: "AC Sleeper / Seater"
    },
    {
      from: "Chennai",
      to: "Bangalore",
      via: "Kanchipuram, Ambur, Krishnagiri",
      price: "₹499",
      buses: "42+ daily",
      type: "Luxury Multi-Axle"
    },
    {
      from: "Hyderabad",
      to: "Bangalore",
      via: "Kurnool, Anantapur",
      price: "₹699",
      buses: "38+ daily",
      type: "Volvo AC Sleeper"
    },
    {
      from: "Mumbai",
      to: "Pune",
      via: "Expressway, Lonavala",
      price: "₹349",
      buses: "60+ daily",
      type: "Electric Express"
    },
    {
      from: "Delhi",
      to: "Jaipur",
      via: "Gurgaon, Kotputli",
      price: "₹450",
      buses: "50+ daily",
      type: "Bharat Benz AC"
    },
    {
      from: "Coimbatore",
      to: "Chennai",
      via: "Erode, Salem, Tindivanam",
      price: "₹599",
      buses: "30+ daily",
      type: "Scania Premium"
    }
  ];

  return (
    <div className="landing-container">
      {/* Top Navbar */}
      <nav className="landing-navbar">
        <div className="brand-logo" onClick={() => navigate("/")}>
          <span className="logo-icon">🚌</span>
          <span>BusTrack</span>
        </div>
        <div className="nav-links">
          <Link to="/buses" className="nav-btn nav-btn-link">
            Explore Buses
          </Link>
          {currentUser ? (
            <>
              <div className="user-profile-badge">
                <span className="user-avatar-circle">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
                </span>
                <span>{currentUser.name || "User"}</span>
              </div>
              <button onClick={handleLogout} className="nav-btn-logout">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-btn nav-btn-link">
                Log In
              </Link>
              <Link to="/signup" className="nav-btn nav-btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section with Desert Sunset Bus Background */}
      <header className="hero-section">
        <div className="hero-badge">
          <span>✨</span> India's Premier Online Bus Booking Platform
        </div>

        <h1>
          India's No.1 Online<br />
          <span>Bus Ticket Booking</span> Site
        </h1>

        <p className="hero-subtitle">
          Enjoy hassle-free bus journeys with verified operators, live tracking & guaranteed lowest fares.
        </p>

        <div className="search-card-wrapper">
          <form className="search-box" onSubmit={handleSearch}>
            <div className="input-group">
              <label>
                <span>📍</span> From
              </label>
              <input
                id="from-city-input"
                type="text"
                placeholder="Enter origin city (e.g. Bangalore)"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
              />
            </div>

            <button
              type="button"
              className="swap-btn"
              onClick={handleSwap}
              title="Swap From and To cities"
              aria-label="Swap Cities"
            >
              ⇄
            </button>

            <div className="input-group">
              <label>
                <span>🎯</span> To
              </label>
              <input
                id="to-city-input"
                type="text"
                placeholder="Enter destination (e.g. Chennai)"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>
                <span>📅</span> Date of Journey
              </label>
              <input
                id="journey-date-input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <button id="search-buses-btn" type="submit" className="search-btn">
              <span>🔍</span> Search Buses
            </button>
          </form>
        </div>
      </header>

      {/* Features Strip */}
      <section className="features-strip">
        <div className="features-container">
          <div className="feature-item">
            <div className="feature-icon">🛡️</div>
            <div>
              <h4>Safe & Sanitized</h4>
              <p>Certified clean & secure buses</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <div>
              <h4>Instant Booking</h4>
              <p>Confirmed e-tickets in seconds</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💰</div>
            <div>
              <h4>Best Price Guarantee</h4>
              <p>Zero hidden charges & top deals</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎧</div>
            <div>
              <h4>24/7 Support</h4>
              <p>Dedicated round-the-clock help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes Section with Highway Sunset Theme */}
      <section className="popular-routes-section">
        <div className="popular-routes-overlay">
          <div className="popular-routes-content">
            <div className="section-header">
              <span className="section-tag">
                <span>📍</span> Top Destinations
              </span>
              <h2>
                Popular <span>Bus Routes</span>
              </h2>
              <p className="section-subtitle">
                Explore India's most frequented highways with verified operators, luxury amenities, and guaranteed lowest fares.
              </p>
            </div>

            <div className="route-grid">
              {popularRoutes.map((route, idx) => (
                <div
                  key={idx}
                  className="route-card"
                  onClick={() => handleSelectRoute(route.from, route.to)}
                >
                  <div className="route-card-top">
                    <h3>
                      <span>{route.from}</span>
                      <span className="route-arrow">➔</span>
                      <span>{route.to}</span>
                    </h3>
                    <span className="route-badge">{route.type}</span>
                  </div>

                  <p className="route-destinations">
                    <strong>Via:</strong> {route.via}
                  </p>

                  <div className="route-meta">
                    <span>🚌</span>
                    <span>{route.buses}</span>
                  </div>

                  <div className="route-card-footer">
                    <div className="route-price-box">
                      <span className="price-label">Starting from</span>
                      <span className="route-price">{route.price}</span>
                    </div>
                    <span className="route-action">Book Now →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scenic Bus Travel & Pleasures Section */}
      <section className="scenic-travel-section">
        <div className="scenic-overlay">
          <div className="scenic-content">
            <div className="scenic-badge">
              Scenic Road Journeys
            </div>

            <h2>
              The Pure Pleasure of <span>Bus Travel</span>
            </h2>

            <p className="scenic-intro">
              Leave the rush behind and rediscover the romance of the open highway. From golden sunrises over rolling hills to tranquil evening horizons, every mile brings a new panorama right outside your window.
            </p>

            <div className="scenic-grid">
              <div className="scenic-card">
                <div className="scenic-card-icon"></div>
                <h3>Spectacular Panoramic Views</h3>
                <p>
                  Expansive elevated windows offer front-row seats to India’s breathtaking landscapes, misty countryside, and vibrant golden-hour skies.
                </p>
              </div>

              <div className="scenic-card">
                <div className="scenic-card-icon"></div>
                <h3>Serene Comfort & Relaxation</h3>
                <p>
                  Recline in spacious sleeper berths and plush ergonomic seats. Catch up on your favorite music, read a book, or snooze peacefully along smooth expressways.
                </p>
              </div>

              <div className="scenic-card">
                <div className="scenic-card-icon"></div>
                <h3>Sustainable & Mindful Travel</h3>
                <p>
                  Buses are one of the most eco-conscious ways to explore the country, dramatically lowering your carbon footprint while traveling together.
                </p>
              </div>

              <div className="scenic-card">
                <div className="scenic-card-icon"></div>
                <h3>Stress-Free Seamless Journeys</h3>
                <p>
                  No airport security queues or driving fatigue. Board from convenient city pick-up points and arrive relaxed and refreshed at your destination.
                </p>
              </div>
            </div>

            <div className="scenic-cta-box">
              <div className="scenic-cta-text">
                <h4>Ready to experience the magic of the open road?</h4>
                <p>Choose from over 26+ premium verified bus routes across India with guaranteed best fares.</p>
              </div>
              <button onClick={() => navigate("/buses")} className="scenic-cta-btn">
                <span>🚌</span> Explore All Journeys
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2026 BusTrack Booking Services Pvt Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;