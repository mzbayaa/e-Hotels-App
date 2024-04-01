import React from "react";
import "./Confirmation.css";
import { useNavigate } from "react-router-dom";

export default function Confirmation() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1 className="header">Transaction Confirmed!</h1>
      <p className="message">
        We have succecufully received and confirmed your reservation request.{" "}
      </p>
      <p>An email confirming the reservation will be sent shortly </p>
      {/* <p>Booking Number: #{bookingId} </p> */}
      <p>Confirmation Number: #1111111 </p>
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
