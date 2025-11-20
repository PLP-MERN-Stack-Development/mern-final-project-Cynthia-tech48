import Notification from "../models/Notification.js";

export const getNotifications = async (req, res, next) => {
  try {
    const notes = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

export const markRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Notification.findById(id);
    if (!note) return res.status(404).json({ message: "Not found" });
    if (note.user.toString() !== req.user.id) return res.status(403).json({ message: "Not allowed" });

    note.read = true;
    await note.save();
    res.json(note);
  } catch (err) {
    next(err);
  }
};
