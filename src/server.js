import express from "express";
import axios from "axios"; // Import Axios
import mysql from "mysql";
import cors from "cors";

const app = express();

const port = process.env.PORT || 3001;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "eHotels",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database");
});

app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Define your routes here

// Endpoint to fetch hotels
app.get("/hotels", (req, res) => {
  const query = "SELECT * FROM Hotel"; // Modify this query as needed
  db.query(query, (err, data) => {
    if (err) {
      console.error("Error fetching hotels:", err);
      return res.status(500).json({ error: "Error fetching hotels" });
    }
    res.json(data);
  });
});

// Endpoint to fetch room data
app.get("/rooms", (req, res) => {
  const query = "SELECT * FROM Room";
  db.query(query, (err, data) => {
    if (err) {
      console.error("Error fetching room data:", err);
      return res.status(500).json({ error: "Error fetching room data" });
    }
    res.json(data);
  });
});

// New endpoint to fetch the Customer table
app.get("/customer", (req, res) => {
  const query = "SELECT * FROM Customer";
  db.query(query, (err, data) => {
    if (err) {
      console.error("Error fetching Customer table:", err);
      return res.status(500).json({ error: "Error fetching Customer table" });
    }
    res.json(data);
  });
});

// POST route for adding a new customer
app.post("/customer", (req, res) => {
  const newCustomer = req.body;

  // Check if all required fields are present
  const requiredFields = [
    // "Customer_ID",
    "Registration_Date",
    "First_Name",
    "Last_Name",
    "Street",
    "City",
    "Postal_Code",
    "Security_ID",
    "ID_Type",
  ];
  for (const field of requiredFields) {
    if (!newCustomer[field]) {
      return res
        .status(400)
        .json({ error: `Missing required field: ${field}` });
    }
  }

  // Insert the new customer into the database
  const query = "INSERT INTO Customer SET ?";
  db.query(query, newCustomer, (err, result) => {
    if (err) {
      console.error("Error adding customer:", err);
      return res.status(500).json({ error: "Error adding customer" });
    }
    newCustomer.Customer_ID = result.insertId;
    res.json(newCustomer);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
