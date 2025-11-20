import Stripe from "stripe";
import Appointment from "../models/Appointment.js";
import { emitToUser } from "../utils/socketHandler.js";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res, next) => {
  try {
    const { doctorId, appointmentId, amount, currency = "usd" } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: { currency, product_data: { name: "Teleconsultation" }, unit_amount: amount },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancelled`,
      metadata: { appointmentId, doctorId },
    });
    res.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    next(err);
  }
};

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Stripe webhook signature verification failed", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const appointmentId = session.metadata?.appointmentId;
    try {
      if (appointmentId) {
        const appt = await Appointment.findById(appointmentId);
        if (appt) {
          appt.paid = true;
          appt.paymentIntentId = session.payment_intent || session.id;
          await appt.save();
          emitToUser(appt.patient.toString(), "payment_success", { appointmentId: appt._id });
          emitToUser(appt.doctor.toString(), "appointment_paid", { appointmentId: appt._id });
        }
      }
    } catch (err) {
      console.error("Error updating appointment after payment:", err);
    }
  }

  res.json({ received: true });
};
