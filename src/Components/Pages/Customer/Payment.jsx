import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const navigate = useNavigate();

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const handlePaymentClick = () => {
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
      // No errors, proceed with payment
      navigate("/confirmation"); // Redirect to confirmation page after payment
    } else {
      // Update errors state to display error messages
      setErrors(newErrors);
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Redirect to search page if payment is canceled
  };

  return (
    <div className="payment-container">
      <h2>Payment Information</h2>
      <div className="payment-form">
        <div className="form-group">
          <label>Card Number:</label>
          <input
            type="number" // Change input type to "number"
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
            type="number" // Change input type to "number"
            value={paymentInfo.cvv}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
            }
            placeholder="Enter CVV"
          />
          {errors.cvv && <span className="error">{errors.cvv}</span>}
        </div>
        <div className="payment-buttons">
          <button className="btn" onClick={handlePaymentClick}>
            Pay Now
          </button>
          <button className="btn" onClick={handleBackClick}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
