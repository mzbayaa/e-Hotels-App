import express from "express";
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
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

app.use(cors());
app.use(express.json());

// Return all hotels
app.get("/hotels", (req, res) => {
    const query = "SELECT * FROM Hotel";
    db.query(query, (err, data) => {
        if (err) {
            console.error('Error fetching hotels:', err);
            return res.status(500).json({ error: 'Error fetching hotels' });
        }
        res.json(data);
    });
});

// Return all rooms
app.get("/rooms", (req, res) => {
  const query = "SELECT * FROM Room";
  db.query(query, (err, data) => {
      if (err) {
          console.error('Error fetching rooms:', err);
          return res.status(500).json({ error: 'Error fetching rooms' });
      }
      res.json(data);
  });
});

// Deleting a hotel
app.delete("/hotels/:hotelId", (req, res) => {
    const hotelId = req.params.hotelId;
    const query = "DELETE FROM Hotel WHERE Hotel_ID = ?";
    db.query(query, hotelId, (err, result) => {
        if (err) {
            console.error('Error deleting hotel:', err);
            return res.status(500).json({ error: 'Error deleting hotel' });
        }
        res.json({ message: 'Hotel deleted successfully' });
    });
});

// Deleting a room
app.delete("/rooms/:roomID", (req, res) => {
  const roomID = req.params.roomID;
  const query = "DELETE FROM Room WHERE Room_ID = ?";
  db.query(query, roomID, (err, result) => {
      if (err) {
          console.error('Error deleting room:', err);
          return res.status(500).json({ error: 'Error deleting room' });
      }
      res.json({ message: 'Room deleted successfully' });
  });
});


// POST route for adding a new hotel
app.post("/hotels", (req, res) => {
    const newHotel = req.body;

    // Check if all required fields are present
    const requiredFields = ["Chain_Name", "Star_Rating", "Contact_Email", "Phone_Number", "Manager", "Street", "City", "Postal_Code", "Number_Of_Rooms"];
    for (const field of requiredFields) {
        if (!newHotel[field]) {
            return res.status(400).json({ error: `Missing required field: ${field}` });
        }
    }

    // Insert the new hotel into the database
    const query = "INSERT INTO Hotel SET ?";
    db.query(query, newHotel, (err, result) => {
        if (err) {
            console.error('Error adding hotel:', err);
            return res.status(500).json({ error: 'Error adding hotel' });
        }
        newHotel.Hotel_ID = result.insertId;
        res.json(newHotel);
    });
});

// POST route for adding a new room
app.post("/rooms", (req, res) => {
    const newRoom = req.body;
  
    // Check if all required fields are present
    const requiredFields = ["Hotel_ID", "Price", "Capacity", "View_Type", "Amenities"];
    for (const field of requiredFields) {
      if (!newRoom[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }
  
    // Set booked to 0 by default if not provided
    if (newRoom.booked === undefined) {
      newRoom.booked = 0;
    }
  
    // Insert the new room into the database
    const query = "INSERT INTO Room SET ?";
    db.query(query, newRoom, (err, result) => {
      if (err) {
        console.error('Error adding room:', err);
        return res.status(500).json({ error: 'Error adding room' });
      }
      newRoom.Room_ID = result.insertId;
      res.json(newRoom);
    });
  });
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
