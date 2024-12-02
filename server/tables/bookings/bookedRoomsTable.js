const bookedRoomsTable = `CREATE TABLE IF NOT EXISTS bookedRooms(
    bookingId VARCHAR(250) PRIMARY KEY,
    roomId VARCHAR(250) NOT NULL,
    customerId VARCHAR(250) NOT NULL,
    startDate VARCHAR(250) NOT NULL,
    endDate VARCHAR(250) NOT NULL,
    reservationProof VARCHAR(250) NOT NULL,
    isReserved BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`;

export default bookedRoomsTable;