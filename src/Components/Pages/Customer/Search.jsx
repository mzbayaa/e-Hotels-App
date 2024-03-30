import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const navigate = useNavigate();

  // Handler for navigating to booking page
  const handleBookingClick = (hotelId) => {
    navigate(`/booking/${hotelId}`);
  };

  // Simulated hotel data
  const hotelData = [
    {
      id: 1,
      name: "Hotel A",
      capacity: 2,
      area: "City",
      price: 100,
      hotelChain: "Chain 1",
      category: "3-star",
      amenities: ["TV", "Air Conditioning", "Wi-Fi"],
    },
    {
      id: 2,
      name: "Hotel B",
      capacity: 4,
      area: "Beach",
      price: 150,
      hotelChain: "Chain 2",
      category: "4-star",
      amenities: ["TV", "Air Conditioning", "Wi-Fi"],
    },
    {
      id: 3,
      name: "Hotel C",
      capacity: 2,
      area: "City",
      price: 120,
      hotelChain: "Chain 1",
      category: "2-star",
      amenities: ["TV", "Air Conditioning", "Wi-Fi"],
    },
    {
      id: 4,
      name: "Hotel D",
      capacity: 6,
      area: "Mountain",
      price: 200,
      hotelChain: "Chain 3",
      category: "5-star",
      amenities: ["TV", "Air Conditioning", "Wi-Fi"],
    },
    // Add more simulated hotel data as needed
  ];

  // State to manage filter values and errors
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    capacity: "",
    area: "",
    hotelChain: "",
    category: "",
    priceRange: "",
  });
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [errors, setErrors] = useState({});

  const renderHotelCards = () => {
    return (
      <div className="hotel-cards">
        {filteredHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="hotel-card"
            onClick={handleBookingClick}
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
          {/* Add more options as needed */}
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
          {/* Add more options as needed */}
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

      {/* Display filtered hotels */}
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
