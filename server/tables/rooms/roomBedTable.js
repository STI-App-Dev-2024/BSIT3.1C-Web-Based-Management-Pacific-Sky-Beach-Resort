const roomBedTable = `CREATE TABLE IF NOT EXISTS roomBed (
  roomId VARCHAR(255),
  bedType VARCHAR(255) NOT NULL,
  count INT NOT NULL
);`;

export default roomBedTable