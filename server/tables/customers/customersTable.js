const customersTable = `CREATE TABLE IF NOT EXISTS customers(
    customerId VARCHAR(250) PRIMARY KEY,
    customerFirstName VARCHAR(100) NOT NULL,
    customerLastName VARCHAR(100) NOT NULL,
    customerEmail VARCHAR(100) NOT NULL,
    customerPhone VARCHAR(100) NOT NULL,
    customerAddress VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`;

export default customersTable