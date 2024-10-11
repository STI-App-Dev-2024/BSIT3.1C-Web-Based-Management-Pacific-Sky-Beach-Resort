const activitiesTable = `CREATE TABLE IF NOT EXISTS activities(
    activityID BIGINT PRIMARY KEY,
    userID BIGINT,
    activityName VARCHAR(100) NOT NULL,
    thumbnail VARCHAR (100) NOT NULL,
    rate DOUBLE NOT NULL,
    status VARCHAR(100) NOT NULL CHECK(status='Draft'OR status ='Posted'),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`;

export default {
  activitiesTableQuery
};
