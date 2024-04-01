import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Booking.css";

const Booking = () => {
  const { hotelId } = useParams();

  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate("/payment");
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  // Retrieve the selected hotel details based on hotelId
  // You may fetch this data from an API or use context/state management
  const hotelDetails = {
    id: 1,
    hotelName: "Hotel A",
    hotelChain: "Hotel Chain",
    capacity: 2,
    category: "3-star",
    area: "City",
    price: 100,
    amenities: ["TV", "Air Conditioning", "Wi-Fi"],
    address: "123 Main St, City, Country",
    // Add more hotel details as needed
  };

  return (
    <div className="booking-container">
      <h2>Booking Page</h2>
      <div className="booking-details">
        <h3>{hotelDetails.hotelName}</h3>
        <h4>{hotelDetails.hotelChain}</h4>
        <p>Capacity: {hotelDetails.capacity}</p>
        <p>Total Capacity: {"view"}</p>
        <p>Rating: {hotelDetails.category}</p>
        <p>Area: {hotelDetails.area}</p>
        <p>Total Rooms Per Area: {"view"}</p>
        <p>Price: {hotelDetails.price}</p>
        <p>Amenities: {hotelDetails.amenities.join(", ")}</p>
        <p>Address: {hotelDetails.address}</p>
        <button className="btn" onClick={handleBookClick}>
          Book
        </button>
        <button className="btn" onClick={handleBackClick}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Booking;
