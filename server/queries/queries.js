const positionsTableQuery = `CREATE TABLE IF NOT EXISTS positions(
positionID BIGINT PRIMARY KEY,
positionName VARCHAR(20) NOT NULL,
value BIGINT NOT NULL
);`

const usersManagementTableQuery =`CREATE TABLE IF NOT EXISTS usersManagement (
userId BIGINT AUTO_INCREMENT PRIMARY KEY,
firstName VARCHAR(100) NOT NULL,
lastName VARCHAR(100) NOT NULL,
emailAddress VARCHAR(100) NOT NULL,
password VARCHAR(100) NOT NULL,
thumbnail VARCHAR(255) NOT NULL,
mobileNumber BIGINT NOT NULL,
positionID BIGINT,
FOREIGN KEY (positionID) REFERENCES positions(positionID)
);`

const roomCollectionsTableQuery = `CREATE TABLE IF NOT EXISTS roomCollections(
roomID BIGINT PRIMARY KEY, -- can be varchar
roomName VARCHAR(100) NOT NULL,
bedType VARCHAR(100) NOT NULL,
bedQuantity INT NOT NULL,
bathroomCount INT NOT NULL,
capacity INT NOT NULL,
rate DOUBLE NOT NULL,
thumbnail VARCHAR(100) NOT NULL,
status VARCHAR(100) NOT NULL CHECK(status='Draft'OR status ='Posted')
);`

const bookedRoomCollectionsTableQuery = `CREATE TABLE IF NOT EXISTS bookedRoomCollections(
bookedRoomID BIGINT PRIMARY KEY,
roomID BIGINT,
customerID BIGINT,
startDate DATE NOT NULL,
endDate DATE NOT NULL,
FOREIGN KEY (roomID) REFERENCES roomCollections(roomID),
FOREIGN KEY (customerID) REFERENCES usersManagement(userId)
);`

const activitiesTableQuery = `CREATE TABLE IF NOT EXISTS activities(
activityID BIGINT PRIMARY KEY,
userID BIGINT,
activityName VARCHAR(100) NOT NULL,
thumbnail VARCHAR (100) NOT NULL,
rate DOUBLE NOT NULL,
status VARCHAR(100) NOT NULL CHECK(status='Draft'OR status ='Posted')
);
 `