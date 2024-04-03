import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookedRoom.css";

const BookedRoom = () => {
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

  const cancelBooking = async () => {
    try {
      // Update the room availability status to "available"
      await axios.put(`http://localhost:3001/rooms/${selectedRoom}`, { availability: "available" , booked: 0});
      navigate(-1); // Navigate back to the previous page (dashboard)
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const finalizeRenting = () => {
    navigate("/process-payment", { state: { selectedRoom } });
  };


  return (
    <div className="booked-room-container">
      <div className="booked-room-details">
        <h2>Booked Room Details</h2>
        <div className="booked-room-info">
          {selectedRoomData && ( // Add defensive check here
            <>
              <h3>{selectedRoomData.name}</h3>
              <p>Availability: {selectedRoomData.booked === 0 ? "available" : "booked"}</p>
              <p>Price: ${selectedRoomData.Price}</p>
              <p>View: {selectedRoomData.View_Type}</p>
              <p>Capacity: {selectedRoomData.Capacity}</p>
              <p>Amenities: {selectedRoomData.Amenities}</p>
            </>
          )}

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
