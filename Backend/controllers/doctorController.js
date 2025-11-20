import Doctor from "../models/Doctor.js";

export const createProfile = async (req, res, next) => {
  try {
    const { specialization, experience, bio, location, fee } = req.body;
    const existing = await Doctor.findOne({ user: req.user.id });
    if (existing) return res.status(400).json({ message: "Profile exists" });

    const doc = new Doctor({ user: req.user.id, specialization, experience, bio, location, fee });
    await doc.save();
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

export const getApprovedDoctors = async (req, res, next) => {
  try {
    const docs = await Doctor.find({ approved: true }).populate("user", "-password");
    res.json(docs);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const doc = await Doctor.findById(req.params.id).populate("user", "-password");
    if (!doc) return res.status(404).json({ message: "Doctor not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

export const approveDoctor = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });
    const doc = await Doctor.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Doctor not found" });

    doc.approved = true;
    await doc.save();
    res.json(doc);
  } catch (err) {
    next(err);
  }
};
