import React from "react";
import "./Confirmation.css";
import { useNavigate } from "react-router-dom";

export default function Confirmation() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1 className="header">Booking Confirmed!</h1>
      <p className="message">
        We have succecufully received and confirmed your reservation request.{" "}
      </p>
      <p>An email confirming your reservation will be sent to you shortly </p>
      {/* <p>Booking Number: #{bookingId} </p> */}
      <p>Booking Number: #1111111 </p>
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
