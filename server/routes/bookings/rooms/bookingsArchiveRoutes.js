import express from "express";
import {
  getAllArchivedBookings,
  getSingleArchivedBookingById,
  deleteArchivedBooking,
  restoreBooking,
} from "../../../controllers/bookings/rooms/bookingsArchiveController.js";

const router = express.Router();

router.get("/", getAllArchivedBookings);
router.get("/:bookingId", getSingleArchivedBookingById);
router.delete("/:bookingId", deleteArchivedBooking);
router.post("/restore-booking/:bookingId", restoreBooking);

export default router;