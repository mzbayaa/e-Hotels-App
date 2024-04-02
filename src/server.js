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

// Define your routes here
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

    // Ensure the queryParams array has the correct parameters for both Renting and Booking date checks
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


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
