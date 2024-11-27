import express from "express";
import {
  getAllBookings,
  getSingleBookingById,
  createBookingWithNewCustomer,
  createBookingWithExistingCustomer,
  deleteBooking,
  archiveBooking,
  updateBooking,
} from "../../controllers/bookings/bookingsController.js";

const router = express.Router();

router.get("/", getAllBookings);
router.get("/:bookingId", getSingleBookingById);
router.delete("/:bookingId", deleteBooking);
router.post("/create-booking-with-new-customer", createBookingWithNewCustomer);
router.post("/create-booking-with-existing-customer", createBookingWithExistingCustomer);
router.put("/:bookingId", updateBooking);
router.post("/archive-booking/:bookingId", archiveBooking);

export default router;