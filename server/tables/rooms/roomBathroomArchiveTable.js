const roomBathroomArchiveTable = `CREATE TABLE IF NOT EXISTS roomBathroomArchive (
    roomId VARCHAR(255),
    bathRoomType VARCHAR(255),
    count INT NOT NULL
);`;

export default roomBathroomArchiveTable