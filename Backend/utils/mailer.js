// backend/utils/mailer.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendEmail({ to, subject, text, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"MediReach" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html
    });
    return info;
  } catch (err) {
    console.error('Email error', err);
    throw err;
  }
}
