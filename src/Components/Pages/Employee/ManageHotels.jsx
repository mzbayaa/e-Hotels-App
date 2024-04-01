import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageHotels.css"; // Style file for ManageHotels page

const ManageHotels = () => {
  const [hotels, setHotels] = useState([
    // Initial list of hotels
    {
      id: 1,
      name: "Hotel A",
      location: "City A",
      rating: 4,
      rooms: [
        { id: 1, name: "Room A1", availability: "available", price: 100 },
        { id: 2, name: "Room A2", availability: "booked", price: 120 },
      ],
    },
    {
      id: 2,
      name: "Hotel B",
      location: "City B",
      rating: 3,
      rooms: [
        { id: 1, name: "Room B1", availability: "available", price: 150 },
        { id: 2, name: "Room B2", availability: "booked", price: 200 },
      ],
    },
  ]);
  const [selectedHotel, setSelectedHotel] = useState(null); // State variable for selected hotel
  const [selectedHotelRooms, setSelectedHotelRooms] = useState([]);
  const [showRoomPopup, setShowRoomPopup] = useState(false);
  const [showAddHotelPopup, setShowAddHotelPopup] = useState(false);
  const [newHotelData, setNewHotelData] = useState({
    name: "",
    location: "",
    rating: 0,
    rooms: [],
  });
  const navigate = useNavigate();

  const handleShowRooms = (rooms) => {
    setSelectedHotelRooms(rooms);
    setShowRoomPopup(true);
  };

  const handleCloseRoomPopup = () => {
    setShowRoomPopup(false);
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleAddHotel = () => {
    setShowAddHotelPopup(true);
  };

  const handleCloseAddHotelPopup = () => {
    setShowAddHotelPopup(false);
  };

  const handleSaveHotel = () => {
    const newHotelId = Math.max(...hotels.map((hotel) => hotel.id)) + 1;
    const newHotel = { id: newHotelId, ...newHotelData };
    const updatedHotels = [...hotels, newHotel];
    setHotels(updatedHotels);
    setNewHotelData({
      name: "",
      location: "",
      rating: 0,
      rooms: [],
    });
    setShowAddHotelPopup(false);
  };

  const handleDeleteHotel = () => {
    if (selectedHotel) {
      const updatedHotels = hotels.filter((hotel) => hotel.id !== selectedHotel.id);
      setHotels(updatedHotels);
      setSelectedHotel(null); // Reset selected hotel after deletion
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHotelData({ ...newHotelData, [name]: value });
  };

  return (
    <div className="manage-hotels-container">
      <h2>Manage Hotels</h2>
      <div className="action-buttons">
        <button className="btn" onClick={handleAddHotel}>
          Add Hotel
        </button>
        <button className="btn" onClick={handleDeleteHotel} disabled={!selectedHotel}>
          Delete Hotel
        </button>
        <button className="btn" onClick={handleGoBack}>
        Back
      </button>
      </div>
      
      <div className="hotel-list">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className={`hotel-card ${selectedHotel === hotel ? "selected" : ""}`}
            onClick={() => setSelectedHotel(hotel)}
          >
            <h3>{hotel.name}</h3>
            <p>Location: {hotel.location}</p>
            <p>Rating: {hotel.rating}</p>
            <button className="btn" onClick={() => handleShowRooms(hotel.rooms)}>
              Manage Rooms
            </button>
          </div>
        ))}
      </div>

      {showRoomPopup && (
        <div className="popup-container">
          <div className="popup">
            <h3>Rooms</h3>
            <button className="btn" onClick={handleCloseRoomPopup}>
              Close
            </button>
            <div className="room-list">
              {selectedHotelRooms.map((room) => (
                <div key={room.id} className="room-card">
                  <h4>{room.name}</h4>
                  <p>Availability: {room.availability}</p>
                  <p>Price: ${room.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showAddHotelPopup && (
        <div className="popup-container">
          <div className="popup">
            <h3>Add Hotel</h3>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newHotelData.name}
              onChange={handleInputChange}
            />
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={newHotelData.location}
              onChange={handleInputChange}
            />
            <label>Rating:</label>
            <input
              type="number"
              name="rating"
              value={newHotelData.rating}
              onChange={handleInputChange}
            />
            <div>
              <button className="btn" onClick={handleSaveHotel}>
                Save
              </button>
              <button className="btn" onClick={handleCloseAddHotelPopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageHotels;
