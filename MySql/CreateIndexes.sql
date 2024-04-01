CREATE INDEX idx_hotel_chain_name ON hotel_chain(Name);

CREATE INDEX idx_hotel_id ON hotel(Hotel_ID);

CREATE INDEX idx_booking_dates ON bookings(CheckInDate, CheckOutDate);
