import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [filter, setFilter] = useState("all");
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAddRoomPopup, setShowAddRoomPopup] = useState(false);
  const [newRoomData, setNewRoomData] = useState({
    price: 0,
    amenities: "",
    view: "",
    capacity: 0,
    hotelId: "", // Add hotelId to newRoomData
    hotelIdTouched: false // Track whether the hotelId input has been touched
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
        setRooms(roomsWithAvailability);
        setFilteredRooms(roomsWithAvailability); // Initialize filteredRooms with all rooms
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const applyFilter = () => {
    let filteredData = [];
    if (filter === "all") {
      filteredData = rooms;
    } else {
      if (filter === "available") {
        filteredData = rooms.filter((room) => room.availability === "available");
      } else if (filter === "booked") {
        filteredData = rooms.filter((room) => room.availability === "booked");
      }
    }
    setFilteredRooms(filteredData);
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:3001/hotels");
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  
  

  const handleRoomSelect = (roomId) => {
    setSelectedRoom(roomId);
  };

  const handleDeleteRoom = async () => {
    try {
      if (selectedRoom) {
        await axios.delete(`http://localhost:3001/rooms/${selectedRoom}`);
        const updatedFilteredRooms = filteredRooms.filter((room) => room.Room_ID !== selectedRoom);
        setFilteredRooms(updatedFilteredRooms);
        setSelectedRoom(null); // Clear selected room after deletion
      }
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
      const response = await axios.post("http://localhost:3001/rooms", {
        Price: newRoomData.price,
        Capacity: newRoomData.capacity,
        View_Type: newRoomData.view,
        Amenities: newRoomData.amenities,
        booked: 0,
        Hotel_ID: newRoomData.hotelId // Assign the selected Hotel_ID
      });
      console.log("Room saved successfully:", response.data);
      const newRoom = { ...response.data, availability: "available" };
      setFilteredRooms([...filteredRooms, newRoom]);
      setNewRoomData({
        price: 0,
        amenities: "",
        view: "",
        capacity: 0,
        hotelId: "", // Reset hotelId after saving
        hotelIdTouched: false // Reset hotelIdTouched after saving
      });
      setShowAddRoomPopup(false);
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoomData({ ...newRoomData, [name]: value, hotelIdTouched: true });
  };

  const isValidHotelId = (hotelId) => {
    return hotels.some((hotel) => hotel.Hotel_ID === parseInt(hotelId));
  };

  const navigateToNextPage = () => {
    const room = filteredRooms.find(room => room.Room_ID === selectedRoom);
    if (room && room.availability === "available") {
      navigate("/book-rent-room", { state: { selectedRoom } });
    }
    if (room && room.availability === "booked") {
      navigate("/booked-room", { state: { selectedRoom } });
    }
  };

  const navigateToManageHotels = () => {
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

      <button className="btn" onClick={handleAddRoom}>
        Add Room
      </button>

      <button className="btn delete-btn" onClick={handleDeleteRoom} disabled={!selectedRoom}>
        Delete Room
      </button>

      <button className="btn" onClick={navigateToManageHotels}>
        Manage Hotels
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
          </div>
        ))}
      </div>

      {showAddRoomPopup && (
        <div className="popup-container">
          <div className="popup">
            <h3>Add Room</h3>

            <label>Hotel ID:</label>
            <input
              type="number"
              name="hotelId"
              value={newRoomData.hotelId}
              onChange={handleInputChange}
            />

            {newRoomData.hotelIdTouched && !isValidHotelId(newRoomData.hotelId) && (
              <p style={{ color: 'red' }}>Invalid Hotel ID</p>
            )}

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
              <button className="btn" onClick={handleSaveRoom} disabled={!isValidHotelId(newRoomData.hotelId)}>
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
