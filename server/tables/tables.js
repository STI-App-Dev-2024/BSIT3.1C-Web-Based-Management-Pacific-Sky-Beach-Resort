import usersTable from './usersTable.js';
import roomsTable from './roomsTable.js';
import roomsPictures from './roomsPicturesTable.js';
import roomBedTable from './roomBedTable.js';
import roomBathroomTable from './roomBathroomTable.js';

const tables = async (dbConnection) => {
  const queries = [
    usersTable,
    roomsTable,
    roomsPictures,
    roomBedTable,
    roomBathroomTable,
  ];

  for (const query of queries) {
    try {
      await dbConnection.query(query);
    } catch (error) {
      console.error('Error creating table:', error);
    }
  }
};

export default tables;
