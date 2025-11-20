// backend/utils/sms.js
import Twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

let client = null;
if (accountSid && authToken) client = Twilio(accountSid, authToken);

export async function sendSMS({ to, body }) {
  if (!client) {
    console.warn('Twilio not configured, skipping SMS');
    return null;
  }
  try {
    const msg = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to
    });
    return msg;
  } catch (err) {
    console.error('SMS error', err);
    throw err;
  }
}
