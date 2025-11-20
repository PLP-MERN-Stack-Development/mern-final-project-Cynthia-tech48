// backend/controllers/aiTriageController.js
import { triage as triageFn } from '../utils/aiEngine.js';

export const triage = async (req, res, next) => {
  try {
    const { symptoms } = req.body;
    if (!symptoms) return res.status(400).json({ message: 'Symptoms required' });

    const result = triageFn(symptoms);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
