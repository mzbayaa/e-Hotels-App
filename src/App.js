import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Search from "./Components/Pages/Customer/Search";
import SignUp from "./Components/Pages/Customer/SignUp";
import LogIn from "./Components/Pages/Employee/LogIn";
import Dashboard from "./Components/Pages/Employee/Dashboard";
import BookedRoom from "./Components/Pages/Employee/BookedRoom";
import BookRentRoom from "./Components/Pages/Employee/BookRentRoom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/search" exact element={<Search />} />
        <Route path="/sign-up" exact element={<SignUp />} />
        <Route path="/log-in" exact element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/booked-room" exact element={<BookedRoom />} />
        <Route path="/book-rent-room" element={<BookRentRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
