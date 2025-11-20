import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  specialization: { type: String, required: true },
  experience: { type: Number },
  bio: { type: String },
  location: { type: String },
  fee: { type: Number, default: 0 },
  availableSlots: [
    {
      date: Date,
      times: [String],
    },
  ],
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Doctor", DoctorSchema);
