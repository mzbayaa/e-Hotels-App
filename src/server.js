const express = require("express");
const mysql = require("mysql");

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
