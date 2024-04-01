import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { roomData } from "./Dashboard"; // Import roomData from Dashboard
import "./BookedRoom.css";

const BookedRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedRoom } = location.state;

  const cancelBooking = () => {
    // Find the selected room index in the roomData array
    const roomIndex = roomData.findIndex(room => room.id === selectedRoom);

    // If the selected room exists
    if (roomIndex !== -1) {
        // Update the availability status to "available"
        roomData[roomIndex].availability = "available";
        
        // Navigate back to the dashboard page
        navigate(-1); // Navigate back to the previous page (Dashboard)
    } else {
        console.error("Selected room not found.");
    }
  };

  const finalizeRenting = () => {
    // Add your logic for finalizing renting here
    navigate("/process-payment");
  };

  // Find the selected room
  const selectedRoomData = roomData.find(room => room.id === selectedRoom);

  if (!selectedRoomData) {
    return <div>No room data found for the selected room.</div>;
  }

  return (
    <div className="booked-room-container">
      <div className="booked-room-details">
        <h2>Booked Room Details</h2>
        <div className="booked-room-info">
          <h3>{selectedRoomData.name}</h3>
          <p>Availability: {selectedRoomData.availability}</p>
          <p>Price: ${selectedRoomData.price}</p>
          <p>View: {selectedRoomData.view}</p>
          <p>Capacity: {selectedRoomData.capacity}</p>
          <p>Amenities: {selectedRoomData.amenities.join(", ")}</p>
          <div className="button-container">
            <button className="btn" onClick={cancelBooking}>Cancel Booking</button>
            <button className="btn" onClick={finalizeRenting}>Finalize Renting</button>
            <button className="btn" onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedRoom;
