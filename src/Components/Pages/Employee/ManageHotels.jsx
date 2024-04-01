import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ManageHotels.css";

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedHotelRooms, setSelectedHotelRooms] = useState([]);
  const [showRoomPopup, setShowRoomPopup] = useState(false);
  const [showAddHotelPopup, setShowAddHotelPopup] = useState(false);
  const [newHotelData, setNewHotelData] = useState({
    Hotel_ID: "",
    Chain_Name: "",
    Star_Rating: 0,
    Contact_Email: "",
    Phone_Number: "",
    Manager: "",
    Street: "",
    City: "",
    Postal_Code: "",
    Rooms: [],
  });
  

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:3001/hotels");
        console.log("Fetched Hotels:", response.data); // Log fetched hotels
        const adjustedHotels = response.data.map((hotel) => ({
          Hotel_ID: hotel.Hotel_ID,
          Chain_Name: hotel.Chain_Name,
          Star_Rating: hotel.Star_Rating,
          Contact_Email: hotel.Contact_Email,
          Phone_Number: hotel.Phone_Number,
          Manager: hotel.Manager,
          Street: hotel.Street,
          City: hotel.City,
          Postal_Code: hotel.Postal_Code,
          rooms: hotel.rooms || [],
        }));
        setHotels(adjustedHotels);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  const navigate = useNavigate();

  const handleShowRooms = (rooms) => {
    setSelectedHotelRooms(rooms);
    setShowRoomPopup(true);
  };

  const handleCloseRoomPopup = () => {
    setShowRoomPopup(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddHotel = () => {
    setShowAddHotelPopup(true);
  };

  const handleCloseAddHotelPopup = () => {
    setShowAddHotelPopup(false);
  };

  const handleSaveHotel = () => {
    const newHotelId = hotels.length + 1;
    const newHotel = { Hotel_ID: newHotelId, ...newHotelData };
    const updatedHotels = [...hotels, newHotel];
    setHotels(updatedHotels);
    setNewHotelData({
      Hotel_ID: "",
      Chain_Name: "",
      Star_Rating: 0,
      Contact_Email: "",
      Phone_Number: "",
      Manager: "",
      Street: "",
      City: "",
      Postal_Code: "",
      Rooms: [],
    });
    setShowAddHotelPopup(false);
  };

  const handleDeleteHotel = () => {
    if (selectedHotel) {
      const updatedHotels = hotels.filter(
        (hotel) => hotel.Hotel_ID !== selectedHotel.Hotel_ID
      );
      setHotels(updatedHotels);
      setSelectedHotel(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHotelData({ ...newHotelData, [name]: value });
  };

  console.log("Rendering hotels:", hotels); // Log hotels being rendered

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
            key={hotel.Hotel_ID}
            className={`hotel-card ${selectedHotel === hotel ? "selected" : ""}`}
            onClick={() => setSelectedHotel(hotel)}
          >
            <h3>{hotel.Chain_Name}</h3>
            <p>Location: {hotel.City}</p>
            <p>Star Rating: {hotel.Star_Rating}</p>
            <p>Email: {hotel.Contact_Email}</p>
            <p>Phone Number: {hotel.Phone_Number}</p>
            <p>Manager: {hotel.Manager}</p>
            <p>Street: {hotel.Street}</p>
            <p>Postal Code: {hotel.Postal_Code}</p>
            <p>Rooms: {hotel.Rooms}</p>
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
              {selectedHotelRooms.map((room, index) => (
                <div key={index} className="room-card">
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
      <label>Hotel ID:</label>
      <input
        type="text"
        name="Hotel_ID"
        value={newHotelData.Hotel_ID}
        onChange={handleInputChange}
      />
      <label>Chain Name:</label>
      <input
        type="text"
        name="Chain_Name"
        value={newHotelData.Chain_Name}
        onChange={handleInputChange}
      />
      <label>Star Rating:</label>
      <input
        type="number"
        name="Star_Rating"
        value={newHotelData.Star_Rating}
        onChange={handleInputChange}
      />
      <label>Contact Email:</label>
      <input
        type="email"
        name="Contact_Email"
        value={newHotelData.Contact_Email}
        onChange={handleInputChange}
      />
      <label>Phone Number:</label>
      <input
        type="text"
        name="Phone_Number"
        value={newHotelData.Phone_Number}
        onChange={handleInputChange}
      />
      <label>Manager:</label>
      <input
        type="text"
        name="Manager"
        value={newHotelData.Manager}
        onChange={handleInputChange}
      />
      <label>Street:</label>
      <input
        type="text"
        name="Street"
        value={newHotelData.Street}
        onChange={handleInputChange}
      />
      <label>City:</label>
      <input
        type="text"
        name="City"
        value={newHotelData.City}
        onChange={handleInputChange}
      />
      <label>Postal Code:</label>
      <input
        type="text"
        name="Postal_Code"
        value={newHotelData.Postal_Code}
        onChange={handleInputChange}
      />
      <label>Rooms:</label>
      <input
        type="number"
        name="Rooms"
        value={newHotelData.Rooms}
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
