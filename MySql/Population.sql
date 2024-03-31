-- Insert hotel chains
INSERT INTO Hotel_Chain (Name, Street, City, Postal_Code, Number_Of_Hotels, Email_Address, Phone_Number)
VALUES
    ('Sunrise Stay', '100 Sunshine Blvd', 'Las Vegas', '89101', 8, 'contact@sunrisestay.com', '702-100-2000'),
    ('Moonlight Inns', '200 Lunar Ln', 'San Francisco', '94105', 8, 'info@moonlightinns.com', '415-200-3000'),
    ('Starlight Hotels', '300 Star Rd', 'New York', '10001', 8, 'service@starlighthotels.com', '212-300-4000'),
    ('Oceanview Resorts', '400 Ocean Dr', 'Miami', '33139', 8, 'help@oceanviewresorts.com', '305-400-5000'),
    ('Mountain High Lodges', '500 Summit Peak', 'Denver', '80201', 8, 'support@mountainhighlodges.com', '720-500-6000');
    
INSERT INTO Hotel_Chain (Name, Street, City, Postal_Code, Number_Of_Hotels, Email_Address, Phone_Number)
VALUES
    ('Sunrise Stay', '100 Sunshine Blvd', 'Las Vegas', '89101', 8, 'contact@sunrisestay.com', '702-100-2000');
    
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
    
    