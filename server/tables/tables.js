import usersTable from './usersTable.js';
import roomsTable from './roomsTable.js';
import roomsPictures from './roomsPicturesTable.js';

const tables = async (dbConnection) => {
  const queries = [
    usersTable,
    roomsTable,
    roomsPictures
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
