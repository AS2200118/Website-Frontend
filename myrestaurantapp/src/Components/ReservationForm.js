import React, { useState } from 'react';
import '../CSSstyle/Reservation.css';

function ReservationForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availability, setAvailability] = useState(""); 
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  function searchRestaurants() {
    if (!name && !category && !date && !time && !availability) {
      setMessage("Please fill at least one field");
      return;
    }

    let searchURL = "http://localhost:2000/restaurant/search?";
    
    if (name) searchURL += `name=${name}&`;
    if (category) searchURL += `categories=${category}&`;
    if (date) searchURL += `date=${date}&`;
    if (time) searchURL += `time=${time}&`;
    if (availability) searchURL += `availability=${availability}`;

    fetch(searchURL)
      .then(response => response.json())
      .then(data => {
        if (data === "Restaurant does not exist") {
          setResults([]);
          setMessage("No restaurants found");
        } else {
          setResults(Array.isArray(data) ? data : [data]);
          setMessage("");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        setMessage("Error searching restaurants");
      });
  }

  return (
    <div className="reservation-container">
      <h1>Find a Reservation</h1>
      <div className="search-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Restaurant Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Western Food">Western Food</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Chinese">Chinese</option>
            <option value="Indian">Indian</option>
            <option value="American">American</option>
          </select>
        </div>

        <div className="form-group">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
            <option value="">Availability</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        <button onClick={searchRestaurants}>Search</button>
      </div>

      {message && <p className="message">{message}</p>}

      {results.length > 0 && (
        <div className="results-container">
          {results.map((restaurant, index) => (
            <div key={index} className="reservation-card">
              <h3>{restaurant.NAME}</h3>
              <p>Category: {restaurant.CATEGORIES}</p>
              <p>Date: {restaurant.DATE}</p>
              <p>Time: {restaurant.TIME}</p>
              <p className={`availability ${restaurant.AVAILABILITY?.toLowerCase()}`}>
                {restaurant.AVAILABILITY}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReservationForm;