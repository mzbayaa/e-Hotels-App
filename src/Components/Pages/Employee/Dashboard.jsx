import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [filter, setFilter] = useState("all");
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAddRoomPopup, setShowAddRoomPopup] = useState(false);
  const [newRoomData, setNewRoomData] = useState({
    price: 0,
    amenities: "",
    view: "",
    capacity: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3001/rooms");
        const roomsWithAvailability = response.data.map(room => {
          const availability = room.booked === 0 ? "available" : room.booked === 1 ? "booked" : "rented";
          return { ...room, availability };
        });
        setFilteredRooms(roomsWithAvailability);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const applyFilter = () => {
    const filteredData =
      filter === "all"
        ? filteredRooms
        : filteredRooms.filter((room) => room.availability === filter);
    setFilteredRooms(filteredData);
  };

  const handleRoomSelect = (roomId) => {
    setSelectedRoom(selectedRoom === roomId ? null : roomId);
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await axios.delete(`http://localhost:3001/rooms/${roomId}`);
      const updatedFilteredRooms = filteredRooms.filter((room) => room.Room_ID !== roomId);
      setFilteredRooms(updatedFilteredRooms);
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleAddRoom = () => {
    setShowAddRoomPopup(true);
  };

  const handlePopupClose = () => {
    setShowAddRoomPopup(false);
  };

  const handleSaveRoom = async () => {
    try {
      console.log("Saving room:", newRoomData);
      const response = await axios.post("http://localhost:3001/rooms", newRoomData);
      console.log("Room saved successfully:", response.data);
      const newRoom = { ...response.data, availability: "available" };
      setFilteredRooms([...filteredRooms, newRoom]);
      setNewRoomData({
        price: 0,
        amenities: "",
        view: "",
        capacity: 0,
      });
      setShowAddRoomPopup(false);
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoomData({ ...newRoomData, [name]: value });
  };

  const navigateToNextPage = () => {
    if (selectedRoom !== null) {
      navigate("/book-rent-room", { state: { selectedRoom } });
    }
  };

  const handleManageHotels = () => {
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
            key={room.Room_ID}
            className={`room-card ${selectedRoom === room.Room_ID ? "selected" : ""}`}
            onClick={() => handleRoomSelect(room.Room_ID)}
          >
            <h3>{room.name}</h3>
            <p>Availability: {room.availability}</p>
            <p>Price: ${room.Price}</p>
            <p>View: {room.View_Type}</p>
            <p>Capacity: {room.Capacity}</p>
            <p>Amenities: {room.Amenities}</p>
            <button className="delete-btn" onClick={() => handleDeleteRoom(room.Room_ID)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {showAddRoomPopup && (
        <div className="popup-container">
          <div className="popup">
            <h3>Add Room</h3>

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

export default Dashboard;
