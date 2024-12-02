const bookedRoomsTable = `CREATE TABLE IF NOT EXISTS bookedRooms(
    bookingId VARCHAR(250) PRIMARY KEY,
    roomId VARCHAR(250) NOT NULL,
    customerId VARCHAR(250) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    isReserved BOOLEAN DEFAULT FALSE,
    -- FOREIGN KEY (roomId) REFERENCES rooms(roomId),
    -- FOREIGN KEY (customerId) REFERENCES customers(customerId),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`;

export default bookedRoomsTable;