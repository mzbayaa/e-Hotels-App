import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Search.css";

const Search = () => {
  const navigate = useNavigate();
  const [hotelData, setHotelData] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filters, setFilters] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch hotel data from the server
    axios
      .get("http://localhost:3001/hotels")
      .then((response) => {
        setHotelData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  // Handler for navigating to booking page
  const handleBookingClick = (hotelId) => {
    navigate(`/booking/${hotelId}`);
  };

  // Function to get the current date in the format YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`; // Add leading zero if month is less than 10
    }

    if (day < 10) {
      day = `0${day}`; // Add leading zero if day is less than 10
    }

    return `${year}-${month}-${day}`;
  };

  const renderHotelCards = () => {
    return (
      <div className="hotel-cards">
        {filteredHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="hotel-card"
            onClick={() => handleBookingClick(hotel.id)}
          >
            <h3>{hotel.name}</h3>
            <h4>{hotel.hotelChain}</h4>
            <p>Capacity: {hotel.capacity}</p>
            <p>Rating: {hotel.category}</p>
            <p>Area: {hotel.area}</p>
            <p>Price: ${hotel.price}</p>
            <p>Amenities: {hotel.amenities.join(", ")}</p>
          </div>
        ))}
      </div>
    );
  };

  // Handler for applying filters
  const applyFilters = () => {
    // Validate filters
    const newErrors = {};
    if (!filters.startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (!filters.endDate) {
      newErrors.endDate = "End date is required";
    }
    if (
      filters.startDate &&
      filters.endDate &&
      new Date(filters.endDate) < new Date(filters.startDate)
    ) {
      newErrors.endDate = "End date cannot be before start date";
    }
    if (filters.capacity && (isNaN(filters.capacity) || filters.capacity < 1)) {
      newErrors.capacity =
        "Capacity must be a number greater than or equal to 1";
    }
    // Add more validation for other filters if needed

    if (Object.keys(newErrors).length === 0) {
      // No errors, proceed with applying filters
      let filteredData = [...hotelData];

      // Filter by capacity
      if (filters.capacity) {
        filteredData = filteredData.filter(
          (hotel) => hotel.capacity == parseInt(filters.capacity)
        );
      }

      // Filter by area
      if (filters.area) {
        filteredData = filteredData.filter(
          (hotel) => hotel.area.toLowerCase() === filters.area.toLowerCase()
        );
      }

      // Filter by hotel chain
      if (filters.hotelChain) {
        filteredData = filteredData.filter(
          (hotel) =>
            hotel.hotelChain.toLowerCase() === filters.hotelChain.toLowerCase()
        );
      }

      // Filter by category
      if (filters.category) {
        filteredData = filteredData.filter(
          (hotel) =>
            hotel.category.toLowerCase() === filters.category.toLowerCase()
        );
      }

      // Filter by price range
      if (filters.priceRange) {
        const [minPrice, maxPrice] = filters.priceRange.split("-");
        filteredData = filteredData.filter(
          (hotel) =>
            hotel.price >= parseInt(minPrice) &&
            hotel.price <= parseInt(maxPrice)
        );
      }

      // Update filtered hotels state
      setFilteredHotels(filteredData);
      setErrors({});
    } else {
      // Update errors state to display error messages
      setErrors(newErrors);
    }
  };

  // Handler for resetting filters
  const resetFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      capacity: "",
      area: "",
      hotelChain: "",
      category: "",
      priceRange: "",
    });
    setFilteredHotels([]);
    setErrors({});
  };

  return (
    <div className="customer-container">
      <h2>Find Your Perfect Hotel</h2>
      <div className="filter-section">
        <label>Start Date:</label>
        <input
          type="date"
          value={filters.startDate}
          min={getCurrentDate()} // Set the minimum date to the current date
          onChange={(e) =>
            setFilters({ ...filters, startDate: e.target.value })
          }
        />
        {errors.startDate && <span className="error">{errors.startDate}</span>}
      </div>
      <div className="filter-section">
        <label>End Date:</label>
        <input
          type="date"
          value={filters.endDate}
          min={filters.startDate || getCurrentDate()}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />
        {errors.endDate && <span className="error">{errors.endDate}</span>}
      </div>
      <div className="filter-section">
        <label>Capacity:</label>
        <input
          type="number"
          value={filters.capacity}
          min="1"
          onChange={(e) => setFilters({ ...filters, capacity: e.target.value })}
        />
        {errors.capacity && <span className="error">{errors.capacity}</span>}
      </div>
      <div className="filter-section">
        <label>Area:</label>
        <select
          value={filters.area}
          onChange={(e) => setFilters({ ...filters, area: e.target.value })}
        >
          <option value="">Select Area</option>
          <option value="City">City</option>
          <option value="Beach">Beach</option>
          <option value="Mountain">Mountain</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="filter-section">
        <label>Hotel Chain:</label>
        <select
          value={filters.hotelChain}
          onChange={(e) =>
            setFilters({ ...filters, hotelChain: e.target.value })
          }
        >
          <option value="">Select Hotel Chain</option>
          <option value="Chain 1">Chain 1</option>
          <option value="Chain 2">Chain 2</option>
          <option value="Chain 3">Chain 3</option>
        </select>
      </div>
      <div className="filter-section">
        <label>Category:</label>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="1-star">1-star</option>
          <option value="2-star">2-star</option>
          <option value="3-star">3-star</option>
          <option value="4-star">4-star</option>
          <option value="5-star">5-star</option>
        </select>
      </div>
      <div className="filter-section">
        <label>Price Range:</label>
        <select
          value={filters.priceRange}
          onChange={(e) =>
            setFilters({ ...filters, priceRange: e.target.value })
          }
        >
          <option value="">Select Price Range</option>
          <option value="0-100">$0 - $100</option>
          <option value="101-200">$101 - $200</option>
          <option value="201-300">$201 - $300</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <button className="btn" onClick={applyFilters}>
        Apply Filters
      </button>
      <button className="btn" onClick={resetFilters}>
        Reset Filters
      </button>

      {filteredHotels.length > 0 ? (
        <div>
          <h3>Available Hotels:</h3>
          <div>
            {filteredHotels.length > 0 ? (
              renderHotelCards()
            ) : (
              <p>No hotels found.</p>
            )}
          </div>
        </div>
      ) : (
        <p>No hotels found.</p>
      )}
    </div>
  );
};

export default Search;
