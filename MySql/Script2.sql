ALTER TABLE Room
ADD COLUMN booked TINYINT NOT NULL DEFAULT 0;

ALTER TABLE renting
ADD COLUMN Customer_ID INT;

ALTER TABLE renting
ADD CONSTRAINT fk_renting_customer
FOREIGN KEY (Customer_ID) REFERENCES customer(Customer_ID);

-- Adding Booking_ID column
ALTER TABLE room
ADD COLUMN Booking_ID INT;

-- Adding Renting_ID column
ALTER TABLE room
ADD COLUMN Renting_ID INT;

-- Adding foreign key constraint for Booking_ID
ALTER TABLE room
ADD CONSTRAINT fk_room_booking
FOREIGN KEY (Booking_ID) REFERENCES booking(Booking_ID);

-- Adding foreign key constraint for Renting_ID
ALTER TABLE room
ADD CONSTRAINT fk_room_renting
FOREIGN KEY (Renting_ID) REFERENCES renting(Renting_ID);

-- Adding Renting_ID column
ALTER TABLE booking
ADD COLUMN Room_ID INT;

-- Adding foreign key constraint for Renting_ID
ALTER TABLE booking
ADD CONSTRAINT fk_room_booked
FOREIGN KEY (Room_ID) REFERENCES room(Room_ID);