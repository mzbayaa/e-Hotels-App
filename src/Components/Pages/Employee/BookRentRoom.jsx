import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { roomData } from "./Dashboard";
import "./BookRentRoom.css";

const BookRentRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedRoom } = location.state;

  // Find the selected room
  const selectedRoomIndex = roomData.findIndex((room) => room.id === selectedRoom);

  if (selectedRoomIndex === -1 || roomData[selectedRoomIndex].availability !== "available") {
    // If the selected room is not found or not available, navigate back to the dashboard
    navigate(-1);
    return null; // Return null to prevent rendering anything
  }

  const handleBookRoom = () => {
    // Add your logic for booking the room here
    // For demonstration purposes, let's just change the availability status
    roomData[selectedRoomIndex].availability = "booked";
    navigate(-1); // Navigate back to the previous page (dashboard)
  };

  const handleRentRoom = () => {
    // Add your logic for renting the room here
    navigate("/process-payment"); // Navigate to the process payment page
  };

  const selectedRoomData = roomData[selectedRoomIndex];

  return (
    <div className="book-rent-page-container">
      <h2>Book Room for Rent</h2>
      <div className="booking-details">
        <h3>{selectedRoomData.name}</h3>
        <p>Availability: {selectedRoomData.availability}</p>
        <p>Price: ${selectedRoomData.price}</p>
        <p>View: {selectedRoomData.view}</p>
        <p>Capacity: {selectedRoomData.capacity}</p>
        <p>Amenities: {selectedRoomData.amenities.join(", ")}</p>
        <div className="buttons-container">
          <button className="btn" onClick={handleBookRoom}>
            Book Room
          </button>
          <button className="btn" onClick={handleRentRoom}>
            Rent Room
          </button>
          <button className="btn" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookRentRoom;
