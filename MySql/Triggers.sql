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

DELETE FROM hotel_chain WHERE Name='Sunrise Stay'

-- Delete all rooms and employees associated that work at 
DELIMITER //
CREATE TRIGGER hotel_deleted
AFTER DELETE ON hotel
FOR EACH ROW
BEGIN
	DELETE FROM hotel WHERE Chain_Name = OLD.NAME;
END;
//
DELIMITER ;

