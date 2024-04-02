CREATE DATABASE eHotels;
USE eHotels;

CREATE TABLE `Hotel_Chain` (
    `Name` VARCHAR(255) NOT NULL,
    `Street` VARCHAR(255) NOT NULL,
    `City` VARCHAR(100) NOT NULL,
    `Postal_Code` VARCHAR(20) NOT NULL,
    `Number_Of_Hotels` INT UNSIGNED NOT NULL,
    `Email_Address` VARCHAR(254) NOT NULL,
    `Phone_Number` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`Name`)
);

CREATE TABLE Hotel (
    Hotel_ID INT AUTO_INCREMENT,
    Chain_Name VARCHAR(255) NOT NULL,
    -- Hotel-specific attributes
    Number_Of_Rooms INT UNSIGNED NOT NULL,
    Star_Rating INT UNSIGNED NOT NULL,
    Contact_Email VARCHAR(254) NOT NULL,
    Phone_Number VARCHAR(20) NOT NULL,
    Manager VARCHAR(255) NOT NULL,
    PRIMARY KEY (Hotel_ID),
    FOREIGN KEY (Chain_Name) REFERENCES Hotel_Chain(Name)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

ALTER TABLE Hotel
ADD COLUMN Street VARCHAR(255) NOT NULL,
ADD COLUMN City VARCHAR(100) NOT NULL,
ADD COLUMN Postal_Code VARCHAR(20) NOT NULL;



CREATE TABLE Room (
    Room_ID INT AUTO_INCREMENT,
    Hotel_ID INT NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Capacity INT UNSIGNED NOT NULL,
    View_Type VARCHAR(255),
    Is_Extendible BOOLEAN,
    Problems TEXT,
    Amenities TEXT,
    PRIMARY KEY (Room_ID),
    FOREIGN KEY (Hotel_ID) REFERENCES Hotel(Hotel_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Renting (
    Renting_ID INT AUTO_INCREMENT,
    Room_ID INT NOT NULL,
    Check_In_Date DATE NOT NULL,
    Check_Out_Date DATE NOT NULL,
    PRIMARY KEY (Renting_ID),
    FOREIGN KEY (Room_ID) REFERENCES Room(Room_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Occupies (
    Renting_ID INT NOT NULL,
    Room_ID INT NOT NULL,
    PRIMARY KEY (Renting_ID, Room_ID),
    FOREIGN KEY (Renting_ID) REFERENCES Renting(Renting_ID)
        ON DELETE CASCADE,
    FOREIGN KEY (Room_ID) REFERENCES Room(Room_ID)
        ON DELETE CASCADE
);

CREATE TABLE Person (
    Person_ID INT AUTO_INCREMENT PRIMARY KEY,
    First_Name VARCHAR(255) NOT NULL,
    Last_Name VARCHAR(255) NOT NULL,
    Street VARCHAR(255),
    City VARCHAR(100),
    Postal_Code VARCHAR(20)
);

CREATE TABLE Employee (
    Employee_ID INT AUTO_INCREMENT PRIMARY KEY,
    Person_ID INT,
    Role VARCHAR(100),
    Supervisor_ID INT,
    FOREIGN KEY (Person_ID) REFERENCES Person(Person_ID),
    FOREIGN KEY (Supervisor_ID) REFERENCES Employee(Employee_ID)
        ON DELETE SET NULL
);

CREATE TABLE Customer (
    Customer_ID INT AUTO_INCREMENT PRIMARY KEY,
    Person_ID INT NOT NULL,
    Registration_Date DATE NOT NULL,
    FOREIGN KEY (Person_ID) REFERENCES Person(Person_ID)
);

CREATE TABLE Booking (
    Booking_ID INT AUTO_INCREMENT PRIMARY KEY,
    Customer_ID INT NOT NULL,
    Date_Of_Booking DATE NOT NULL,
    Date_Of_Stay DATE NOT NULL,
    FOREIGN KEY (Customer_ID) REFERENCES Customer(Customer_ID)
);

CREATE TABLE Reservation (
    Reservation_ID INT AUTO_INCREMENT PRIMARY KEY,
    Renting_ID INT NOT NULL,
    Booking_ID INT NOT NULL,
    Employee_ID INT NOT NULL,
    FOREIGN KEY (Renting_ID) REFERENCES Renting(Renting_ID),
    FOREIGN KEY (Booking_ID) REFERENCES Booking(Booking_ID),
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID)
);

CREATE TABLE Transform (
    Transform_ID INT AUTO_INCREMENT PRIMARY KEY,
    Renting_ID INT NOT NULL,
    Booking_ID INT NOT NULL,
    FOREIGN KEY (Renting_ID) REFERENCES Renting(Renting_ID),
    FOREIGN KEY (Booking_ID) REFERENCES Booking(Booking_ID)
);

CREATE TABLE Archive (
    Archive_ID INT AUTO_INCREMENT PRIMARY KEY,
    Booking_ID INT NOT NULL,
    Customer_ID INT NOT NULL,
    Renting_ID INT,
    FOREIGN KEY (Booking_ID) REFERENCES Booking(Booking_ID),
    FOREIGN KEY (Customer_ID) REFERENCES Customer(Customer_ID),
    FOREIGN KEY (Renting_ID) REFERENCES Renting(Renting_ID)
);

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

