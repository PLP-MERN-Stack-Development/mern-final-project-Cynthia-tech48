import mongoose from "mongoose";

const PrescriptionSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  medicines: [
    {
      name: String,
      dosage: String,
      instructions: String,
    },
  ],

  notes: String,
  signed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Prescription", PrescriptionSchema);
