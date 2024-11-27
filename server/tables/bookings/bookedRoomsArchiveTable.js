const bookedRoomsArchiveTable = `CREATE TABLE IF NOT EXISTS bookedRoomsArchive (
    bookingId VARCHAR(250) PRIMARY KEY,
    roomId VARCHAR(250) NOT NULL,
    customerId VARCHAR(250) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    FOREIGN KEY (roomId) REFERENCES rooms(roomId),
    FOREIGN KEY (customerId) REFERENCES customers(customerId),
    archiveDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

export default bookedRoomsArchiveTable;