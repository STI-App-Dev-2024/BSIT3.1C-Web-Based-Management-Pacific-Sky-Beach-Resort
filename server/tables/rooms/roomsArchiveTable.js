const roomsArchiveTable = `CREATE TABLE IF NOT EXISTS roomsArchive(
    roomId VARCHAR(250) PRIMARY KEY, -- can be varchar
    userId VARCHAR(250) NOT NULL,
    roomName VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    roomType VARCHAR(250) NOT NULL,
    price DOUBLE NOT NULL,
    thumbnail VARCHAR(100) NOT NULL,
    isOccupied BOOLEAN NOT NULL DEFAULT false,
    description TEXT,
    hasWifi BOOLEAN NOT NULL DEFAULT false,
    hasKitchen BOOLEAN NOT NULL DEFAULT false,
    hasTV BOOLEAN NOT NULL DEFAULT false,
    hasShower BOOLEAN NOT NULL DEFAULT false,
    hasAircon BOOLEAN NOT NULL DEFAULT false,
    hasGrill BOOLEAN NOT NULL DEFAULT false,
    hasRefrigerator BOOLEAN NOT NULL DEFAULT false,
    hasHeater BOOLEAN NOT NULL DEFAULT false,
    archivedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

export default roomsArchiveTable;