import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleCustomerClick = () => {
    navigate("/sign-up");
  };

  const handleEmployeeClick = () => {
    navigate("/employee");
  };

  return (
    <div className="home-container">
      <h1>Welcome to e-Hotels</h1>
      <p className="description">
        e-Hotels is a collaborative project developed by five well-known hotel
        chains, offering a seamless experience for booking rooms across more
        than 14 different locations in North America. Our platform allows you to
        easily search for available rooms, view real-time availability, and make
        bookings hassle-free. Whether you're a customer looking for the perfect
        stay or an employee managing bookings, e-Hotels has you covered.
      </p>
      <p>Are you a customer or a employee?</p>
      <div className="user-options">
        <button
          className="btn"
          onClick={handleCustomerClick}
          aria-label="Customer"
        >
          Customer
        </button>
        <button
          className="btn"
          onClick={handleEmployeeClick}
          aria-label="Employee"
        >
          Employee
        </button>
      </div>
    </div>
  );
};

export default Home;
