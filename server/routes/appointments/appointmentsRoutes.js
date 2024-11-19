import express from "express";
import {
  createAppointment,
  getAppointmentsByUserId,
  deleteAppointment,
  getSingleAppointment,
  editAppointment
} from '../../controllers/appointments/appointmentControllers.js'
import { protect } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.get('/single/:appointmentId', getSingleAppointment)
router.get('/:userId', getAppointmentsByUserId)
router.delete('/:appointmentId', deleteAppointment)
router.put('/:appointmentId', protect, editAppointment)
router.post('/', protect, createAppointment)

export default router