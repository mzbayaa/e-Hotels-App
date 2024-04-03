import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomDetails } = location.state || {};
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  const handlePaymentClick = async () => {
    const newErrors = {};

    if (!paymentInfo.cardNumber || paymentInfo.cardNumber.length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    if (!paymentInfo.cardName) {
      newErrors.cardName = "Cardholder name is required";
    }
    if (!paymentInfo.cvv || paymentInfo.cvv.length !== 3) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:3001/book-room', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            roomId: roomDetails.Room_ID,
            checkInDate: roomDetails.checkInDate,
            checkOutDate: roomDetails.checkOutDate,
          }),
        });

          if (!response.ok) {
              throw new Error('Booking failed');
          }

          const data = await response.json();
          navigate('/confirmation', { state: { bookingId: data.bookingId } });
      } catch (error) {
          console.error('Booking error:', error);
          setErrors({ ...errors, booking: 'Failed to complete booking.' });
      }
    } else {
        setErrors(errors);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!roomDetails) {
      console.log("Room details are missing.");
      navigate("/");
    }
  }, [navigate, roomDetails]);

  return (
    <div className="payment-container">
      <h2>Payment Information</h2>
      <div className="payment-form">
        <div className="form-group">
          <label>Card Number:</label>
          <input
            type="number"
            value={paymentInfo.cardNumber}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
            placeholder="Enter card number"
          />
          {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
        </div>
        <div className="form-group">
          <label>Cardholder Name:</label>
          <input
            type="text"
            value={paymentInfo.cardName}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
            placeholder="Enter cardholder name"
          />
          {errors.cardName && <span className="error">{errors.cardName}</span>}
        </div>
        <div className="form-group">
          <label>CVV:</label>
          <input
            type="number"
            value={paymentInfo.cvv}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
            placeholder="Enter CVV"
          />
          {errors.cvv && <span className="error">{errors.cvv}</span>}
        </div>
        <div className="payment-buttons">
          <button className="btn" onClick={handlePaymentClick}>Pay Now</button>
          <button className="btn" onClick={handleBackClick}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
