import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Search from "./Components/Pages/Customer/Search";
import SignUp from "./Components/Pages/Customer/SignUp";
import Employee from "./Components/Pages/Employee/Employee";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/search" exact element={<Search />} />
        <Route path="/sign-up" exact element={<SignUp />} />
        <Route path="/employee" exact element={<Employee />} />
      </Routes>
    </Router>
  );
}

export default App;
