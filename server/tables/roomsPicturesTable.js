const roomsPicturesTable = `CREATE TABLE IF NOT EXISTS roomsPictures(
    roomPictureID BIGINT PRIMARY KEY,
    pictureName VARCHAR(100),
    pictureLink VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`

export default roomsPicturesTable