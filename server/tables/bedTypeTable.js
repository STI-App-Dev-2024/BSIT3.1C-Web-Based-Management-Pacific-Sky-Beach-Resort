const bedTypeTable = `CREATE TABLE IF NOT EXISTS bedType (
        bedTypeId VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        pillowCount INT NOT NULL,
        blanketCount INT NOT NULL,
        description TEXT
    );`;

    export default bedTypeTable;