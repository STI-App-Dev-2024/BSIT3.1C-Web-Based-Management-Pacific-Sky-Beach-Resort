const pressReleaseTable = `
CREATE TABLE IF NOT EXISTS press_release (
  pressReleaseId VARCHAR(250) PRIMARY KEY,
  title VARCHAR(250) NOT NULL,
  thumbnail VARCHAR(250) NOT NULL,
  content LONGTEXT NOT NULL,
  author VARCHAR(250) NOT NULL,
  authorPosition VARCHAR(250) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`;

export default pressReleaseTable