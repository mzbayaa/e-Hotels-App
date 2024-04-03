import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [customerInfo, setCustomerInfo] = useState({
    Registration_Date: getCurrentDate(),
    First_Name: "",
    Last_Name: "",
    Street: "",
    City: "",
    Postal_Code: "",
    Security_ID: "",
    ID_Type: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!customerInfo.First_Name) {
      newErrors.First_Name = "First name is required";
    }
    if (!customerInfo.Last_Name) {
      newErrors.Last_Name = "Last name is required";
    }
    if (!customerInfo.Street) {
      newErrors.Street = "Street is required";
    }
    if (!customerInfo.City) {
      newErrors.City = "City is required";
    }
    if (!customerInfo.Postal_Code) {
      newErrors.Postal_Code = "Postal code is required";
    }
    if (!customerInfo.ID_Type) {
      newErrors.ID_Type = "ID type is required";
    }
    if (!customerInfo.Security_ID) {
      newErrors.Security_ID = `${customerInfo.ID_Type} is required`;
    }
    if (!customerInfo.registrationDate) {
      newErrors.registrationDate = "Registration date is required";
    }
    setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    // Optionally, store in localStorage for immediate access or offline use
    localStorage.setItem('customerInfo', JSON.stringify(customerInfo));

    // Check if online before attempting to POST to server
    if (navigator.onLine) {
      try {
        // Make a POST request to add a new customer
        await axios.post("http://localhost:3001/customer", customerInfo);
        console.log("Sign up successful");
        navigate("/search");
      } catch (error) {
        console.error("Error signing up:", error);
        // Optional: Handle offline scenario or server error
      }
    } else {
      // Optional: Logic for handling offline state, e.g., queuing data for later sync
      console.log("Offline: Customer info saved locally and will sync when online.");
      navigate("/search");
    }
  }
  };

  const handleIdTypeChange = (e) => {
    const ID_Type = e.target.value;
    setCustomerInfo({ ...customerInfo, ID_Type, Security_ID: "" });
  };

  return (
    <div className="signup-container">
      <h2>Customer Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            value={customerInfo.First_Name}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, First_Name: e.target.value })
            }
            required
          />
          {errors.First_Name && (
            <span className="error">{errors.First_Name}</span>
          )}
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            value={customerInfo.Last_Name}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, Last_Name: e.target.value })
            }
            required
          />
          {errors.Last_Name && (
            <span className="error">{errors.Last_Name}</span>
          )}
        </div>
        <div className="form-group">
          <label>Street:</label>
          <input
            type="text"
            value={customerInfo.Street}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, Street: e.target.value })
            }
            required
          />
          {errors.Street && <span className="error">{errors.Street}</span>}
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            value={customerInfo.City}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, City: e.target.value })
            }
            required
          />
          {errors.City && <span className="error">{errors.City}</span>}
        </div>
        <div className="form-group">
          <label>Postal Code:</label>
          <input
            type="text"
            value={customerInfo.Postal_Code}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, Postal_Code: e.target.value })
            }
            required
          />
          {errors.Postal_Code && (
            <span className="error">{errors.Postal_Code}</span>
          )}
        </div>
        <div className="form-group">
          <label>ID Type:</label>
          <select
            value={customerInfo.ID_Type}
            onChange={handleIdTypeChange}
            required
          >
            <option value="">Select ID Type</option>
            <option value="SSN">SSN</option>
            <option value="SIN">SIN</option>
            <option value="Driver's License">Driver's License</option>
          </select>
          {errors.ID_Type && <span className="error">{errors.ID_Type}</span>}
        </div>
        {customerInfo.ID_Type && (
          <div className="form-group">
            <label>{customerInfo.ID_Type}:</label>
            <input
              type="text"
              value={customerInfo.Security_ID}
              onChange={(e) =>
                setCustomerInfo({
                  ...customerInfo,
                  Security_ID: e.target.value,
                })
              }
              required
            />
            {errors.Security_ID && (
              <span className="error">{errors.Security_ID}</span>
            )}
          </div>
        )}
        <div className="form-group">
          <label>Registration Date:</label>
          <input type="text" value={customerInfo.Registration_Date} readOnly />
        </div>
        <button type="submit" className="btn" aria-label="Sign up">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
