const contactPhoneNumberTable = `
CREATE TABLE IF NOT EXISTS contacts_mobile_numbers (
  contactId VARCHAR(250) NOT NULL,
  mobileNumber VARCHAR(250) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`;

export default contactPhoneNumberTable