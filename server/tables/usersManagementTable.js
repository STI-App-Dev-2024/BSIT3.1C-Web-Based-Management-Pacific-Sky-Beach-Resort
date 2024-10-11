const usersManagementTable = `CREATE TABLE IF NOT EXISTS usersManagement (
    userId BIGINT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    emailAddress VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    thumbnail VARCHAR(255) NOT NULL,
    mobileNumber BIGINT NOT NULL,
    positionID BIGINT,
    FOREIGN KEY (positionID) REFERENCES positions(positionID),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`;

export default {
  usersManagementTable
};
