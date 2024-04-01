import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();

  // Function to get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // State to manage customer information and errors
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    street: "", // Separate street variable
    city: "", // Separate city variable
    postalCode: "", // Separate postal code variable
    idType: "",
    idInfo: "",
    registrationDate: getCurrentDate(), // Set initial value to current date
  });
  const [errors, setErrors] = useState({});

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields
    const newErrors = {};
    if (!customerInfo.firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!customerInfo.lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!customerInfo.street) {
      newErrors.street = "Street is required";
    }
    if (!customerInfo.city) {
      newErrors.city = "City is required";
    }
    if (!customerInfo.postalCode) {
      newErrors.postalCode = "Postal code is required";
    }
    if (!customerInfo.idType) {
      newErrors.idType = "ID type is required";
    }
    if (!customerInfo.idInfo) {
      newErrors.idInfo = `${customerInfo.idType} is required`;
    }
    if (!customerInfo.registrationDate) {
      newErrors.registrationDate = "Registration date is required";
    }
    setErrors(newErrors); // Update errors state
    // Proceed with form submission if no errors
    if (Object.keys(newErrors).length === 0) {
      console.log("Customer Info:", customerInfo);
      navigate("/search"); // Navigate to search page
    }
  };

  // Handler for changing ID type
  const handleIdTypeChange = (e) => {
    const idType = e.target.value;
    setCustomerInfo({ ...customerInfo, idType, idInfo: "" });
  };

  return (
    <div className="signup-container">
      <h2>Customer Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            value={customerInfo.firstName}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, firstName: e.target.value })
            }
            required
          />
          {errors.firstName && (
            <span className="error">{errors.firstName}</span>
          )}
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            value={customerInfo.lastName}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, lastName: e.target.value })
            }
            required
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div className="form-group">
          <label>Street:</label>
          <input
            type="text"
            value={customerInfo.street}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, street: e.target.value })
            }
            required
          />
          {errors.street && <span className="error">{errors.street}</span>}
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            value={customerInfo.city}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, city: e.target.value })
            }
            required
          />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>
        <div className="form-group">
          <label>Postal Code:</label>
          <input
            type="text"
            value={customerInfo.postalCode}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, postalCode: e.target.value })
            }
            required
          />
          {errors.postalCode && (
            <span className="error">{errors.postalCode}</span>
          )}
        </div>
        <div className="form-group">
          <label>ID Type:</label>
          <select
            value={customerInfo.idType}
            onChange={handleIdTypeChange}
            required
          >
            <option value="">Select ID Type</option>
            <option value="SSN">SSN</option>
            <option value="SIN">SIN</option>
            <option value="Driver's License">Driver's License</option>
            {/* Add more options as needed */}
          </select>
          {errors.idType && <span className="error">{errors.idType}</span>}
        </div>
        {/* Render additional input field based on selected ID type */}
        {customerInfo.idType && (
          <div className="form-group">
            <label>{customerInfo.idType}:</label>
            <input
              type="text"
              value={customerInfo.idInfo}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, idInfo: e.target.value })
              }
              required
            />
            {errors.idInfo && <span className="error">{errors.idInfo}</span>}
          </div>
        )}
        <div className="form-group">
          <label>Registration Date:</label>
          <input
            type="text"
            value={customerInfo.registrationDate}
            readOnly // Make the input uneditable
          />
        </div>
        <button type="submit" className="btn" aria-label="Sign up">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
