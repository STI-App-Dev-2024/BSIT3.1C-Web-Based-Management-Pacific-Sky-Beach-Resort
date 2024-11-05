const roomBedTable = `CREATE TABLE IF NOT EXISTS roomBed (
  roomId VARCHAR(255),
  bedTypeId VARCHAR(255),
  count INT NOT NULL
);`;

export default roomBedTable