-- View 1
CREATE VIEW AvailableRoomsPerArea AS
SELECT h.City, COUNT(*) AS AvailableRooms
FROM Hotel h
JOIN Room r ON h.Hotel_ID = r.Hotel_ID
LEFT JOIN Renting rt ON r.Room_ID = rt.Room_ID
WHERE rt.Check_In_Date IS NULL OR rt.Check_Out_Date < CURRENT_DATE
GROUP BY h.City;

-- View 2
CREATE VIEW TotalCapacityPerHotel AS
SELECT Hotel_ID, SUM(Capacity) AS TotalCapacity
FROM Room
GROUP BY Hotel_ID;

-- View 2 Specific Hotel
-- View that combines hotel details with the total room capacity
CREATE VIEW SpecificHotelDetailsWithTotalCapacity AS
SELECT 
    Hotel.Hotel_ID,
    Hotel.Chain_Name,
    Hotel.Star_Rating,
    CONCAT(Hotel.Street, ', ', Hotel.City, ', ', Hotel.Postal_Code) AS Address,
    Hotel.Phone_Number,
    Hotel.Contact_Email,
    Hotel.Manager,
    TC.TotalCapacity
FROM Hotel
JOIN (
    SELECT Hotel_ID, SUM(Capacity) AS TotalCapacity
    FROM Room
    GROUP BY Hotel_ID
) AS TC ON Hotel.Hotel_ID = TC.Hotel_ID
WHERE Hotel.Hotel_ID = 41; -- Filtering for the specific hotel by ID
