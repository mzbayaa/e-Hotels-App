import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Customer from "./Components/Pages/Customer";
import Employee from "./Components/Pages/Employee";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/customer" exact element={<Customer />} />
        <Route path="/employee" exact element={<Employee />} />
      </Routes>
    </Router>
  );
}

export default App;
