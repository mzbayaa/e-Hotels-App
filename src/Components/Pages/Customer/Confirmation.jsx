import React from "react";
import "./Confirmation.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  
 
  const bookingId = location.state ? location.state.bookingId : "Unavailable";

  return (
    <div className="page">
      <h1 className="header">Booking Confirmed!</h1>
      <p className="message">
        We have successfully received and confirmed your reservation request.
      </p>
      <p>An email confirming your reservation will be sent to you shortly.</p>
      {/* Displaying the dynamic booking number */}
      <p>Booking Number: #{bookingId}</p>
      <div className="button">
        <button
          className="btn btn-success"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
}
