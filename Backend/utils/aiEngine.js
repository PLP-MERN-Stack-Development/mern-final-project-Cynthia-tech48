// backend/utils/aiEngine.js
/**
 * Very simple rule-based triage. Replace with ML or external API if desired.
 * Input: { symptoms: "text ..." }
 * Output: { suggestion: 'Cardiologist', confidence: 0.8, reasons: [...] }
 */
export function triage(symptomsText) {
  const s = symptomsText.toLowerCase();
  const reasons = [];
  let suggestion = 'General Physician';
  let confidence = 0.5;

  if (s.includes('chest') || s.includes('shortness of breath') || s.includes('heart')) {
    suggestion = 'Cardiologist';
    confidence = 0.9;
    reasons.push('Chest-related keywords found');
  } else if (s.includes('skin') || s.includes('rash') || s.includes('itch')) {
    suggestion = 'Dermatologist';
    confidence = 0.85;
    reasons.push('Skin-related keywords found');
  } else if (s.includes('fever') || s.includes('cough') || s.includes('cold')) {
    suggestion = 'General Physician';
    confidence = 0.7;
    reasons.push('Flu-like keywords found');
  } else if (s.includes('tooth') || s.includes('ache')) {
    suggestion = 'Dentist';
    confidence = 0.8;
    reasons.push('Dental keywords found');
  }

  return { suggestion, confidence, reasons };
}
