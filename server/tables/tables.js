import usersTable from './users/usersTable.js';
import roomsTable from './rooms/roomsTable.js';
import roomsPictures from './rooms/roomsPicturesTable.js';
import roomBedTable from './rooms/roomBedTable.js';
import roomBathroomTable from './rooms/roomBathroomTable.js';

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
