const userPositionsTable = `CREATE TABLE IF NOT EXISTS userPositions (
  userId VARCHAR(250),
  positionID VARCHAR(255),
  PRIMARY KEY (userId, positionID),
  FOREIGN KEY (userId) REFERENCES users(userId),
  FOREIGN KEY (positionID) REFERENCES positions(positionID)
);`;

export default userPositionsTable