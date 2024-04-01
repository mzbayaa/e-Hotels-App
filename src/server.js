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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
