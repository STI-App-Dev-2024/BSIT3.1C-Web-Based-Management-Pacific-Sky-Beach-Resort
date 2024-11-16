const roomsTable = `CREATE TABLE IF NOT EXISTS rooms(
    roomId VARCHAR(250) PRIMARY KEY, -- can be varchar
    userId VARCHAR(250) NOT NULL,
    roomName VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    roomType VARCHAR(250) NOT NULL,
    price DOUBLE NOT NULL,
    thumbnail VARCHAR(100) NOT NULL,
    isOccupied BOOLEAN NOT NULL DEFAULT false,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`;

export default roomsTable
