// users
import usersTable from './users/usersTable.js';
import usersArchiveTable from './users/usersArchiveTable.js';

// rooms
import roomsTable from './rooms/roomsTable.js';
import roomsPictures from './rooms/roomsPicturesTable.js';
import roomBedTable from './rooms/roomBedTable.js';
import roomBathroomTable from './rooms/roomBathroomTable.js';
import roomsArchiveTable from './rooms/roomsArchiveTable.js';
import roomBedArchiveTable from './rooms/roomBedArchiveTable.js';
import roomBathroomArchiveTable from './rooms/roomBathroomArchiveTable.js';
import roomsPicturesArchiveTable from './rooms/roomPicturesArchiveTable.js';

// appointments
import appointmentsTable from './appointments/appointmentsTable.js';
import appointmentsBlockedDatesTable from './appointments/appointmentsBlockedDatesTable.js';

// press-release
import pressReleaseTable from './press-release/pressReleaseTable.js';

// contacts
import contactsTable from './contacts/contactsTable.js'
import contactPhoneNumberTable from './contacts/contactPhoneNumberTable.js'

// bookings
import bookedRoomsTable from './bookings/bookedRoomsTable.js';
import bookedRoomsArchiveTable from './bookings/bookedRoomsArchiveTable.js';

//customers
import customersTable from './customers/customersTable.js'

const tables = async (dbConnection) => {
  const queries = [
    // users
    usersTable,
    usersArchiveTable,

    // rooms
    roomsTable,
    roomsPictures,
    roomBedTable,
    roomBathroomTable,
    roomsArchiveTable,
    roomsPicturesArchiveTable,
    roomBedArchiveTable,
    roomBathroomArchiveTable,

    // appointments
    appointmentsTable,
    appointmentsBlockedDatesTable,

    // press-release
    pressReleaseTable,

    // contacts
    contactsTable,
    contactPhoneNumberTable,

    // customers
    customersTable,

    // bookings
    bookedRoomsTable,
    bookedRoomsArchiveTable,
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
