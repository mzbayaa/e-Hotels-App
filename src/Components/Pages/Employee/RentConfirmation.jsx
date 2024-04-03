import React, { useEffect, useState } from "react";
import "./RentConfirmation.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Confirmation({ selectedRoom }) {
  const navigate = useNavigate();
  const [confirmationNumber, setConfirmationNumber] = useState(null);

  useEffect(() => {
    const fetchConfirmationNumber = async () => {
      try {
        // Fetch the number of rooms with booked = 2 from the backend
        const response = await axios.get("http://localhost:3001/rented-rooms");
        const numBookedRooms = response.data.length;
        // Calculate the next renting_id
        const nextRentingId = numBookedRooms + 1;
        setConfirmationNumber(nextRentingId);
        // Convert nextRentingId to a string and pad it with leading zeros
        const formattedConfirmationNumber = String(nextRentingId).padStart(6, '0');
        setConfirmationNumber(formattedConfirmationNumber);
        await axios.post("http://localhost:3001/archive", { rentingId: formattedConfirmationNumber });
    } catch (error) {
      console.error("Error fetching confirmation number:", error);
    
      }
    };

    fetchConfirmationNumber();
  }, []);

  return (
    <div className="page">
      <h1 className="header">Transaction Confirmed!</h1>
      <p className="message">
        We have successfully received and confirmed your reservation request.
      </p>
      <p>An email confirming the reservation will be sent shortly.</p>
      <p>Confirmation Number: #{confirmationNumber}</p>
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
