import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookRentRoom.css";

const BookRentRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedRoom } = location.state;
  const [selectedRoomData, setSelectedRoomData] = useState(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/rooms/${selectedRoom}`);
        setSelectedRoomData(response.data);
      } catch (error) {
        console.error("Error fetching room data:", error);
        // Navigate back to the dashboard if there's an error fetching room data
        navigate(-1);
      }
    };

    fetchRoomData();
  }, [selectedRoom, navigate]);

  const handleBookRoom = async () => {
    try {
      // Add your logic for booking the room here
      // For demonstration purposes, let's just change the availability status
      await axios.put(`http://localhost:3001/rooms/${selectedRoom}`, { availability: "booked" });
      navigate(-1); // Navigate back to the previous page (dashboard)
    } catch (error) {
      console.error("Error booking room:", error);
    }
  };

  const handleRentRoom = () => {
    // Add your logic for renting the room here
    navigate("/process-payment"); // Navigate to the process payment page
  };

  if (!selectedRoomData) {
    // Render loading indicator while fetching room data
    return <div>Loading...</div>;
  }

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
