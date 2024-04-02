import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Booking.css";

const Booking = () => {
  const { roomId } = useParams(); // Assuming roomId is part of your route '/booking/:roomId'
  const navigate = useNavigate();
  const location = useLocation();
  const roomDetails = location.state ? location.state.roomDetails : null;

  const handleBookClick = () => {
    // Assuming you want to pass the roomDetails to the payment page as well
    navigate("/payment", { state: { roomDetails } });
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  if (!roomDetails) {
    // Handling direct navigation to the booking page or refresh scenarios
    return (
      <div className="booking-container">
        <h2>Room details are not available</h2>
        <p>Please select a room from the search page.</p>
        <button className="btn" onClick={() => navigate("/")}>
          Go to Search
        </button>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <h2>Booking Page</h2>
      <div className="booking-details">
        <h3>{roomDetails.Chain_Name} - Room {roomDetails.Room_ID}</h3>
        <p>Price: ${roomDetails.Price}</p>
        <p>Capacity: {roomDetails.Capacity}</p>
        <p>Area: {roomDetails.City}</p>
        <p>Rating: {roomDetails.Star_Rating} stars</p>
        <p>Amenities: {roomDetails.Amenities}</p>
        {/* Add more room details as needed */}
        <div className="booking-buttons">
          <button className="btn" onClick={handleBookClick}>
            Book Now
          </button>
          <button className="btn" onClick={handleBackClick}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
