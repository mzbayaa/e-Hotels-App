SELECT 
    RoomDetails.Chain_Name,
    RoomDetails.Address,
    RoomDetails.View_Type,
    RoomDetails.Capacity,
    RoomDetails.Price
FROM (
    SELECT 
        Hotel.Chain_Name,
        CONCAT(Hotel.Street, ', ', Hotel.City, ', ', Hotel.Postal_Code) AS Address,
        Room.View_Type,
        Room.Capacity,
        Room.Price
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
    GROUP BY Hotel.Chain_Name, Address, Room.View_Type, Room.Capacity, Room.Price
) AS RoomDetails
ORDER BY RoomDetails.Price ASC;

