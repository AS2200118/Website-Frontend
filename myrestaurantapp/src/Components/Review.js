import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSSstyle/Review.css';

function Review() {
  const [restaurantName, setRestaurantName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:2000/restaurant/review?name=${encodeURIComponent(restaurantName)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: userId,
          comment: comment,
          rating: rating
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      setMessage('Review submitted successfully!');
      // Clear form
      setRestaurantName('');
      setRating(5);
      setComment('');
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="review-container">
      <h2>Submit Your Review</h2>
      <p className="review-description">Share your dining experience with us!</p>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label>Restaurant Name:</label>
          <input
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            placeholder="Enter the restaurant name"
            required
          />
        </div>

        <div className="form-group">
          <label>Rating:</label>
          <div className="rating-select">
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
            >
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Your Review:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us about your experience..."
            required
            rows="4"
          />
        </div>

        <button type="submit">Submit Review</button>
      </form>
      {message && (
        <p className={message.includes('Error') ? 'error-message' : 'success-message'}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Review;