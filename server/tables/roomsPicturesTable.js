const roomsPicturesTable = `CREATE TABLE IF NOT EXISTS roomsPictures(
    roomID VARCHAR(100),
    picture TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (roomID) REFERENCES rooms(roomID)
    );`

export default roomsPicturesTable