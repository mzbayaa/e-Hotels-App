import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";

const LogIn = () => {
  const navigate = useNavigate();

  // State to manage employee information and errors
  const [employeeInfo, setEmployeeInfo] = useState({
    employeeID: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields
    const newErrors = {};
    if (!employeeInfo.employeeID) {
      newErrors.employeeID = "Employee ID is required";
    }
    if (!employeeInfo.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors); // Update errors state
    if (Object.keys(newErrors).length === 0) {
      console.log("Employee Info:", employeeInfo);
      navigate("/dashboard"); // Navigate to dashboard page
    }
  };

  return (
    <div className="signup-container">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee ID:</label>
          <input
            type="text"
            value={employeeInfo.employeeID}
            onChange={(e) =>
              setEmployeeInfo({ ...employeeInfo, employeeID: e.target.value })
            }
            required
          />
          {errors.employeeID && (
            <span className="error">{errors.employeeID}</span>
          )}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={employeeInfo.password}
            onChange={(e) =>
              setEmployeeInfo({ ...employeeInfo, password: e.target.value })
            }
            required
          />
          {errors.password && (
            <span className="error">{errors.password}</span>
          )}
        </div>
        <button type="submit" className="btn" aria-label="Log In">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogIn;

