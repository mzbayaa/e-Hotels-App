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
