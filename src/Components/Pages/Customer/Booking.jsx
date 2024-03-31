import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Booking = () => {
  const { hotelId } = useParams();

  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate("/payment");
  };

  const handleBackClick = () => {
    navigate("/search");
  };

  // Retrieve the selected hotel details based on hotelId
  // You may fetch this data from an API or use context/state management
  const hotelDetails = {
    id: 1,
    name: "Hotel A",
    capacity: 2,
    amenities: ["TV", "Air Conditioning", "Wi-Fi"],
    address: "123 Main St, City, Country",
    // Add more hotel details as needed
  };

  return (
    <div>
      <h2>Booking Page</h2>
      <h3>{hotelDetails.name}</h3>
      <p>Capacity: {hotelDetails.capacity}</p>
      <p>Amenities: {hotelDetails.amenities.join(", ")}</p>
      <p>Address: {hotelDetails.address}</p>
      <button className="btn" onClick={handleBookClick}>
        Book
      </button>
      <button className="btn" onClick={handleBackClick}>
        Back
      </button>
    </div>
  );
};

export default Booking;
