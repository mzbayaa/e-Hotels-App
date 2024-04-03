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
      }
    };

    fetchRoomData();
  }, [selectedRoom]);

  const handleBookRoom = async () => {
    try {
      if (selectedRoomData && selectedRoomData.booked === 0) {
        // Update the room's availability to "booked" and set booked attribute to 1
        await axios.put(`http://localhost:3001/rooms/${selectedRoom}`, { availability: "booked", booked: 1 });
        navigate(-1); 
      } else {
        console.log("Room is not available for booking.");
      }
    } catch (error) {
      console.error("Error booking room:", error);
    }
  };

  const handleRentRoom = () => {
    navigate("/process-payment", { state: { selectedRoom } });
  };

  return (
    <div className="book-rent-page-container">
      <h2>Book or Rent Room</h2>
      {selectedRoomData && (
        <div className="booking-details">
          <div className="room-card selected">
            <h3>{selectedRoomData.Room_Name}</h3>
            <p>Availability: {selectedRoomData.booked === 0 ? "available" : "not available"}</p>
            <p>Price: ${selectedRoomData.Price}</p>
            <p>View: {selectedRoomData.View_Type}</p>
            <p>Capacity: {selectedRoomData.Capacity}</p>
            <p>Amenities: {selectedRoomData.Amenities}</p>
          </div>
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
      )}
    </div>
  );
};

export default BookRentRoom;
