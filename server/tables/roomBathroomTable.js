const roomBathroomTable = `CREATE TABLE IF NOT EXISTS roomBathroom (
    roomId VARCHAR(255),
    bathroomTypeId VARCHAR(255),
    count INT NOT NULL
);`;

export default roomBathroomTable