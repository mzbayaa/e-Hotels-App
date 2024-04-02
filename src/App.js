import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home.jsx";
import Search from "./Components/Pages/Customer/Search.jsx";
import SignUp from "./Components/Pages/Customer/SignUp.jsx";
import LogIn from "./Components/Pages/Employee/LogIn.jsx";
import Dashboard from "./Components/Pages/Employee/Dashboard.jsx";
import BookedRoom from "./Components/Pages/Employee/BookedRoom.jsx";
import BookRentRoom from "./Components/Pages/Employee/BookRentRoom.jsx";
import Booking from "./Components/Pages/Customer/Booking.jsx";
import Confirmation from "./Components/Pages/Customer/Confirmation.jsx";
import Payment from "./Components/Pages/Customer/Payment.jsx";
import ProcessPayment from "./Components/Pages/Employee/ProcessPayment.jsx";
import ManageHotels from "./Components/Pages/Employee/ManageHotels.jsx";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/sign-up" exact element={<SignUp />} />
        <Route path="/log-in" exact element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/booked-room" exact element={<BookedRoom />} />
        <Route path="/book-rent-room" element={<BookRentRoom />} />
        <Route path="/search" exact element={<Search />} />
        <Route path="/booking/:hotelId" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />

        <Route path="/process-payment" element={<ProcessPayment />} />
        <Route path="/manage-hotels" element={<ManageHotels />} />


      </Routes>
    </Router>
  );
}

export default App;
