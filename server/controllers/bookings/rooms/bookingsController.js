import expressAsync from "express-async-handler";
import bookingsService from "../../../services/bookings/rooms/bookingsService.js";
import e from "express";

const getAllBookings = expressAsync(async (req, res, next) => {
    try {
        const response = await bookingsService.getAllBookings();
        res.json(response);
    } catch (error) {
        throw new Error(error);
    }
});

const getBookingByRoomId = expressAsync(async (req, res, next) => {
    try {
        const response = await bookingsService.getBookingByRoomId(req.params.roomId);
        res.json(response);
    } catch (error) {
        throw new Error(error);
    }
});

const getSingleBookingById = expressAsync(async (req, res, next) => {
    try {
        const response = await bookingsService.getSingleBookingById(req.params.bookingId);
        res.json(response);
    } catch (error) {
        throw new Error(error);
    }
});

const createBookingWithNewCustomer = expressAsync(async (req, res, next) => {
    try {
        const response = await bookingsService.createBookingWithNewCustomer(req);
        res.json(response);
    } catch (error) {
        throw new Error(error);
    }
});

const createBookingWithExistingCustomer = expressAsync(async (req, res, next) => {
    try {
        const response = await bookingsService.createBookingWithExistingCustomer(req.body);
        res.json(response);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteBooking = expressAsync(async (req, res, next) => {
    try {
        const response = await bookingsService.deleteBooking(req.params.bookingId);
        res.json(response);
    } catch (error) {
        throw new Error(error);
    }
});

const archiveBooking = expressAsync(async (req, res, next) => {
    try {
        const response = await bookingsService.archiveBooking(req.params.bookingId);
        res.json(response);
    } catch (error) {
        throw new Error(error);
    }
});

const updateBooking = expressAsync(async (req, res, next) => {
    try {
        const response = await bookingsService.updateBooking(req.body);
        res.json(response);
    } catch (error) {
        throw new Error(error);
    }
});

const updateReservedStatus = expressAsync(async (req, res, next) => {
    try {
        const response = await bookingsService.updateReservedStatus(req);
        res.json(response);
    } catch (error) {
        throw new Error(error);
    }
});

export {
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