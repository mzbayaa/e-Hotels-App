import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Search.css";

const Search = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    capacity: "",
    area: "",
    hotelChain: "",
    category: "",
    priceRange: "",
  });
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [areas, setAreas] = useState([]);
  const [hotelChains, setHotelChains] = useState([]);


  const fetchAvailableRooms = useCallback(async () => {
    setIsLoading(true);
    let query = new URLSearchParams(filters).toString();
    try {
      const response = await fetch(`http://localhost:3001/available-rooms?${query}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setAvailableRooms(data);
    } catch (error) {
      console.error('Error:', error);
      setErrors({ ...errors, fetch: 'Failed to fetch available rooms.' });
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const fetchAreasAndChains = async () => {
      try {
        const areasResponse = await fetch("http://localhost:3001/areas");
        if (!areasResponse.ok) throw new Error('Network response was not ok for areas');
        const areasData = await areasResponse.json();
        setAreas(areasData);

        const chainsResponse = await fetch("http://localhost:3001/hotel-chains");
        if (!chainsResponse.ok) throw new Error('Network response was not ok for hotel chains');
        const chainsData = await chainsResponse.json();
        setHotelChains(chainsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAreasAndChains();
    if (filters.startDate && filters.endDate) {
      fetchAvailableRooms();
    }
  }, [fetchAvailableRooms, filters.startDate, filters.endDate]);

  const handleBookingClick = (room) => {
    navigate(`/booking/${room.Room_ID}`, {
      state: { 
        roomDetails: {
          ...room,
          checkInDate: filters.startDate,
          checkOutDate: filters.endDate,
        }
      }
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = () => {
    fetchAvailableRooms();
  };

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
  };

  const renderRoomCards = () => {
    if (isLoading) return <p>Loading rooms...</p>;
    return availableRooms.length > 0 ? (
      <div className="hotel-cards">
        {availableRooms.map((room) => (
          <div key={room.Room_ID} className="hotel-card" onClick={() => handleBookingClick(room)}>
            <h3>{room.Chain_Name} - Room {room.Room_ID}</h3>
            <p>Price: ${room.Price}</p>
            <p>Capacity: {room.Capacity}</p>
            <p>Area: {room.City}</p>
            <p>Rating: {room.Star_Rating} stars</p>
            <p>Amenities: {room.Amenities}</p>
          </div>
        ))}
      </div>
    ) : (
      <p>No rooms found. Adjust your filters and try again.</p>
    );
  };

  return (
    <div className="customer-container">
      <h2>Find Your Perfect Room</h2>

      {/* Filter inputs */}
      <div className="filter-section">
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={handleFilterChange}
        />
      </div>

      <div className="filter-section">
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          min={filters.startDate || new Date().toISOString().split("T")[0]}
          onChange={handleFilterChange}
        />
      </div>

      <div className="filter-section">
        <label>Capacity:</label>
        <input
          type="number"
          name="capacity"
          value={filters.capacity}
          min="1"
          onChange={handleFilterChange}
        />
      </div>

      {/* Updated Area dropdown to use fetched areas */}
      <div className="filter-section">
        <label>Area:</label>
        <select name="area" value={filters.area} onChange={handleFilterChange}>
          <option value="">Select Area</option>
          {areas.map((area, index) => (
            <option key={index} value={area}>{area}</option>
          ))}
        </select>
      </div>

      {/* Hotel Chain dropdown */}
      <div className="filter-section">
        <label>Hotel Chain:</label>
        <select name="hotelChain" value={filters.hotelChain} onChange={handleFilterChange}>
          <option value="">Select Hotel Chain</option>
          {hotelChains.map((chain, index) => (
            <option key={index} value={chain}>{chain}</option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label>Category:</label>
        <select name="category" value={filters.category} onChange={handleFilterChange}>
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
        <select name="priceRange" value={filters.priceRange} onChange={handleFilterChange}>
          <option value="">Select Price Range</option>
          <option value="0-100">$0 - $100</option>
          <option value="101-200">$101 - $200</option>
          <option value="201-300">$201 - $300</option>
        </select>
      </div>

      <button className="btn" onClick={applyFilters}>Apply Filters</button>
      <button className="btn" onClick={resetFilters}>Reset Filters</button>

      {renderRoomCards()}
    </div>
  );
};

export default Search;
