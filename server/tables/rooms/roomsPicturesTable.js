const roomsPicturesTable = `CREATE TABLE IF NOT EXISTS roomsPictures(
    roomId VARCHAR(100),
    picture TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    -- FOREIGN KEY (roomId) REFERENCES rooms(roomId)
    );`

export default roomsPicturesTable