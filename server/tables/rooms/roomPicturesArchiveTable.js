const roomPicturesArchiveTable = `CREATE TABLE IF NOT EXISTS roomsPicturesArchive (
    roomId VARCHAR(100),
    picture TEXT NOT NULL,
    archivedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- FOREIGN KEY (roomId) REFERENCES rooms(roomId)
    );`;

export default roomPicturesArchiveTable;