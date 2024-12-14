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
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [guests, setGuests] = useState(1);
  const [showReservationForm, setShowReservationForm] = useState(false);

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

  function handleReservationClick(restaurant) {
    setSelectedRestaurant(restaurant);
    setShowReservationForm(true);
  }

  async function makeReservation() {
    if (!selectedRestaurant) return;

    const userId = localStorage.getItem('userId');
    console.log('User ID:', userId); // Debug log
    
    if (!userId) {
      setMessage("Please log in to make a reservation");
      return;
    }

    try {
      const response = await fetch(`http://localhost:2000/restaurant/reservation?name=${selectedRestaurant.NAME}&date=${selectedRestaurant.DATE}&time=${selectedRestaurant.TIME}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userID: parseInt(userId, 10),
          guests: guests
        })
      });

      const responseData = await response.text();
      console.log('Response:', responseData); // Debug log

      if (!response.ok) {
        throw new Error(responseData || 'Failed to make reservation');
      }

      setMessage("Reservation successful!");
      setShowReservationForm(false);
      setSelectedRestaurant(null);
      setGuests(1);
    } catch (error) {
      console.error('Reservation error:', error); // Debug log
      setMessage("Error making reservation: " + error.message);
    }
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
            <option value="Booked">Booked</option>
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
                {restaurant.AVAILABILITY === 'Booked' ? 'Booked' : restaurant.AVAILABILITY}
              </p>
              {restaurant.AVAILABILITY === 'Available' && (
                <button 
                  className="reserve-button"
                  onClick={() => handleReservationClick(restaurant)}
                >
                  Make Reservation
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {showReservationForm && selectedRestaurant && (
        <div className="reservation-modal">
          <div className="modal-content">
            <h2>Make a Reservation</h2>
            <p>Restaurant: {selectedRestaurant.NAME}</p>
            <p>Date: {selectedRestaurant.DATE}</p>
            <p>Time: {selectedRestaurant.TIME}</p>
            
            <div className="form-group">
              <label>Number of Guests:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
              />
            </div>

            <div className="modal-buttons">
              <button onClick={makeReservation}>Confirm Reservation</button>
              <button onClick={() => {
                setShowReservationForm(false);
                setSelectedRestaurant(null);
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReservationForm;