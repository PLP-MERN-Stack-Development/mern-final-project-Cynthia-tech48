import Prescription from "../models/Prescription.js";
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import { prescriptionPdfStream } from "../utils/pdfGenerator.js";
import { emitToUser } from "../utils/socketHandler.js";

export const create = async (req, res, next) => {
  try {
    if (req.user.role !== "doctor") return res.status(403).json({ message: "Only doctors can create prescriptions" });
    const { appointmentId, medicines, notes } = req.body;
    const appt = await Appointment.findById(appointmentId);
    if (!appt) return res.status(404).json({ message: "Appointment not found" });

    const pres = new Prescription({
      appointment: appointmentId,
      doctor: req.user.id,
      patient: appt.patient,
      medicines,
      notes,
      signed: true,
    });
    await pres.save();

    emitToUser(appt.patient.toString(), "new_prescription", { prescriptionId: pres._id });

    res.json(pres);
  } catch (err) {
    next(err);
  }
};

export const download = async (req, res, next) => {
  try {
    const pres = await Prescription.findById(req.params.id);
    if (!pres) return res.status(404).json({ message: "Prescription not found" });

    const doctor = await Doctor.findById(pres.doctor).populate("user", "name");
    const patient = await User.findById(pres.patient);

    const stream = prescriptionPdfStream(
      pres,
      { name: doctor?.user?.name, specialization: doctor?.specialization },
      { name: patient?.name }
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=prescription_${pres._id}.pdf`);
    stream.pipe(res);
  } catch (err) {
    next(err);
  }
};
