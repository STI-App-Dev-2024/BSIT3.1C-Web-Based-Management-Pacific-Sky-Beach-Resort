const roomsTable = `CREATE TABLE IF NOT EXISTS rooms(
    roomID VARCHAR(250) PRIMARY KEY, -- can be varchar
    roomName VARCHAR(100) NOT NULL,
    bedType VARCHAR(100) NOT NULL,
    bedQuantity INT NOT NULL,
    bathroomCount INT NOT NULL,
    capacity INT NOT NULL,
    rate DOUBLE NOT NULL,
    thumbnail VARCHAR(100) NOT NULL,
    status VARCHAR(100) NOT NULL CHECK(status='Draft'OR status ='Posted'),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`;

export default roomsTable
