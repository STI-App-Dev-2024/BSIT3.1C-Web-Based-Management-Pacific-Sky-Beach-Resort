import expressAsync from "express-async-handler";
import appointmentService from "../../services/appointments/appointmentsService.js";

const createAppointment = expressAsync(async (req, res, next) => {
  try {
    const response = await appointmentService.createAppointment(req.body);
    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getAppointmentsByUserId = expressAsync(async (req, res, next) => {
  try {
    const response = await appointmentService.getAppointmentsByUserId(req.params.userId);
    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getSingleAppointment = expressAsync(async (req, res, next) => {
  try {
    const response = await appointmentService.getSingleAppointment(req.params.appointmentId);
    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteAppointment = expressAsync(async (req, res, next) => {
  try {
    const response = await appointmentService.deleteAppointment(req.params.appointmentId);
    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const editAppointment = expressAsync(async (req, res, next) => {
  try {
    const response = await appointmentService.editAppointment(req.params.appointmentId, req.body);
    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

export {
  createAppointment,
  getAppointmentsByUserId,
  getSingleAppointment,
  deleteAppointment,
  editAppointment
}