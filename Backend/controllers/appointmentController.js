// backend/controllers/appointmentController.js
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";

export const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, reason } = req.body;
    const patientId = req.user.id;
    const patient = await User.findById(patientId);
    const doctor = await User.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const appointment = await Appointment.create({
      patientId,
      doctorId,
      patientName: patient.name,
      doctorName: doctor.name,
      date,
      reason,
      status: "pending",
    });

    // send real-time update if socket.io is configured
    const io = req.app.get("io");
    if (io) io.to(doctorId.toString()).emit("new-appointment", appointment);

    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAppointmentsForUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let filter = {};
    if (role === "doctor") filter = { doctorId: userId };
    else filter = { patientId: userId };

    const appointments = await Appointment.find(filter).sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ message: "Not found" });

    if (req.user.role !== "doctor" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    appointment.status = status;
    await appointment.save();

    const io = req.app.get("io");
    if (io) {
      io.to(appointment.patientId.toString()).emit("appointment-updated", appointment);
      io.to(appointment.doctorId.toString()).emit("appointment-updated", appointment);
    }

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
