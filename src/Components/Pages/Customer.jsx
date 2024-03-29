import React, { useState } from "react";
import "./Customer.css";

const Customer = () => {
  // Simulated hotel data
  const hotelData = [
    {
      name: "Hotel A",
      capacity: 2,
      area: "City",
      price: 100,
      hotelChain: "Chain 1",
      category: "3-star",
    },
    {
      name: "Hotel B",
      capacity: 4,
      area: "Beach",
      price: 150,
      hotelChain: "Chain 2",
      category: "4-star",
    },
    {
      name: "Hotel C",
      capacity: 2,
      area: "City",
      price: 120,
      hotelChain: "Chain 1",
      category: "2-star",
    },
    {
      name: "Hotel D",
      capacity: 6,
      area: "Mountain",
      price: 200,
      hotelChain: "Chain 3",
      category: "5-star",
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

  // Handler for applying filters
  const applyFilters = () => {
    // Validate filters
    const errors = {};
    if (!filters.startDate) {
      errors.startDate = "Start date is required";
    }
    if (!filters.endDate) {
      errors.endDate = "End date is required";
    }
    if (
      filters.startDate &&
      filters.endDate &&
      new Date(filters.endDate) < new Date(filters.startDate)
    ) {
      errors.endDate = "End date cannot be before start date";
    }
    // Add more validation for other filters if needed

    if (Object.keys(errors).length === 0) {
      // No errors, proceed with applying filters
      let filteredData = [...hotelData];

      // Filter by capacity
      if (filters.capacity) {
        filteredData = filteredData.filter(
          (hotel) => hotel.capacity >= parseInt(filters.capacity)
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
    } else {
      // Update errors state to display error messages
      setErrors(errors);
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
      {/* Other filter options (capacity, area, hotelChain, category, priceRange) */}
      {/* Implement similar input/select elements for other filter options */}

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
          <ul>
            {filteredHotels.map((hotel, index) => (
              <li key={index}>{hotel.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No hotels match the selected criteria.</p>
      )}
    </div>
  );
};

export default Customer;
