import express from "express";
import axios from "axios"; // Import Axios
import mysql from "mysql";
import cors from "cors";

const app = express();

const port = process.env.PORT || 3001;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "messi4life",
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

// Endpoint to fetch person data
app.get("/person", (req, res) => {
  const query = "SELECT * FROM Person";
  db.query(query, (err, data) => {
    if (err) {
      console.error("Error fetching person data:", err);
      return res.status(500).json({ error: "Error fetching person data" });
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

// Endpoint to handle sign up
app.post("/sign-up", (req, res) => {
  const {
    firstName,
    lastName,
    street,
    city,
    postalCode,
    idType,
    idInfo,
    registrationDate,
  } = req.body;

  const query = `
    INSERT INTO Person (First_Name, Last_Name, Street, City, Postal_Code, ID_Type, ID_Info, Registration_Date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      firstName,
      lastName,
      street,
      city,
      postalCode,
      idType,
      idInfo,
      registrationDate,
    ],
    (err, result) => {
      if (err) {
        console.error("Error signing up:", err);
        return res.status(500).json({ error: "Error signing up" });
      }
      console.log("Customer signed up successfully");
      res.status(201).json({ message: "Customer signed up successfully" });
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
