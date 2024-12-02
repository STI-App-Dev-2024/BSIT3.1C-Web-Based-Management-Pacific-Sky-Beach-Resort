import conn from '../../../config/db.js';

const pool = await conn();

const getAllArchivedBookings = async () => {
    try {
        const bookingsQuery = `
    SELECT b.bookingId, r.roomName, CONCAT(c.customerFirstName,' ',c.customerLastName) AS CustomerName, b.startDate, b.endDate, b.archiveDate
    FROM bookedRoomsArchive b
    JOIN rooms r ON b.roomId = r.roomId
    JOIN customers c ON b.customerId = c.customerId
    `;
    
        const [bookings] = await pool.query(bookingsQuery);
    
        return bookings;
    } catch (error) {
        throw new Error(error);
    }
}

const getSingleArchivedBookingById = async (bookingId) => {
    try {
        const bookingQuery = `
        SELECT b.bookingId, r.roomName, CONCAT(c.customerFirstName,' ',customerLastName) AS CustomerName, b.startDate, b.endDate,  b.archiveDate
        FROM bookedRoomsArchive b
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

const deleteArchivedBooking = async (bookingId) => {
    try {
        const deleteBookingQuery = `
        DELETE FROM bookedRoomsArchive 
        WHERE bookingId = ?`;

        await pool.query(deleteBookingQuery, [bookingId]);

        return {message: 'Archive deleted successfully'};
    }
    catch (error) {
        throw new Error(error.message);
    }
}

const restoreBooking = async (bookingId) => {
    try {
        const archiveBookingQuery = `SELECT * FROM bookedRoomsArchive WHERE bookingId = ?`;
        const [archiveBooking] = await pool.query(archiveBookingQuery, [bookingId]);

        if (!archiveBooking.length) {
            throw new Error('Booking not found');
        }

        const { roomId, customerId, startDate, endDate } = archiveBooking[0];

        const restoreBookingQuery = `INSERT INTO bookedRooms (bookingId, roomId, customerId, startDate, endDate) VALUES (?, ?, ?, ?, ?)`;
        await pool.query(restoreBookingQuery, [bookingId, roomId, customerId, startDate, endDate]);

        await deleteArchivedBooking(bookingId);

        return { message: 'Booking restored successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
}

export default {
    getAllArchivedBookings,
    getSingleArchivedBookingById,
    deleteArchivedBooking,
    restoreBooking
}