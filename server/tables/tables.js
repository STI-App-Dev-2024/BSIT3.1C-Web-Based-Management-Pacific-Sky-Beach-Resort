// users
import usersTable from './users/usersTable.js';

// rooms
import roomsTable from './rooms/roomsTable.js';
import roomsPictures from './rooms/roomsPicturesTable.js';
import roomBedTable from './rooms/roomBedTable.js';
import roomBathroomTable from './rooms/roomBathroomTable.js';

// appointments
import appointmentsTable from './appointments/appointmentsTable.js';
import appointmentsBlockedDatesTable from './appointments/appointmentsBlockedDatesTable.js';

// press-release
import pressReleaseTable from './press-release/pressReleaseTable.js';

const tables = async (dbConnection) => {
  const queries = [
    // users
    usersTable,

    // rooms
    roomsTable,
    roomsPictures,
    roomBedTable,
    roomBathroomTable,

    // appointments
    appointmentsTable,
    appointmentsBlockedDatesTable,

    // press-release
    pressReleaseTable
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
