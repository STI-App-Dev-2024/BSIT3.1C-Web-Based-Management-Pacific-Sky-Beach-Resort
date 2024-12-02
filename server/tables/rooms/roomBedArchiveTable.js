const roomBedArchiveTable =  `CREATE TABLE IF NOT EXISTS roomBedArchive (
    roomId VARCHAR(255),
    bedType VARCHAR(255) NOT NULL,
    count INT NOT NULL
);`;

export default roomBedArchiveTable