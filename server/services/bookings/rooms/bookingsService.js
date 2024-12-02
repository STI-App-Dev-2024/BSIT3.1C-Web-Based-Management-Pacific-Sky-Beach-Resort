import conn from '../../../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from '../../../utils/sendNodeMail.js';
import dateFormatter from '../../../utils/dateFormatter.js';
import emailReservationCustomer from '../../../templates/booking/rooms/emailReservationCustomer.js';
import emailReservationAdmin from '../../../templates/booking/rooms/emailReservationAdmin.js';
import { COMPANY_EMAIL_ADDRESS } from '../../../constants/constants.js';
import roomsService from '../../rooms/roomsService.js';
import emailUpdateStatus from '../../../templates/booking/rooms/emailUpdateStatus.js';

const pool = await conn();

const getAllBookings = async () => {
  try {
    const bookingsQuery = `
  SELECT b.bookingId, r.roomName, CONCAT(c.customerFirstName,' ',customerLastName) AS customerName,b.isReserved, b.startDate, b.endDate
  FROM bookedRooms b
  JOIN rooms r ON b.roomId = r.roomId
  JOIN customers c ON b.customerId = c.customerId
`;

    const [bookings] = await pool.query(bookingsQuery);

    return bookings;
  } catch (error) {
    throw new Error(error);
  }
}

const getBookingByRoomId = async (roomId) => {
  try {
    // SQL query with JOIN to fetch booking and customer information
    const query = `
      SELECT 
        b.bookingId, 
        b.roomId, 
        b.customerId, 
        b.startDate, 
        b.endDate, 
        b.reservationProof, 
        b.isReserved, 
        b.createdAt, 
        b.updatedAt,
        c.customerFirstName, 
        c.customerLastName, 
        c.customerEmail, 
        c.customerPhone, 
        c.customerAddress
      FROM bookedRooms b
      JOIN customers c ON b.customerId = c.customerId
      WHERE b.roomId = ?
    `;

    // Execute the query with the provided roomId
    const [bookings] = await pool.query(query, [roomId]);

    // If no bookings are found
    if (!bookings.length) {
      return []
    }

    // Return the bookings along with the customer details
    return bookings;
  } catch (error) {
    throw new Error(error);
  }
}

const getSingleBookingById = async (bookingId) => {
  try {
    const bookingQuery = `
      SELECT 
        b.*, 
        r.roomName, 
        c.customerFirstName, 
        c.customerLastName, 
        c.customerEmail, 
        c.customerPhone, 
        c.customerAddress
      FROM bookedRooms b
      JOIN rooms r ON b.roomId = r.roomId
      JOIN customers c ON b.customerId = c.customerId
      WHERE b.bookingId = ?
    `;

    const [booking] = await pool.query(bookingQuery, [bookingId]);

    if (!booking.length) {
      throw new Error('Booking not found');
    }

    const roomId = booking[0].roomId;

    const roomInformation = await roomsService.getSingleRoomById(roomId);

    const customerInformation = {
      customerId: booking[0].customerId,
      customerFirstName: booking[0].customerFirstName,
      customerLastName: booking[0].customerLastName,
      customerEmail: booking[0].customerEmail,
      customerPhone: booking[0].customerPhone,
      customerAddress: booking[0].customerAddress,
    };

    const { customerId, customerFirstName, customerLastName, customerEmail, customerPhone, customerAddress, ...bookedRooms } = booking[0];

    return { bookedRooms, roomInformation, customerInformation };
  } catch (error) {
    throw new Error(error.message || 'Error retrieving booking');
  }
};


const createBookingWithNewCustomer = async (req) => {
  try {
    const {
      roomId,
      customerFirstName,
      customerLastName,
      customerEmail,
      customerPhone,
      customerAddress,
      startDate,
      endDate,
    } = req.body || {};

    const reservationProof = req.files && req.files['reservationProof'] ? req.files['reservationProof'][0].path : null;

    const customerId = uuidv4();
    const bookingId = uuidv4();

    const customerQuery = `INSERT INTO customers (customerId, customerFirstName, customerLastName, customerEmail, customerPhone, customerAddress) 
            VALUES (?, ?, ?, ?, ?, ?)`;

    await pool.query(customerQuery, [customerId, customerFirstName, customerLastName, customerEmail, customerPhone, customerAddress]);

    const bookingQuery = `INSERT INTO bookedRooms (bookingId, roomId, customerId, startDate, endDate, reservationProof)
            VALUES (?, ?, ?, ?, ?, ?)`;

    await pool.query(bookingQuery, [bookingId, roomId, customerId, startDate, endDate, reservationProof]);

    const user_subject = `${customerFirstName} ${customerLastName} - Reservation Pending Approval`
    const user_content = emailReservationCustomer({
      customerFirstName,
      customerLastName,
      startDate: dateFormatter(startDate),
      endDate: dateFormatter(endDate)
    })

    const admin_subject = `${customerFirstName} ${customerLastName} - Reserved a room`
    const admin_content = emailReservationAdmin({
      bookingId,
      customerFirstName,
      customerLastName,
      startDate: dateFormatter(startDate),
      endDate: dateFormatter(endDate)
    })

    await sendEmail(customerEmail, user_subject, user_content)
    await sendEmail(COMPANY_EMAIL_ADDRESS, admin_subject, admin_content)

    return { message: `Room Booked with new customer`, bookingId: bookingId };
  } catch (error) {
    throw new Error(error.message);
  }
}

const createBookingWithExistingCustomer = async (payload) => {
  try {
    const {
      roomId,
      customerId,
      startDate,
      endDate } = payload || {};

    const bookingId = uuidv4();

    const bookingQuery = `INSERT INTO bookedRooms (bookingId, roomId, customerId, startDate, endDate)
            VALUES (?, ?, ?, ?, ?)`;

    await pool.query(bookingQuery, [bookingId, roomId, customerId, startDate, endDate]);

    return { message: `Room Booked with existing customer`, bookingId: bookingId };
  } catch (error) {
    throw new Error(error.message);
  }
}

const deleteBooking = async (bookingId) => {
  try {
    const bookingQuery = `
      DELETE FROM bookedRooms
      WHERE bookingId = ?
    `;

    await pool.query(bookingQuery, [bookingId]);

    return { message: 'Booking deleted successfully' };
  } catch (error) {
    throw new Error(error);
  }
}

const archiveBooking = async (bookingId) => {
  try {
    const bookingQuery = `
      SELECT *
      FROM bookedRooms
      WHERE bookingId = ?
      `;

    const [booking] = await pool.query(bookingQuery, [bookingId]);

    if (!booking.length) {
      throw new Error('Booking not found');
    }

    const { roomId, customerId, startDate, endDate } = booking[0];

    const archiveQuery = `
      INSERT INTO bookedRoomsArchive (bookingId, roomId, customerId, startDate, endDate)
      VALUES (?, ?, ?, ?, ?)
      `;

    await pool.query(archiveQuery, [bookingId, roomId, customerId, startDate, endDate]);

    await deleteBooking(bookingId);

    return { message: 'Booking archived successfully' };
  } catch (error) {
    throw new Error(error);
  }
}

const updateBooking = async (payload) => {
  try {
    const {
      bookingId,
      roomId,
      customerId,
      startDate,
      endDate
    } = payload;

    const bookingQuery = `
      UPDATE bookedRooms
      SET roomId = ?, customerId = ?, startDate = ?, endDate = ?
      WHERE bookingId = ?
    `;

    await pool.query(bookingQuery, [roomId, customerId, startDate, endDate, bookingId]);

    return { message: 'Booking updated successfully' };
  } catch (error) {
    throw new Error(error);
  }
}

const updateReservedStatus = async (req) => {
  try {
    const { isReserved } = req.body || {};
    const { bookingId } = req.params || {};

    const bookingQuery = `
      UPDATE bookedRooms
      SET isReserved = ?
      WHERE bookingId = ?
    `;

    await pool.query(bookingQuery, [isReserved, bookingId]);

    const bookedRoomInfo = await getSingleBookingById(bookingId)

    const {
      customerInformation,
      startDate,
      endDate
    } = bookedRoomInfo || {}

    const {
      customerFirstName,
      customerLastName,
      customerEmail
    } = customerInformation || {}

    const subject = `${customerFirstName} ${customerLastName} - Reservation status`
    const content = emailUpdateStatus({
      customerFirstName,
      customerLastName,
      startDate: dateFormatter(startDate),
      endDate: dateFormatter(endDate)
    })

    await sendEmail(customerEmail, subject, content)

    return { message: 'Booking updated successfully' };
  } catch (error) {
    throw new Error(error);
  }
}

export default {
  getAllBookings,
  getBookingByRoomId,
  getSingleBookingById,
  createBookingWithNewCustomer,
  createBookingWithExistingCustomer,
  deleteBooking,
  archiveBooking,
  updateBooking,
  updateReservedStatus
};