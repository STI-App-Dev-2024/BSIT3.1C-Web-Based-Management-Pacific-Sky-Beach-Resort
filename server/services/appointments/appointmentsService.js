import { v4 as uuidv4 } from "uuid";
import conn from "../../config/db.js";
import undefinedValidator from '../../utils/undefinedValidator.js'

const pool = await conn();

const createAppointment = async (payload) => {
  const {
    userId,
    title,
    duration,
    startDate,
    endDate,
    startTime,
    endTime,
    meetingLink,
    timezone,
    description,
    blockedDates = []
  } = payload;

  const appointmentId = uuidv4();

  const appointmentQuery = `
    INSERT INTO appointments(
      appointmentId,
      userId,
      title,
      duration,
      startDate,
      endDate,
      startTime,
      endTime,
      meetingLink,
      timezone,
      description
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    await pool.query(appointmentQuery, [
      appointmentId,
      userId,
      title,
      duration,
      startDate,
      endDate,
      startTime,
      endTime,
      meetingLink,
      timezone,
      description,
    ]);

    if (blockedDates.length !== 0) {
      await Promise.all(
        blockedDates.map(async (date) => {
          const blockedDateQuery = `
            INSERT INTO appointmentsblockeddates (appointmentId, blockedDate)
            VALUES (?, ?)
          `;
          await pool.query(blockedDateQuery, [appointmentId, date]);
        })
      );
    }

    return `[Appointment] successfully created.`;
  } catch (error) {
    console.error("[Create Appointment Error]:", error.message);
    throw new Error("[Create Appointment] Failed to create appointment.");
  }
};

const getAppointmentsByUserId = async (userId) => {
  const appointmentQuery = `
    SELECT 
      a.appointmentId,
      a.userId,
      a.title,
      a.duration,
      a.startDate,
      a.endDate,
      a.startTime,
      a.endTime,
      a.meetingLink,
      a.timezone,
      a.description,
      JSON_ARRAYAGG(b.blockedDate) AS blockedDates
    FROM appointments AS a
    LEFT JOIN appointmentsblockeddates AS b
      ON a.appointmentId = b.appointmentId
    WHERE a.userId = ?
    GROUP BY a.appointmentId
  `;

  try {
    const [appointments] = await pool.query(appointmentQuery, [userId]);
    return appointments;
  } catch (error) {
    console.error("[Get Appointments Error]:", error.message);
    throw new Error(`[Get Appointments] Failed to fetch appointments for userId: ${userId}`);
  }
};

const getSingleAppointment = async (appointmentId) => {
  const appointmentQuery = `
    SELECT 
      a.appointmentId,
      a.userId,
      a.title,
      a.duration,
      a.startDate,
      a.endDate,
      a.startTime,
      a.endTime,
      a.meetingLink,
      a.timezone,
      a.description,
      JSON_ARRAYAGG(b.blockedDate) AS blockedDates
    FROM appointments AS a
    LEFT JOIN appointmentsblockeddates AS b
      ON a.appointmentId = b.appointmentId
    WHERE a.appointmentId = ?
    GROUP BY a.appointmentId
  `;

  try {
    const [appointments] = await pool.query(appointmentQuery, [appointmentId]);

    if (appointments.length === 0) {
      throw new Error(`[Appointment] with ID ${appointmentId} not found.`);
    }

    return appointments[0];
  } catch (error) {
    console.error("[Get Single Appointment Error]:", error.message);
    throw new Error(`[Get Single Appointment] Failed to fetch appointment with ID ${appointmentId}`);
  }
};


const deleteAppointment = async (appointmentId) => {
  const deleteBlockedDatesQuery = `
    DELETE FROM appointmentsblockeddates
    WHERE appointmentId = ?
  `;

  const deleteAppointmentQuery = `
    DELETE FROM appointments
    WHERE appointmentId = ?
  `;

  try {
    await pool.query('START TRANSACTION');

    await pool.query(deleteBlockedDatesQuery, [appointmentId]);

    await pool.query(deleteAppointmentQuery, [appointmentId]);

    await pool.query('COMMIT');

    return `[Appointment] with ID ${appointmentId} successfully deleted.`;
  } catch (error) {
    await pool.query('ROLLBACK');
    throw new Error(`[Appointment] deletion failed: ${error.message}`);
  }
};

const editAppointment = async (appointmentId, payload) => {
  const {
    title,
    duration,
    startDate,
    endDate,
    startTime,
    endTime,
    meetingLink,
    timezone,
    description,
    blockedDates = [],
  } = payload;

  try {
    const appointment = await getSingleAppointment(appointmentId)

    const updatedTitle = undefinedValidator(appointment.title, title);
    const updatedDuration = undefinedValidator(appointment.duration, duration);
    const updatedStartDate = undefinedValidator(appointment.startDate, startDate);
    const updatedEndDate = undefinedValidator(appointment.endDate, endDate);
    const updatedStartTime = undefinedValidator(appointment.startTime, startTime);
    const updatedEndTime = undefinedValidator(appointment.endTime, endTime);
    const updatedMeetingLink = undefinedValidator(appointment.meetingLink, meetingLink);
    const updatedTimezone = undefinedValidator(appointment.timezone, timezone);
    const updatedDescription = undefinedValidator(appointment.description, description);

    const updateAppointmentQuery = `
      UPDATE appointments
      SET title = ?, duration = ?, startDate = ?, endDate = ?, startTime = ?, endTime = ?, meetingLink = ?, timezone = ?, description = ?
      WHERE appointmentId = ?
    `;

    await pool.query(updateAppointmentQuery, [
      updatedTitle,
      updatedDuration,
      updatedStartDate,
      updatedEndDate,
      updatedStartTime,
      updatedEndTime,
      updatedMeetingLink,
      updatedTimezone,
      updatedDescription,
      appointmentId,
    ]);

    if (blockedDates.length !== 0) {
      const deleteBlockedDatesQuery = `
        DELETE FROM appointmentsblockeddates WHERE appointmentId = ?
      `;
      await pool.query(deleteBlockedDatesQuery, [appointmentId]);

      await Promise.all(
        blockedDates.map(async (date) => {
          const blockedDateQuery = `
            INSERT INTO appointmentsblockeddates (appointmentId, blockedDate)
            VALUES (?, ?)
          `;
          await pool.query(blockedDateQuery, [appointmentId, date]);
        })
      );
    }

    return `[Appointment] with ID ${appointmentId} successfully updated.`;
  } catch (error) {
    console.error("[Edit Appointment Error]:", error.message);
    throw new Error("[Edit Appointment Error]:", error.message);
  }
};

export default {
  createAppointment,
  getAppointmentsByUserId,
  getSingleAppointment,
  deleteAppointment,
  editAppointment
}