import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./BusList.css";

function BusList() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";

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

  useEffect(() => {
    setLoading(true);
    const endpoint = (from || to) 
      ? `http://localhost:5000/buses/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
      : `http://localhost:5000/buses`;

    axios
      .get(endpoint)
      .then((res) => {
        setBuses(res.data);
      })
      .catch((err) => {
        console.error("Error fetching buses:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [from, to]);

  const handleBookTicket = (bus) => {
    if (!currentUser) {
      alert("Please log in to book your bus tickets.");
      navigate("/login");
      return;
    }
    alert(`Success! Ticket booking initiated for ${bus.bus_name} (${bus.from_city} to ${bus.to_city}) for ${currentUser.name}.`);
  };

  return (
    <div className="buslist-page">
      {/* Top Navbar */}
      <nav className="buslist-navbar">
        <div className="buslist-brand" onClick={() => navigate("/")}>
          <span className="buslist-brand-icon">🚌</span>
          <span className="buslist-brand-text">BusTrack</span>
        </div>

        <div className="buslist-nav-links">
          <Link to="/" className="buslist-nav-btn buslist-nav-btn-link">
            ← Home
          </Link>
          {currentUser ? (
            <>
              <div className="buslist-user-pill">
                <span className="buslist-user-avatar">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
                </span>
                <span>{currentUser.name}</span>
              </div>
              <button onClick={handleLogout} className="buslist-btn-logout">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="buslist-nav-btn buslist-nav-btn-outline">
                Log In
              </Link>
              <Link to="/signup" className="buslist-nav-btn buslist-nav-btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="buslist-container">
        <div className="buslist-header-banner">
          <div>
            <h2>
              {from && to ? `${from} → ${to}` : from ? `Buses from ${from}` : to ? `Buses to ${to}` : "Explore All Available Buses Across India"}
            </h2>
            <p className="buslist-subtitle">
              {date ? `Journey Date: ${date} • ` : ""}
              {loading ? "Searching buses..." : `${buses.length} bus${buses.length === 1 ? "" : "es"} available across popular routes`}
            </p>
          </div>
          <button onClick={() => navigate("/")} className="modify-search-btn">
            🔍 Modify Search
          </button>
        </div>

        {loading ? (
          <div className="buslist-loading">
            <div className="spinner-large"></div>
            <p>Searching best fares and available routes...</p>
          </div>
        ) : buses.length === 0 ? (
          <div className="buslist-empty">
            <div className="empty-icon">🚍</div>
            <h3>No buses found for this route</h3>
            <p>Try searching with different departure and destination cities like <strong>Bangalore</strong> to <strong>Chennai</strong>.</p>
            <button onClick={() => navigate("/")} className="empty-action-btn">
              Search Other Routes
            </button>
          </div>
        ) : (
          <div className="bus-cards-list">
            {buses.map((bus) => (
              <div className="bus-card" key={bus.id}>
                <div className="bus-left">
                  <h3>{bus.bus_name}</h3>
                  <div className="bus-type-badge">AC Sleeper / Seater (2+1)</div>
                  <div className="bus-rating">⭐ 4.6 <span>(120+ reviews)</span></div>
                </div>

                <div className="bus-schedule">
                  <div className="bus-time-point">
                    <span className="time">{bus.departure}</span>
                    <span className="city">{bus.from_city}</span>
                  </div>

                  <div className="bus-duration-divider">
                    <span className="duration-text">6h 30m</span>
                    <div className="duration-line">
                      <span className="line-dot start"></span>
                      <span className="line-bar"></span>
                      <span className="line-dot end"></span>
                    </div>
                  </div>

                  <div className="bus-time-point">
                    <span className="time">{bus.arrival}</span>
                    <span className="city">{bus.to_city}</span>
                  </div>
                </div>

                <div className="bus-right">
                  <div className="bus-price-tag">
                    <span className="starts-from">Starts from</span>
                    <span className="price">₹{bus.price}</span>
                  </div>
                  <div className="seats-tag">
                    <span className="seats-count">{bus.seats}</span> seats available
                  </div>
                  <button
                    className="book-now-btn"
                    onClick={() => handleBookTicket(bus)}
                  >
                    Select Seats
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default BusList;