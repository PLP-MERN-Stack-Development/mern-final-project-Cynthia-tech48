MediReach – Doctor Appointment Booking System


MediReach is a web application that allows patients to book appointments with doctors, enables doctors to manage their profiles and prescriptions, and supports real-time notifications and payments.


Features

User Management: Register and login as a patient, doctor, or admin.

Doctor Profiles: Doctors can create and update profiles; admins can approve doctors.

Appointment Booking: Patients can book appointments with doctors.

Prescriptions: Doctors can create prescriptions for patients and generate PDF downloads.

Notifications: Real-time notifications via Socket.io for appointment updates and prescription alerts.

Payments: Integration with Stripe for appointment payments.

AI Triage (Optional): Suggests a medical specialty based on symptoms.


Technologies Used

Backend: Node.js, Express, MongoDB (Atlas), Mongoose, Socket.io

Frontend: React.js, Vite

Authentication: JWT, bcryptjs

Notifications: Socket.io

Payments: Stripe

Email/SMS: Nodemailer, Twilio

PDF Generation: pdfkit


Project Setup
Backend

Navigate to the backend folder:

cd Backend


Install dependencies:

npm install


Create a .env file in the backend root with the following variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
EMAIL_HOST=smtp.your-email.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret


Start the backend server:

npm run dev

Frontend

Navigate to the frontend folder:

cd Frontend


Install dependencies:

npm install


Create a .env file in the frontend root with:

VITE_API_URL=http://localhost:5000/api


Start the frontend server:

npm run dev


Open your browser and go to http://localhost:5173


Pitch Deck

View Pitch Deck:https://gamma.app/docs/Medreach-Revolutionizing-Healthcare-Access-in-Kenya-u2w1effx1mrthsc

Deployment

View Live Deployment:https://medreachsystem.vercel.app



Folder Structure
Backend/

 ├─ controllers/

 ├─ models/

 ├─ routes/

 ├─ middleware/

 ├─ utils/

 ├─ server.js

 └─ .env

Frontend/
 ├─ src/

 ├─ public/

 ├─ package.json

 └─ vite.config.js



Doctor Dashboard:


API Endpoints (Partial)

Auth: /api/users/register, /api/users/login

Appointments: /api/appointments/

Doctors: /api/doctors/

Prescriptions: /api/prescriptions/

Payments: /api/payments/

Notifications: /api/notifications/