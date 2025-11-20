import emailjs from "emailjs-com";

export const sendEmailReminder = (appointment) => {
  emailjs.send(
    "YOUR_SERVICE_ID",
    "YOUR_TEMPLATE_ID",
    {
      to_name: appointment.patientName,
      to_email: appointment.patientEmail,
      date: appointment.date,
      doctor: appointment.doctorName,
    },
    "YOUR_PUBLIC_KEY"
  )
  .then(() => console.log("Email sent"))
  .catch((err) => console.error(err));
};
