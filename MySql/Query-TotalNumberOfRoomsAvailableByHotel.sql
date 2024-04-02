SELECT 
    COUNT(Room.Room_ID) AS TotalRooms,
    Hotel.Chain_Name,
    CONCAT(Hotel.Street, ', ', Hotel.City, ', ', Hotel.Postal_Code) AS Address, 
    Hotel.Star_Rating
FROM Hotel
JOIN Room ON Hotel.Hotel_ID = Room.Hotel_ID
GROUP BY Hotel.Hotel_ID, Hotel.Chain_Name, Hotel.Star_Rating, Address
ORDER BY TotalRooms DESC;
