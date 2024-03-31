import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Dashboard.css";

// Simulated room data with full information
const roomData = [
  { 
    id: 1, 
    name: "Room A", 
    availability: "available",
    price: 100,
    amenities: ["TV", "Air Conditioning", "Wi-Fi"],
    view: "City View",
    capacity: 2,
  },
  { 
    id: 2, 
    name: "Room B", 
    availability: "booked",
    price: 120,
    amenities: ["TV", "Air Conditioning", "Wi-Fi"],
    view: "Ocean View",
    capacity: 3,
  },
  { 
    id: 3, 
    name: "Room C", 
    availability: "available",
    price: 150,
    amenities: ["TV", "Air Conditioning", "Wi-Fi"],
    view: "Mountain View",
    capacity: 4,
  },
  { 
    id: 4, 
    name: "Room D", 
    availability: "booked",
    price: 200,
    amenities: ["TV", "Air Conditioning", "Wi-Fi"],
    view: "Garden View",
    capacity: 2,
  },
];

const Dashboard = () => {
  const [filter, setFilter] = useState("all");
  const [filteredRooms, setFilteredRooms] = useState(roomData);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();

  const applyFilter = () => {
    const filteredData =
      filter === "all" ? roomData : roomData.filter((room) => room.availability === filter);
    setFilteredRooms(filteredData);
  };

  const handleRoomSelect = (roomId) => {
    setSelectedRoom(roomId === selectedRoom ? null : roomId);
  };

  const navigateToNextPage = () => {
    navigate("/booked-room", { state: { selectedRoom } });
  };

  return (
    <div className="dashboard-container">
      <h2>Employee Dashboard</h2>
      <div className="filter-section">
        <label>Filter by Availability:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Rooms</option>
          <option value="available">Available Rooms</option>
          <option value="booked">Booked Rooms</option>
        </select>
      </div>
      <button className="btn" onClick={applyFilter}>
        Apply Filter
      </button>

      <button className="btn" onClick={navigateToNextPage} disabled={!selectedRoom}>
        Next Page
      </button>

      <div className="room-list">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className={`room-card ${selectedRoom === room.id ? "selected" : ""}`}
            onClick={() => handleRoomSelect(room.id)}
          >
            <h3>{room.name}</h3>
            <p>Availability: {room.availability}</p>
            <p>Price: ${room.price}</p>
            <p>View: {room.view}</p>
            <p>Capacity: {room.capacity}</p>
            <p>Amenities: {room.amenities.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { roomData };
export default Dashboard;