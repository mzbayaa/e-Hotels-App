import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

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
  const [showAddRoomPopup, setShowAddRoomPopup] = useState(false);
  const [newRoomData, setNewRoomData] = useState({
    name: "",
    availability: "",
    price: 0,
    amenities: "",
    view: "",
    capacity: 0,
  });
  const navigate = useNavigate();

  const applyFilter = () => {
    const filteredData =
      filter === "all"
        ? roomData
        : roomData.filter((room) => room.availability === filter);
    setFilteredRooms(filteredData);
  };

  const handleRoomSelect = (roomId, availability) => {
    setSelectedRoom(roomId === selectedRoom ? null : roomId);
  };

  const handleDeleteRoom = (roomId) => {
    const updatedFilteredRooms = filteredRooms.filter((room) => room.id !== roomId);
    setFilteredRooms(updatedFilteredRooms);
  };

  const handleAddRoom = () => {
    setShowAddRoomPopup(true);
  };

  const handlePopupClose = () => {
    setShowAddRoomPopup(false);
  };

  const handleSaveRoom = () => {
    const newRoomId = Math.max(...roomData.map((room) => room.id)) + 1;
    const newRoom = { id: newRoomId, ...newRoomData, amenities: newRoomData.amenities.split(",") };
    const updatedRoomData = [...filteredRooms, newRoom];
    setFilteredRooms(updatedRoomData);
    setNewRoomData({
      name: "",
      availability: "",
      price: 0,
      amenities: "",
      view: "",
      capacity: 0,
    });
    setShowAddRoomPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoomData({ ...newRoomData, [name]: value });
  };

  const navigateToNextPage = () => {
    if (selectedRoom !== null) {
      const room = roomData.find((room) => room.id === selectedRoom);
      if (room) {
        if (room.availability === "available") {
          navigate("/book-rent-room", { state: { selectedRoom } });
        } else if (room.availability === "booked") {
          navigate("/booked-room", { state: { selectedRoom } });
        }
      } else {
        console.error("Room not found");
      }
    }
  };

  const handleManageHotels = () => {
    // Implement navigation to another page for managing hotels
    // For example:
    navigate("/manage-hotels");
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

      <button className="btn" onClick={handleManageHotels}>
        Manage Hotels
      </button>

      <button className="btn" onClick={handleAddRoom}>
        Add Room
      </button>

      <button className="btn" onClick={navigateToNextPage} disabled={selectedRoom === null}>
        Next Page
      </button>

      <div className="room-list">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className={`room-card ${selectedRoom === room.id ? "selected" : ""}`}
            onClick={() => handleRoomSelect(room.id, room.availability)}
          >
            <h3>{room.name}</h3>
            <p>Availability: {room.availability}</p>
            <p>Price: ${room.price}</p>
            <p>View: {room.view}</p>
            <p>Capacity: {room.capacity}</p>
            <p>Amenities: {room.amenities.join(", ")}</p>
            <button className="delete-btn" onClick={() => handleDeleteRoom(room.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {showAddRoomPopup && (
        <div className="popup-container">
          <div className="popup">
            <h3>Add Room</h3>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newRoomData.name}
              onChange={handleInputChange}
            />
            <label>Availability:</label>
            <input
              type="text"
              name="availability"
              value={newRoomData.availability}
              onChange={handleInputChange}
            />
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={newRoomData.price}
              onChange={handleInputChange}
            />
            <label>Amenities:</label>
            <input
              type="text"
              name="amenities"
              value={newRoomData.amenities}
              onChange={handleInputChange}
            />
            <label>View:</label>
            <input
              type="text"
              name="view"
              value={newRoomData.view}
              onChange={handleInputChange}
            />
            <label>Capacity:</label>
            <input
              type="number"
              name="capacity"
              value={newRoomData.capacity}
              onChange={handleInputChange}
            />
            <div>
              <button className="btn" onClick={handleSaveRoom}>
                Save
              </button>
              <button className="btn" onClick={handlePopupClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { roomData };
export default Dashboard;
