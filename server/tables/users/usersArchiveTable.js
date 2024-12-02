const usersArchiveTable = `
    CREATE TABLE IF NOT EXISTS usersArchive (
    userId VARCHAR(250) PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    emailAddress VARCHAR(100) UNIQUE NOT NULL ,
    password VARCHAR(100) NOT NULL,
    avatar VARCHAR(255) NOT NULL,
    position VARCHAR(100) NOT NULL,
    mobileNumber BIGINT,
    bio TEXT,
    createdAt DATETIME,
    updatedAt DATETIME,
    archivedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP )`;

export default usersArchiveTable