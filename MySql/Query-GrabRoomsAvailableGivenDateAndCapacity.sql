SELECT 
    Room.Capacity, 
    Room.Price, 
    Hotel.Chain_Name, 
    CONCAT(Hotel.Street, ', ', Hotel.City, ', ', Hotel.Postal_Code) AS Address, 
    Room.View_Type, 
    Room.Amenities
FROM Room
JOIN Hotel ON Room.Hotel_ID = Hotel.Hotel_ID
LEFT JOIN Renting ON Room.Room_ID = Renting.Room_ID 
    AND (
        (Renting.Check_In_Date <= '2024-04-10' AND Renting.Check_Out_Date >= '2024-04-01')
        OR Renting.Room_ID IS NULL
    )
WHERE NOT EXISTS (
    SELECT 1
    FROM Renting
    WHERE Renting.Room_ID = Room.Room_ID
    AND Renting.Check_In_Date <= '2024-04-10'
    AND Renting.Check_Out_Date >= '2024-04-01'
)
AND Room.Capacity >= 2  -- Filter by capacity
GROUP BY Room.Room_ID, Hotel.Chain_Name, Hotel.Street, Hotel.City, Hotel.Postal_Code, Room.Capacity, Room.Price, Room.View_Type, Room.Amenities
ORDER BY Room.Capacity, Room.Price, Hotel.Chain_Name, Address, Room.View_Type, Room.Amenities;
