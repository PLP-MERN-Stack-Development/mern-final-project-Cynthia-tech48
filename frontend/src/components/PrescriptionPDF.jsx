import jsPDF from "jspdf";

export const generatePDF = (appointment) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("E-Prescription", 20, 20);
  doc.setFontSize(12);
  doc.text(`Patient: ${appointment.patientName}`, 20, 40);
  doc.text(`Doctor: ${appointment.doctorName}`, 20, 50);
  doc.text(`Date: ${new Date(appointment.date).toLocaleDateString()}`, 20, 60);
  doc.text("Prescription:", 20, 80);
  doc.text(appointment.prescription || "No prescription details yet.", 20, 90);
  doc.save("prescription.pdf");
};
