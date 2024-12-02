import conn from '../../../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import undefinedValidator from '../../../utils/undefinedValidator.js';

const pool = await conn();

const getAllBookings = async () => {
  try {
    const bookingsQuery = `
  SELECT b.bookingId, r.roomName, CONCAT(c.customerFirstName,' ',customerLastName) AS CustomerName,b.isReserved, b.startDate, b.endDate
  FROM bookedRooms b
  JOIN rooms r ON b.roomId = r.roomId
  JOIN customers c ON b.customerId = c.customerId
  ORDER BY b.isReserved 
`;

    const [bookings] = await pool.query(bookingsQuery);

    return bookings;
  } catch (error) {
    throw new Error(error);
  }
}

const getSingleBookingById = async (bookingId) => {
  try {
    const bookingQuery = `
      SELECT b.bookingId, r.roomName, CONCAT(c.customerFirstName,' ',customerLastName) AS CustomerName,b.isReserved, b.startDate, b.endDate
      FROM bookedRooms b
      JOIN rooms r ON b.roomId = r.roomId
      JOIN customers c ON b.customerId = c.customerId
      WHERE bookingId = ?
    `;

    const [booking] = await pool.query(bookingQuery, [bookingId]);

    if (!booking.length) {
      throw new Error('Booking not found');
    }

    return booking;
  } catch (error) {
    throw new Error(error);
  }
}

const createBookingWithNewCustomer = async (payload) => {
    try{
        const {
            roomId,  
            customerFirstName, 
            customerLastName, 
            customerEmail, 
            customerPhone, 
            customerAddress, 
            startDate, 
            endDate } = payload||{};
    
            const customerId = uuidv4();
            const bookingId = uuidv4();
    
            const customerQuery = `INSERT INTO customers (customerId, customerFirstName, customerLastName, customerEmail, customerPhone, customerAddress) 
            VALUES (?, ?, ?, ?, ?, ?)`;
    
            await pool.query(customerQuery, [customerId, customerFirstName, customerLastName, customerEmail, customerPhone, customerAddress]);
    
            const bookingQuery = `INSERT INTO bookedRooms (bookingId, roomId, customerId, startDate, endDate)
            VALUES (?, ?, ?, ?, ?)`;
    
            await pool.query(bookingQuery, [bookingId, roomId, customerId, startDate, endDate]);

            return {message: `Room Booked with new customer`, bookingId: bookingId};
    } catch (error) {
        throw new Error(error.message);
    }
}

const createBookingWithExistingCustomer = async (payload) => {
    try{
        const {
            roomId,  
            customerId, 
            startDate, 
            endDate } = payload||{};
    
            const bookingId = uuidv4();
    
            const bookingQuery = `INSERT INTO bookedRooms (bookingId, roomId, customerId, startDate, endDate)
            VALUES (?, ?, ?, ?, ?)`;
    
            await pool.query(bookingQuery, [bookingId, roomId, customerId, startDate, endDate]);

            return {message: `Room Booked with existing customer`, bookingId: bookingId};
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

const updateReservedStatus = async (payload) => {
  try {
    const { 
      bookingId, 
      isReserved 
    } = payload;

    const bookingQuery = `
      UPDATE bookedRooms
      SET isReserved = ?
      WHERE bookingId = ?
    `;

    await pool.query(bookingQuery, [isReserved, bookingId]);

    return { message: 'Booking updated successfully' };
  } catch (error) {
    throw new Error(error);
  }
}

export default {
    getAllBookings,
    getSingleBookingById,
    createBookingWithNewCustomer,
    createBookingWithExistingCustomer,
    deleteBooking,
    archiveBooking,
    updateBooking,
    updateReservedStatus
};