const bookedRoomCollectionsTable = `CREATE TABLE IF NOT EXISTS bookedRoomCollections(
    bookedRoomID BIGINT PRIMARY KEY,
    roomID BIGINT,
    customerID BIGINT,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    FOREIGN KEY (roomID) REFERENCES roomCollections(roomID),
    FOREIGN KEY (customerID) REFERENCES usersManagement(userId),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`;

export default {
  bookedRoomCollectionsTableQuery,
};
