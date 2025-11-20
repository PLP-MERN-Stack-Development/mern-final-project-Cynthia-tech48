// backend/utils/pdfGenerator.js
import PDFDocument from 'pdfkit';

export function prescriptionPdfStream(prescription, doctorInfo = {}, patientInfo = {}) {
  const doc = new PDFDocument({ margin: 50 });
  // header
  doc.fontSize(18).text('MediReach Prescription', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Date: ${new Date(prescription.createdAt).toLocaleString()}`);
  doc.text(`Doctor: ${doctorInfo.name || 'N/A'} (${doctorInfo.specialization || ''})`);
  doc.text(`Patient: ${patientInfo.name || ''}`);
  doc.moveDown();

  doc.text('Medicines:', { underline: true });
  prescription.medicines.forEach((m, idx) => {
    doc.moveDown(0.2);
    doc.text(`${idx + 1}. ${m.name} — ${m.dosage}. Instructions: ${m.instructions}`);
  });

  doc.moveDown();
  doc.text('Notes:');
  doc.text(prescription.notes || 'None');

  // signature placeholder
  doc.moveDown(2);
  doc.text('______________________');
  doc.text('Doctor Signature');

  doc.end();
  return doc;
}
