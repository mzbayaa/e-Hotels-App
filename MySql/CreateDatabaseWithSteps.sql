-- 1. To Create the database and use it
CREATE DATABASE eHotels;
USE eHotels;

-- 2. Create Hotel Chain Table
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

-- 3. Insert hotel chains
INSERT INTO Hotel_Chain (Name, Street, City, Postal_Code, Number_Of_Hotels, Email_Address, Phone_Number)
VALUES
    ('Sunrise Stay', '100 Sunshine Blvd', 'Las Vegas', '89101', 8, 'contact@sunrisestay.com', '702-100-2000'),
    ('Moonlight Inns', '200 Lunar Ln', 'San Francisco', '94105', 8, 'info@moonlightinns.com', '415-200-3000'),
    ('Starlight Hotels', '300 Star Rd', 'New York', '10001', 8, 'service@starlighthotels.com', '212-300-4000'),
    ('Oceanview Resorts', '400 Ocean Dr', 'Miami', '33139', 8, 'help@oceanviewresorts.com', '305-400-5000'),
    ('Mountain High Lodges', '500 Summit Peak', 'Denver', '80201', 8, 'support@mountainhighlodges.com', '720-500-6000');

-- 4. Create Hotel Chain Table
CREATE TABLE Hotel (
    Hotel_ID INT AUTO_INCREMENT,
    Chain_Name VARCHAR(255) NOT NULL,
    -- Hotel-specific attributes
    Number_Of_Rooms INT UNSIGNED NOT NULL,
    Star_Rating INT UNSIGNED NOT NULL,
    Contact_Email VARCHAR(254) NOT NULL,
    Phone_Number VARCHAR(20) NOT NULL,
    Manager VARCHAR(255) NOT NULL,
    Street VARCHAR(255) NOT NULL,
    City VARCHAR(100) NOT NULL,
    Postal_Code VARCHAR(20) NOT NULL,
    PRIMARY KEY (Hotel_ID),
    FOREIGN KEY (Chain_Name) REFERENCES Hotel_Chain(Name)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- 5. Insert Hotels
INSERT INTO Hotel (Chain_Name, Number_Of_Rooms, Star_Rating, Contact_Email, Phone_Number, Manager, Street, City, Postal_Code)
VALUES
    ('Sunrise Stay', 120, 5, 'luxury@sunrisevegas.com', '702-101-2001', 'Alice Johnson', '101 Casino Blvd', 'Las Vegas', '89109'),
    ('Sunrise Stay', 80, 3, 'budget@sunrisevegas.com', '702-101-2002', 'Bob Marley', '103 Casino Blvd', 'Las Vegas', '89109'),
    ('Sunrise Stay', 100, 4, 'comfort@sunrisevegas.com', '702-101-2003', 'Carol King', '250 Desert Lane', 'Las Vegas', '89121'),
    ('Sunrise Stay', 150, 5, 'elite@sunrisereno.com', '775-101-2004', 'Dave Brubeck', '400 Sierra Rd', 'Reno', '89501'),
    ('Sunrise Stay', 70, 3, 'economy@sunrisereno.com', '775-101-2005', 'Elton John', '402 Sierra Rd', 'Reno', '89501'),
    ('Sunrise Stay', 90, 4, 'business@sunriselv.com', '702-101-2006', 'Frank Sinatra', '550 Vegas Strip', 'Las Vegas', '89119'),
    ('Sunrise Stay', 130, 5, 'premier@sunriselv.com', '702-101-2007', 'Gloria Gaynor', '552 Vegas Strip', 'Las Vegas', '89119'),
    ('Sunrise Stay', 60, 2, 'standard@sunrisehenderson.com', '702-101-2008', 'Harry Connick Jr', '100 Horizon Way', 'Henderson', '89012');

INSERT INTO Hotel (Chain_Name, Number_Of_Rooms, Star_Rating, Contact_Email, Phone_Number, Manager, Street, City, Postal_Code)
VALUES
    ('Moonlight Inns', 85, 4, 'deluxe@moonlightsf.com', '415-202-3001', 'Isaac Hayes', '200 Bay St', 'San Francisco', '94133'),
    ('Moonlight Inns', 55, 2, 'modest@moonlightoak.com', '510-202-3002', 'Joni Mitchell', '320 Oak Rd', 'Oakland', '94607'),
    ('Moonlight Inns', 95, 5, 'luxury@moonlightsf.com', '415-202-3003', 'Kenny Loggins', '202 Bay St', 'San Francisco', '94133'),
    ('Moonlight Inns', 65, 3, 'standard@moonlightberkeley.com', '510-202-3004', 'Linda Ronstadt', '450 University Ave', 'Berkeley', '94703'),
    ('Moonlight Inns', 75, 3, 'comfort@moonlightsanjose.com', '408-202-3005', 'Michael McDonald', '500 Tech Blvd', 'San Jose', '95112'),
    ('Moonlight Inns', 120, 5, 'elite@moonlightsf.com', '415-202-3006', 'Nina Simone', '204 Bay St', 'San Francisco', '94133'),
    ('Moonlight Inns', 80, 4, 'business@moonlightoak.com', '510-202-3007', 'Otis Redding', '322 Oak Rd', 'Oakland', '94607'),
    ('Moonlight Inns', 70, 2, 'economy@moonlightberkeley.com', '510-202-3008', 'Patti LaBelle', '452 University Ave', 'Berkeley', '94703');

INSERT INTO Hotel (Chain_Name, Number_Of_Rooms, Star_Rating, Contact_Email, Phone_Number, Manager, Street, City, Postal_Code)
VALUES
    ('Starlight Hotels', 130, 5, 'prestige@starlightny.com', '212-303-4001', 'Quincy Jones', '500 Broadway', 'New York', '10012'),
    ('Starlight Hotels', 110, 4, 'executive@starlightny.com', '212-303-4002', 'Ray Charles', '502 Broadway', 'New York', '10012'),
    ('Starlight Hotels', 90, 3, 'standard@starlightbrooklyn.com', '718-303-4003', 'Sara Bareilles', '750 King St', 'Brooklyn', '11211'),
    ('Starlight Hotels', 70, 2, 'economy@starlightqueens.com', '347-303-4004', 'Tony Bennett', '600 Queens Blvd', 'Queens', '11374'),
    ('Starlight Hotels', 150, 5, 'luxury@starlightny.com', '212-303-4005', 'Usher', '505 Broadway', 'New York', '10012'),
    ('Starlight Hotels', 80, 4, 'comfort@starlightny.com', '212-303-4006', 'Vince Gill', '510 Broadway', 'New York', '10012'),
    ('Starlight Hotels', 65, 3, 'cozy@starlightbuffalo.com', '716-303-4007', 'Willie Nelson', '900 Buffalo Rd', 'Buffalo', '14220'),
    ('Starlight Hotels', 120, 5, 'elite@starlightbuffalo.com', '716-303-4008', 'Xavier Rudd', '902 Buffalo Rd', 'Buffalo', '14220');

INSERT INTO Hotel (Chain_Name, Number_Of_Rooms, Star_Rating, Contact_Email, Phone_Number, Manager, Street, City, Postal_Code)
VALUES
    ('Oceanview Resorts', 140, 5, 'paradise@oceanviewmiami.com', '305-404-5001', 'Yolanda Adams', '800 Ocean Dr', 'Miami', '33139'),
    ('Oceanview Resorts', 100, 4, 'seaside@oceanviewmiami.com', '305-404-5002', 'Zac Brown', '802 Ocean Dr', 'Miami', '33139'),
    ('Oceanview Resorts', 75, 3, 'marine@oceanviewftl.com', '954-404-5003', 'Aaron Neville', '500 Beachway Ave', 'Fort Lauderdale', '33301'),
    ('Oceanview Resorts', 60, 2, 'harbor@oceanviewkeywest.com', '305-404-5004', 'Britney Spears', '250 Duval St', 'Key West', '33040'),
    ('Oceanview Resorts', 130, 5, 'luxury@oceanviewmiami.com', '305-404-5005', 'Carlos Santana', '805 Ocean Dr', 'Miami', '33139'),
    ('Oceanview Resorts', 85, 4, 'deluxe@oceanviewftl.com', '954-404-5006', 'Diana Krall', '505 Beachway Ave', 'Fort Lauderdale', '33301'),
    ('Oceanview Resorts', 95, 3, 'standard@oceanviewkeywest.com', '305-404-5007', 'Elvis Costello', '255 Duval St', 'Key West', '33040'),
    ('Oceanview Resorts', 55, 2, 'budget@oceanviewmiami.com', '305-404-5008', 'Fiona Apple', '810 Ocean Dr', 'Miami', '33139');

INSERT INTO Hotel (Chain_Name, Number_Of_Rooms, Star_Rating, Contact_Email, Phone_Number, Manager, Street, City, Postal_Code)
VALUES
    ('Mountain High Lodges', 120, 5, 'summit@mountainhighdenver.com', '720-505-6001', 'Glen Campbell', '100 Mountain Rd', 'Denver', '80202'),
    ('Mountain High Lodges', 80, 3, 'basecamp@mountainhighdenver.com', '720-505-6002', 'Hank Williams', '105 Mountain Rd', 'Denver', '80202'),
	('Mountain High Lodges', 90, 4, 'ridge@mountainhighboulder.com', '303-505-6003', 'Iris DeMent', '200 Boulder Way', 'Boulder', '80302'),
    ('Mountain High Lodges', 70, 3, 'trail@mountainhighvail.com', '970-505-6004', 'Johnny Cash', '150 Ski Slope Rd', 'Vail', '81657'),
    ('Mountain High Lodges', 150, 5, 'peak@mountainhighaspen.com', '970-505-6005', 'Kacey Musgraves', '300 Aspen Mountain Rd', 'Aspen', '81611'),
    ('Mountain High Lodges', 65, 2, 'valley@mountainhighaspen.com', '970-505-6006', 'Lyle Lovett', '305 Aspen Mountain Rd', 'Aspen', '81611'),
    ('Mountain High Lodges', 110, 4, 'cliff@mountainhighvail.com', '970-505-6007', 'Margo Price', '155 Ski Slope Rd', 'Vail', '81657'),
    ('Mountain High Lodges', 50, 2, 'stream@mountainhighboulder.com', '303-505-6008', 'Neil Young', '205 Boulder Way', 'Boulder', '80302'),
    ('Mountain High Lodges', 130, 5, 'summit@mountainhighvail.com', '970-505-6009', 'Patsy Cline', '160 Ski Slope Rd', 'Vail', '81657'),
    ('Mountain High Lodges', 85, 3, 'forest@mountainhighdenver.com', '720-505-6010', 'Quentin Tarantino', '110 Mountain Rd', 'Denver', '80202');


-- 6. Create Room Table
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

-- 7. SQL Insert Statements for Hotel Rooms
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (1, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (1, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (1, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (1, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (1, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (2, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (2, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (2, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (2, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (2, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (3, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (3, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (3, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (3, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (3, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (4, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (4, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (4, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (4, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (4, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (5, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (5, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (5, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (5, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (5, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (6, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (6, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (6, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (6, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (6, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (7, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (7, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (7, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (7, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (7, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (8, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (8, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (8, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (8, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (8, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (9, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (9, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (9, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (9, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (9, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (10, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (10, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (10, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (10, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (10, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (11, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (11, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (11, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (11, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (11, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (12, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (12, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (12, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (12, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (12, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (13, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (13, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (13, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (13, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (13, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (14, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (14, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (14, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (14, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (14, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (15, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (15, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (15, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (15, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (15, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (16, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (16, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (16, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (16, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (16, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (17, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (17, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (17, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (17, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (17, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (18, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (18, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (18, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (18, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (18, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (19, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (19, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (19, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (19, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (19, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (20, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (20, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (20, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (20, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (20, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (21, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (21, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (21, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (21, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (21, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (22, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (22, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (22, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (22, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (22, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (23, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (23, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (23, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (23, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (23, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (24, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (24, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (24, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (24, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (24, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (25, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (25, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (25, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (25, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (25, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (26, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (26, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (26, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (26, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (26, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (27, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (27, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (27, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (27, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (27, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (28, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (28, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (28, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (28, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (28, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (29, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (29, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (29, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (29, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (29, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (30, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (30, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (30, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (30, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (30, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (31, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (31, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (31, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (31, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (31, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (32, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (32, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (32, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (32, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (32, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (33, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (33, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (33, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (33, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (33, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (34, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (34, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (34, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (34, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (34, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (35, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (35, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (35, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (35, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (35, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (36, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (36, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (36, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (36, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (36, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (37, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (37, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (37, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (37, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (37, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (38, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (38, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (38, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (38, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (38, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (39, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (39, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (39, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (39, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (39, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (40, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (40, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (40, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (40, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (40, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (41, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (41, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (41, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (41, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (41, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (42, 120, 1, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (42, 140, 2, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (42, 160, 3, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (42, 180, 4, 'City View', FALSE, '', 'WiFi, TV, Air Conditioning');
INSERT INTO Room (Hotel_ID, Price, Capacity, View_Type, Is_Extendible, Problems, Amenities) VALUES (42, 200, 5, 'Sea View', TRUE, '', 'WiFi, TV, Air Conditioning, Mini-bar');

-- 8. Adjust Room table
ALTER TABLE Room
ADD COLUMN booked TINYINT NOT NULL DEFAULT 0;

-- 9. Create Person Table
CREATE TABLE Person (
    Person_ID INT AUTO_INCREMENT PRIMARY KEY,
    First_Name VARCHAR(255) NOT NULL,
    Last_Name VARCHAR(255) NOT NULL,
    Street VARCHAR(255),
    City VARCHAR(100),
    Postal_Code VARCHAR(20)
);

-- 10 Insert People
INSERT INTO person (First_Name, Last_Name, Street, City, Postal_Code)
VALUES 
('Alice', 'Johnson', '101 Casino Blvd', 'Las Vegas', '89109'),
('Bob', 'Marley', '103 Reggae Street', 'Miami', '33101'),
('Carol', 'King', '202 Tapestry Lane', 'Los Angeles', '90001'),
('Dave', 'Brubeck', '304 Jazz Ave', 'San Francisco', '94102'),
('Elton', 'John', '405 Rocket Man Rd', 'New York', '10001'),
('Frank', 'Sinatra', '506 Blue Eyes Way', 'Hoboken', '07030'),
('Gloria', 'Gaynor', '707 Survivor St', 'Newark', '07101'),
('Harry', 'Connick Jr', '808 Crooner Ct', 'New Orleans', '70112'),
('Isaac', 'Hayes', '909 Shaft St', 'Memphis', '38103'),
('Joni', 'Mitchell', '101 Big Yellow Taxi Ln', 'Seattle', '98101'),
('Kenny', 'Loggins', '202 Danger Zone Rd', 'Los Angeles', '90002'),
('Linda', 'Ronstadt', '303 Desperado Drive', 'Tucson', '85701'),
('Michael', 'McDonald', '404 Yacht Club Way', 'St. Louis', '63101'),
('Nina', 'Simone', '505 High Priestess Ln', 'Baltimore', '21201'),
('Otis', 'Redding', '606 Dock of the Bay', 'Macon', '31201'),
('Patti', 'LaBelle', '707 Lady Marmalade Dr', 'Philadelphia', '19101'),
('Quincy', 'Jones', '808 Q St', 'Chicago', '60601'),
('Ray', 'Charles', '909 Georgia on My Mind Ave', 'Albany', '31701'),
('Sara', 'Bareilles', '101 Brave Ln', 'Eureka', '95501'),
('Tony', 'Bennett', '202 Left My Heart St', 'San Francisco', '94109'),
('Usher', '', '303 Confessions Blvd', 'Atlanta', '30301'),
('Vince', 'Gill', '404 Guitar St', 'Nashville', '37201'),
('Willie', 'Nelson', '505 On the Road Again Ave', 'Austin', '78701'),
('Xavier', 'Rudd', '606 Spirit Bird Ln', 'Asheville', '28801'),
('Yolanda', 'Adams', '707 Gospel Queen Quay', 'Houston', '77001'),
('Zac', 'Brown', '808 Chicken Fried Rd', 'Atlanta', '30302'),
('Aaron', 'Neville', '909 Tell It Like It Is Terrace', 'New Orleans', '70115'),
('Britney', 'Spears', '101 Pop Princess Path', 'Kentwood', '70444'),
('Carlos', 'Santana', '202 Smooth Ave', 'San Francisco', '94110'),
('Diana', 'Krall', '303 Jazz Pianist Pl', 'Nanaimo', 'V9R 1E3'), 
('Elvis', 'Costello', '404 Watching the Detectives', 'London', 'EC3A 1'),
('Fiona', 'Apple', '505 Criminal Way', 'New York', '10003'),
('Glen', 'Campbell', '606 Rhinestone Cowboy Rd', 'Delight', '71940'),
('Hank', 'Williams', '707 Lost Highway', 'Montgomery', '36101'),
('Iris', 'DeMent', '808 Our Town Rd', 'Paragould', '72450'),
('Johnny', 'Cash', '909 Man in Black Blvd', 'Kingsland', '71652'),
('Kacey', 'Musgraves', '101 Golden Hour St', 'Mineola', '75773'),
('Lyle', 'Lovett', '202 Large Band Blvd', 'Klein', '77379'),
('Margo', 'Price', '303 Midwest Farmer\'s Daughter Dr', 'Aledo', '61231'),
('Neil', 'Young', '404 Harvest Moon Ave', 'Toronto', 'M4B 1B3'),
('Patsy', 'Cline', '505 Crazy Ave', 'Winchester', '22601'),
('Quentin', 'Tarantino', '606 Pulp Fiction Ln', 'Knoxville', '37901');


-- 11 Create Customer
CREATE TABLE Customer (
    Customer_ID INT AUTO_INCREMENT PRIMARY KEY,
    Person_ID INT NOT NULL,
    Registration_Date DATE NOT NULL,
    FOREIGN KEY (Person_ID) REFERENCES Person(Person_ID)
);

-- 12 Create Employee
CREATE TABLE Employee (
    Employee_ID INT AUTO_INCREMENT PRIMARY KEY,
    Person_ID INT,
    Role VARCHAR(100),
    Supervisor_ID INT,
    FOREIGN KEY (Person_ID) REFERENCES Person(Person_ID),
    FOREIGN KEY (Supervisor_ID) REFERENCES Employee(Employee_ID)
        ON DELETE SET NULL
);

-- 13 Insert Employees
INSERT INTO employee (Person_ID, Role)
VALUES 
(1, 'Manager'),
(2, 'Manager'),
(3, 'Manager'),
(4, 'Manager'),
(5, 'Manager'),
(6, 'Manager'),
(7, 'Manager'),
(8, 'Manager'),
(9, 'Manager'),
(10, 'Manager'),
(11, 'Manager'),
(12, 'Manager'),
(13, 'Manager'),
(14, 'Manager'),
(15, 'Manager'),
(16, 'Manager'),
(17, 'Manager'),
(18, 'Manager'),
(19, 'Manager'),
(20, 'Manager'),
(21, 'Manager'),
(22, 'Manager'),
(23, 'Manager'),
(24, 'Manager'),
(25, 'Manager'),
(26, 'Manager'),
(27, 'Manager'),
(28, 'Manager'),
(29, 'Manager'),
(30, 'Manager'),
(31, 'Manager'),
(32, 'Manager'),
(33, 'Manager'),
(34, 'Manager'),
(35, 'Manager'),
(36, 'Manager'),
(37, 'Manager'),
(38, 'Manager'),
(39, 'Manager'),
(40, 'Manager'),
(41, 'Manager'),
(42, 'Manager');

-- 14 Create Renting
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

-- 15 Adjust Renting
ALTER TABLE renting
ADD COLUMN Customer_ID INT;

ALTER TABLE renting
ADD CONSTRAINT fk_renting_customer
FOREIGN KEY (Customer_ID) REFERENCES customer(Customer_ID);

-- 16 Create Booking Table
CREATE TABLE Booking (
    Booking_ID INT AUTO_INCREMENT PRIMARY KEY,
    Customer_ID INT NOT NULL,
    Date_Of_Booking DATE NOT NULL,
    Date_Of_Stay DATE NOT NULL,
    FOREIGN KEY (Customer_ID) REFERENCES Customer(Customer_ID)
);

-- 17 Adjust Room Table
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

-- 18 Adjust Booking Table
-- Adding Renting_ID column
ALTER TABLE booking
ADD COLUMN Room_ID INT;

-- Adding foreign key constraint for Renting_ID
ALTER TABLE booking
ADD CONSTRAINT fk_room_booked
FOREIGN KEY (Room_ID) REFERENCES room(Room_ID);


-- 19 Create Remaining Tables
CREATE TABLE Occupies (
    Renting_ID INT NOT NULL,
    Room_ID INT NOT NULL,
    PRIMARY KEY (Renting_ID, Room_ID),
    FOREIGN KEY (Renting_ID) REFERENCES Renting(Renting_ID)
        ON DELETE CASCADE,
    FOREIGN KEY (Room_ID) REFERENCES Room(Room_ID)
        ON DELETE CASCADE
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

-- 20 Adjust Bookings Table
ALTER TABLE booking
ADD COLUMN Check_In_Date DATE NOT NULL,
ADD COLUMN Check_Out_Date DATE NOT NULL;

-- 21 Create Views
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


-- 22 Create Indexes
CREATE INDEX idx_hotel_chain_name ON hotel_chain(Name);

CREATE INDEX idx_hotel_id ON hotel(Hotel_ID);

CREATE INDEX idx_booking_dates ON bookings(Check_In_Date, Check_Out_Date);

-- 23 Create Triggers
-- Delete all hotel chains associated with hotel chain if hotel chain was deleted
DELIMITER //
CREATE TRIGGER delete_hotels_on_chain_delete
AFTER DELETE ON hotel_chain
FOR EACH ROW
BEGIN
	DELETE FROM hotel WHERE Chain_Name = OLD.NAME;
END;
//
DELIMITER ;

-- Delete all employees and customers associated with a deleted person 
DELIMITER //

CREATE TRIGGER person_deleted
AFTER DELETE ON person
FOR EACH ROW
BEGIN
    DELETE FROM employee WHERE Person_ID = OLD.Person_ID;
    DELETE FROM customer WHERE Person_ID = OLD.Person_ID;
END;

//
DELIMITER ;

-- Delete all rooms associated that work at a deleted hotel
DELIMITER //
CREATE TRIGGER hotel_deleted
AFTER DELETE ON hotel
FOR EACH ROW
BEGIN
	DELETE FROM Room WHERE Hotel_ID = OLD.Hotel_ID;
END;
//
DELIMITER ;

-- 24 User Connection password
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;