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

app.get("/rooms", (req, res) => {
    const query = "SELECT * FROM Room";
    db.query(query, (err, data) => {
        if (err) {
            console.error('Error fetching hotels:', err);
            return res.status(500).json({ error: 'Error fetching hotels' });
        }
        res.json(data);
    });
});

app.get("/available-rooms", (req, res) => {
    let { startDate, endDate, capacity, area, hotelChain, category, priceRange } = req.query;

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

    
    let queryParams = [startDate, endDate, startDate, endDate, startDate, endDate, startDate, endDate];

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
            console.error('Error fetching available rooms:', err);
            return res.status(500).json({ error: 'Error fetching available rooms' });
        }
        res.json(rooms);
    });
});

app.get("/areas", (req, res) => {
    const query = "SELECT DISTINCT City FROM Hotel ORDER BY City ASC";
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching areas:', err);
            return res.status(500).json({ error: 'Error fetching areas' });
        }
        const areas = result.map(item => item.City);
        res.json(areas);
    });
});

app.get('/hotel-chains', (req, res) => {
    const query = 'SELECT DISTINCT Chain_Name FROM Hotel ORDER BY Chain_Name;';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching hotel chains:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        const chains = result.map(row => row.Chain_Name);
        res.json(chains);
    });
});

app.post('/book-room', async (req, res) => {
    console.log("Request body:", req.body);

    const { roomId, checkInDate, checkOutDate } = req.body;

    if (!roomId || !checkInDate || !checkOutDate) {
        return res.status(400).json({ error: "Missing roomId, checkInDate, or checkOutDate in the request body." });
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
  
      
      db.query(insertBookingSQL, [roomId, checkInDate, checkOutDate], (error, results) => {
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
              res.json({ bookingId: bookingId, message: 'Booking and archiving successful' });
            });
          });
        });
      });
    } catch (err) {
      console.error('Failed to book room:', err);
      res.status(500).send('Failed to book room');
    }
  });  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
