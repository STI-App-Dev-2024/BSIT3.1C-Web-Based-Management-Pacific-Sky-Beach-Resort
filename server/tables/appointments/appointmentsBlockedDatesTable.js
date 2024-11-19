const appointmentsBlockedDatesTable = `
CREATE TABLE IF NOT EXISTS appointmentsBlockedDates (
  appointmentId VARCHAR(250) NOT NULL,
  blockedDate VARCHAR(250) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`;

export default appointmentsBlockedDatesTable