// src/pages/Appointment.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-hot-toast";

export default function Appointment() {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadDoctors();
    loadAppointments();
  }, []);

  const loadDoctors = async () => {
    try {
      const { data } = await API.get("/users"); // assuming you have /users endpoint
      setDoctors(data.filter((u) => u.role === "doctor"));
    } catch (err) {
      console.error(err);
    }
  };

  const loadAppointments = async () => {
    try {
      const { data } = await API.get("/appointments");
      setAppointments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doctorId || !date) return toast.error("Please select doctor and date/time");
    try {
      await API.post("/appointments", { doctorId, date, reason });
      toast.success("Appointment requested!");
      setDoctorId("");
      setDate("");
      setReason("");
      loadAppointments();
    } catch (err) {
      toast.error("Booking failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md max-w-xl">
        <label className="block mb-2">Choose Doctor</label>
        <select
          className="w-full p-2 mb-3 border"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
        >
          <option value="">-- Select doctor --</option>
          {doctors.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name} ({d.specialization || "General"})
            </option>
          ))}
        </select>

        <label className="block mb-2">Date & Time</label>
        <input
          className="w-full p-2 mb-3 border"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label className="block mb-2">Reason</label>
        <textarea
          className="w-full p-2 mb-3 border"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">Book</button>
      </form>

      <h3 className="text-xl font-semibold mt-6 mb-3">My Appointments</h3>
      <div className="space-y-3">
        {appointments.map((a) => (
          <div key={a._id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{a.doctorName}</div>
                <div className="text-sm text-gray-600">
                  {new Date(a.date).toLocaleString()}
                </div>
                <div className="text-sm mt-1">{a.reason}</div>
              </div>
              <div className="text-right">
                <div
                  className={`px-2 py-1 rounded ${
                    a.status === "pending"
                      ? "bg-yellow-100"
                      : a.status === "approved"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {a.status}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
