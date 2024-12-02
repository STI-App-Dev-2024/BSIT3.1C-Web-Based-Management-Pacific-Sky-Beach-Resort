import expressAsync from "express-async-handler";
import bookingsArchiveService from "../../../services/bookings/rooms/bookingsArchiveService.js";

const getAllArchivedBookings = expressAsync(async (req, res, next) => {
    try {
        const response = await bookingsArchiveService.getAllArchivedBookings();
        res.json(response);
    } catch (error) {
        throw new Error(error);
    }
});

const getSingleArchivedBookingById = expressAsync(async (req, res, next) => {
    try {
        const response = await bookingsArchiveService.getSingleArchivedBookingById(req.params.bookingId);
        res.json(response);
    } catch (error) {
        throw new Error(error);
    }
});

const restoreBooking = expressAsync(async (req, res, next) => {
    try {
        const response = await bookingsArchiveService.restoreBooking(req.params.bookingId);
        res.json(response);
    } catch (error) {
        throw new Error(error);
    }
});


const deleteArchivedBooking = expressAsync(async (req, res, next) => {
    try {
        const response = await bookingsArchiveService.deleteArchivedBooking(req.params.bookingId);
        res.json(response);
    } catch (error) {
        throw new Error(error);
    }
});


export {
    getAllArchivedBookings,
    getSingleArchivedBookingById,
    deleteArchivedBooking,
    restoreBooking,
}

