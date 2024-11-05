const bathroomTypeTable = `CREATE TABLE IF NOT EXISTS bathroomType (
    bathroomTypeId VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    hasShower BOOLEAN NOT NULL,
    description TEXT
);`;

export default bathroomTypeTable;