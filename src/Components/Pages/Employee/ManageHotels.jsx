import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ManageHotels.css";

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showRoomPopup, setShowRoomPopup] = useState(false);
  const [showAddHotelPopup, setShowAddHotelPopup] = useState(false);
  const [newHotelData, setNewHotelData] = useState({
    Chain_Name: "", // Changed to a dropdown
    Star_Rating: 0,
    Contact_Email: "",
    Phone_Number: "",
    Manager: "",
    Street: "",
    City: "",
    Postal_Code: "",
    Number_Of_Rooms: 0,
  });

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:3001/hotels");
        console.log("Fetched Hotels:", response.data);
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
          Number_Of_Rooms: hotel.Number_Of_Rooms,
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

  const handleSaveHotel = async () => {
    try {
      // Validate number of rooms
      if (newHotelData.Number_Of_Rooms < 0) {
        alert("Number of rooms cannot be less than 0");
        return;
      }

      // Validate star rating
      if (newHotelData.Star_Rating < 1 || newHotelData.Star_Rating > 5) {
        alert("Star rating should be between 1 and 5");
        return;
      }

      // Check if all required fields are filled
      for (const field in newHotelData) {
        if (!newHotelData[field]) {
          alert(`Please fill in ${field.replace(/_/g, " ")}`);
          return;
        }
      }

      // Make a POST request to add a new hotel
      const response = await axios.post("http://localhost:3001/hotels", newHotelData);

      // If the addition is successful, update the hotels state
      const addedHotel = response.data;
      setHotels([...hotels, addedHotel]);

      // Reset newHotelData and close the popup
      setNewHotelData({
        Chain_Name: "",
        Star_Rating: 0,
        Contact_Email: "",
        Phone_Number: "",
        Manager: "",
        Street: "",
        City: "",
        Postal_Code: "",
        Number_Of_Rooms: 0,
      });
      setShowAddHotelPopup(false);
    } catch (error) {
      console.error("Error adding hotel:", error);
    }
  };

  

  const handleDeleteHotel = async () => {
    if (selectedHotel) {
      try {
        // Make a DELETE request to remove the hotel
        await axios.delete(`http://localhost:3001/hotels/${selectedHotel.Hotel_ID}`);

        // If deletion is successful, update the hotels state
        const updatedHotels = hotels.filter((hotel) => hotel.Hotel_ID !== selectedHotel.Hotel_ID);
        setHotels(updatedHotels);
        setSelectedHotel(null);
      } catch (error) {
        console.error("Error deleting hotel:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHotelData({ ...newHotelData, [name]: value });
  };

  console.log("Rendering hotels:", hotels);

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
            <p>Number of Rooms: {hotel.Number_Of_Rooms}</p>

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
            
          </div>
        </div>
      )}

      {showAddHotelPopup && (
        <div className="popup-container">
          <div className="popup">
            <h3>Add Hotel</h3>

            <label>Chain Name:</label>
            <select
              name="Chain_Name"
              value={newHotelData.Chain_Name}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Hotel Chain</option>
              <option value="Sunrise Stay">Sunrise Stay</option>
              <option value="Moonlight Inns">Moonlight Inns</option>
              <option value="Starlight Hotels">Starlight Hotels</option>
              <option value="Oceanview Resorts">Oceanview Resorts</option>
              <option value="Mountain High Lodges">Mountain High Lodges</option>
            </select>
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
            {/* Adjusted to match the database field name */}
            <label>Number of Rooms:</label>
            <input
              type="number"
              name="Number_Of_Rooms"
              value={newHotelData.Number_Of_Rooms}
              onChange={handleInputChange}
              required
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
