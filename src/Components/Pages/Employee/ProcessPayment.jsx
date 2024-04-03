import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./ProcessPayment.css";

const ProcessPayment = (  ) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedRoom } = location.state;
  const [selectedRoomData, setSelectedRoomData] = useState(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/rooms/${selectedRoom}`);
        setSelectedRoomData(response.data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
  }, [selectedRoom]);


  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const handlePayment = async () => {
    const newErrors = {};
  
    // Validate card number
    if (!paymentInfo.cardNumber || paymentInfo.cardNumber.length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
  
    // Validate cardholder name
    if (!paymentInfo.cardName) {
      newErrors.cardName = "Cardholder name is required";
    }
  
    // Validate CVV
    if (!paymentInfo.cvv || paymentInfo.cvv.length !== 3) {
      newErrors.cvv = "CVV must be 3 digits";
    }
  
    if (Object.keys(newErrors).length === 0) {
      try {
        if (selectedRoomData && (selectedRoomData.booked === 0 || selectedRoomData.booked === 1)) {
          // Update the room's availability to "rented" and set booked attribute to 2
          await axios.put(`http://localhost:3001/rooms/${selectedRoom}`, { availability: "rented", booked: 2 });
          navigate("/rent-confirmation"); 
        
        }
      } catch (error) {
        console.error("Error updating room:", error);
      }
    } else {
      // Update errors state to display error messages
      setErrors(newErrors);
    }
  };
  

  const handleCancel = () => {
    // Define the logic for canceling payment here
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="payment-container">
      <h2>Payment Information</h2>
      <div className="payment-form">
        <div className="form-group">
          <label>Card Number:</label>
          <input
            type="number"
            value={paymentInfo.cardNumber}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
            }
            placeholder="Enter card number"
          />
          {errors.cardNumber && (
            <span className="error">{errors.cardNumber}</span>
          )}
        </div>
        <div className="form-group">
          <label>Cardholder Name:</label>
          <input
            type="text"
            value={paymentInfo.cardName}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, cardName: e.target.value })
            }
            placeholder="Enter cardholder name"
          />
          {errors.cardName && <span className="error">{errors.cardName}</span>}
        </div>
        <div className="form-group">
          <label>CVV:</label>
          <input
            type="number"
            value={paymentInfo.cvv}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
            }
            placeholder="Enter CVV"
          />
          {errors.cvv && <span className="error">{errors.cvv}</span>}
        </div>
        <div className="payment-buttons">
          <button className="btn" onClick={handlePayment}>
            Pay Now
          </button>
          <button className="btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
        {errors.server && <div className="error">{errors.server}</div>}
      </div>
    </div>
  );
};

export default ProcessPayment;
