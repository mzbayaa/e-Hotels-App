import express from "express";
import mysql from "mysql";
import cors from "cors";
import axios from "axios"; // Import axios for making HTTP requests

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
app.use(express.json());

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

// Return all rooms
app.get("/rooms", (req, res) => {
  const query = "SELECT * FROM Room";
  db.query(query, (err, data) => {
    if (err) {
      console.error("Error fetching rooms:", err);
      return res.status(500).json({ error: "Error fetching rooms" });
    }
    res.json(data);
  });
});

// Return all archives
app.get("/archive", (req, res) => {
  const query = "SELECT * FROM Archive";
  db.query(query, (err, data) => {
    if (err) {
      console.error("Error fetching archives:", err);
      return res.status(500).json({ error: "Error fetching archives" });
    }
    res.json(data);
  });
});

app.get("/available-rooms", (req, res) => {
  let { startDate, endDate, capacity, area, hotelChain, category, priceRange } =
    req.query;

  let query = `
        SELECT DISTINCT Room.*, Hotel.Chain_Name, Hotel.City, Hotel.Star_Rating
        FROM Room
        JOIN Hotel ON Room.Hotel_ID = Hotel.Hotel_ID
        LEFT JOIN Renting ON Room.Room_ID = Renting.Room_ID AND 
        ((Renting.Check_In_Date BETWEEN ? AND ?) OR (Renting.Check_Out_Date BETWEEN ? AND ?))
        LEFT JOIN Booking ON Room.Room_ID = Booking.Room_ID AND 
        ((Booking.Check_In_Date BETWEEN ? AND ?) OR (Booking.Check_Out_Date BETWEEN ? AND ?))
        WHERE Room.Booked = 0
    `;

  let queryParams = [
    startDate,
    endDate,
    startDate,
    endDate,
    startDate,
    endDate,
    startDate,
    endDate,
  ];

  if (capacity) {
    query += " AND Room.Capacity = ?";
    queryParams.push(capacity);
  }

  if (area) {
    query += " AND Hotel.City = ?";
    queryParams.push(area);
  }

  if (hotelChain) {
    query += " AND Hotel.Chain_Name = ?";
    queryParams.push(hotelChain);
  }

  if (category) {
    query += " AND Hotel.Star_Rating = ?";
    queryParams.push(category);
  }

  if (priceRange) {
    let [minPrice, maxPrice] = priceRange.split("-");
    query += " AND Room.Price BETWEEN ? AND ?";
    queryParams.push(minPrice, maxPrice);
  }

  db.query(query, queryParams, (err, rooms) => {
    if (err) {
      console.error("Error fetching available rooms:", err);
      return res.status(500).json({ error: "Error fetching available rooms" });
    }
    res.json(rooms);
  });
});

app.get("/areas", (req, res) => {
  const query = "SELECT DISTINCT City FROM Hotel ORDER BY City ASC";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching areas:", err);
      return res.status(500).json({ error: "Error fetching areas" });
    }
    const areas = result.map((item) => item.City);
    res.json(areas);
  });
});

app.get("/hotel-chains", (req, res) => {
  const query = "SELECT DISTINCT Chain_Name FROM Hotel ORDER BY Chain_Name;";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching hotel chains:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    const chains = result.map((row) => row.Chain_Name);
    res.json(chains);
  });
});

app.post("/book-room", async (req, res) => {
  console.log("Request body:", req.body);

  const { roomId, checkInDate, checkOutDate } = req.body;

  if (!roomId || !checkInDate || !checkOutDate) {
    return res.status(400).json({
      error:
        "Missing roomId, checkInDate, or checkOutDate in the request body.",
    });
  }

  const insertBookingSQL = `
      INSERT INTO Booking (Room_ID, Check_In_Date, Check_Out_Date, Date_Of_Booking)
      VALUES (?, ?, ?, NOW());
    `;

  const updateRoomSQL = `
      UPDATE Room
      SET Booked = 1
      WHERE Room_ID = ?;
    `;

  const insertArchiveSQL = `
      INSERT INTO Archive (Booking_ID)
      VALUES (?);
    `;

  try {
    db.beginTransaction();

    db.query(
      insertBookingSQL,
      [roomId, checkInDate, checkOutDate],
      (error, results) => {
        if (error) {
          return db.rollback(() => {
            throw error;
          });
        }

        const bookingId = results.insertId;

        db.query(updateRoomSQL, [roomId], (error) => {
          if (error) {
            return db.rollback(() => {
              throw error;
            });
          }

          db.query(insertArchiveSQL, [bookingId], (error) => {
            if (error) {
              return db.rollback(() => {
                throw error;
              });
            }

            db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  throw err;
                });
              }
              res.json({
                bookingId: bookingId,
                message: "Booking and archiving successful",
              });
            });
          });
        });
      }
    );
  } catch (err) {
    console.error("Failed to book room:", err);
    res.status(500).send("Failed to book room");
  }
});

// PUT route for updating room booking status
app.put("/rooms/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  const { availability, booked } = req.body;

  // Update the room's booking status
  const query = "UPDATE Room SET  booked = ? WHERE Room_ID = ?";
  db.query(query, [booked, roomId], (err, result) => {
    if (err) {
      console.error("Error updating room booking status:", err);
      return res
        .status(500)
        .json({ error: "Error updating room booking status" });
    }
    res.json({ message: "Room booking status updated successfully" });
  });
});

// Return a specific room by ID
app.get("/rooms/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  const query = "SELECT * FROM Room WHERE Room_ID = ?";
  db.query(query, roomId, (err, data) => {
    if (err) {
      console.error("Error fetching room:", err);
      return res.status(500).json({ error: "Error fetching room" });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.json(data[0]);
  });
});

// get rented rooms
app.get("/rented-rooms", (req, res) => {
  const query = "SELECT * FROM Room WHERE booked = 2";
  db.query(query, (err, data) => {
    if (err) {
      console.error("Error fetching room:", err);
      return res.status(500).json({ error: "Error fetching room" });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Rooms not found" });
    }
    res.json(data);
  });
}); // This closes the /rented-rooms route properly

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

app.post("/archive", (req, res) => {
  const { rentingId, bookingId } = req.body; // Expecting bookingId to be passed, can be null

  // Use NULL instead of 0 for bookingId when there is no booking associated
  const query = "INSERT INTO Archive (Renting_ID, Booking_ID) VALUES (?, ?)";
  db.query(query, [rentingId, bookingId || null], (err, result) => {
    if (err) {
      console.error("Error adding renting ID to archive:", err);
      return res
        .status(500)
        .json({ error: "Error adding renting ID to archive" });
    }
    res.json({ message: "Renting ID added to archive successfully" });
  });
});

// Deleting a hotel
app.delete("/hotels/:hotelId", (req, res) => {
  const hotelId = req.params.hotelId;
  const query = "DELETE FROM Hotel WHERE Hotel_ID = ?";
  db.query(query, hotelId, (err, result) => {
    if (err) {
      console.error("Error deleting hotel:", err);
      return res.status(500).json({ error: "Error deleting hotel" });
    }
    res.json({ message: "Hotel deleted successfully" });
  });
}); // Correctly closed the delete hotel route handler

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

// Deleting a room
app.delete("/rooms/:roomID", (req, res) => {
  const roomID = req.params.roomID;
  const query = "DELETE FROM Room WHERE Room_ID = ?";
  db.query(query, roomID, (err, result) => {
    if (err) {
      console.error("Error deleting room:", err);
      return res.status(500).json({ error: "Error deleting room" });
    }
    res.json({ message: "Room deleted successfully" });
  });
});

// POST route for adding a new hotel
app.post("/hotels", (req, res) => {
  const newHotel = req.body;

  // Check if all required fields are present
  const requiredFields = [
    "Chain_Name",
    "Star_Rating",
    "Contact_Email",
    "Phone_Number",
    "Manager",
    "Street",
    "City",
    "Postal_Code",
    "Number_Of_Rooms",
  ];
  for (const field of requiredFields) {
    if (!newHotel[field]) {
      return res
        .status(400)
        .json({ error: `Missing required field: ${field}` });
    }
  }

  // Insert the new hotel into the database
  const query = "INSERT INTO Hotel SET ?";
  db.query(query, newHotel, (err, result) => {
    if (err) {
      console.error("Error adding hotel:", err);
      return res.status(500).json({ error: "Error adding hotel" });
    }
    newHotel.Hotel_ID = result.insertId;
    res.json(newHotel);
  });
});

// POST route for adding a new room
app.post("/rooms", (req, res) => {
  const newRoom = req.body;

  // Check if all required fields are present
  const requiredFields = [
    "Hotel_ID",
    "Price",
    "Capacity",
    "View_Type",
    "Amenities",
  ];
  for (const field of requiredFields) {
    if (!newRoom[field]) {
      return res
        .status(400)
        .json({ error: `Missing required field: ${field}` });
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
      console.error("Error adding room:", err);
      return res.status(500).json({ error: "Error adding room" });
    }
    newRoom.Room_ID = result.insertId;
    res.json(newRoom);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
