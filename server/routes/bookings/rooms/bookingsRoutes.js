import express from "express";
import { adminAuth } from "../../../middleware/authMiddleware.js";
import {
  getAllBookings,
  getSingleBookingById,
  createBookingWithNewCustomer,
  createBookingWithExistingCustomer,
  deleteBooking,
  archiveBooking,
  updateBooking,
  updateReservedStatus,
} from "../../../controllers/bookings/rooms/bookingsController.js";
import createUploadMiddleware from '../../../middleware/multer/uploadMiddleware.js'

const router = express.Router();

router.get("/", getAllBookings);
router.get("/:bookingId", getSingleBookingById);
router.delete("/:bookingId", deleteBooking);
router.post("/create-booking-with-new-customer",
  createUploadMiddleware({
    folder: 'proof-of-reservation',
    fields: [
      { name: 'reservationProof', maxCount: 1 },
    ],
  }),
  createBookingWithNewCustomer
);
router.post("/create-booking-with-existing-customer", createBookingWithExistingCustomer);
router.put("/:bookingId", updateBooking);
router.post("/archive-booking/:bookingId", archiveBooking);
router.put("/update-reservation-status/:bookingId", updateReservedStatus);

export default router;