import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => fetchAppointments(), []);

  const fetchAppointments = async () => {
    const res = await fetch("http://localhost:5000/api/appointments/pending", {
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    const data = await res.json();
    if (res.ok) setAppointments(data);
    else toast.error(data.message || "Failed to load appointments");
  };

  const handleApproval = async (id, status) => {
    const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(`Appointment ${status}`);
      fetchAppointments();
    } else toast.error(data.message || "Error updating appointment");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Doctor Dashboard</h1>

      {appointments.length === 0 ? (
        <p>No pending appointments.</p>
      ) : (
        <ul>
          {appointments.map((a) => (
            <li key={a._id} className="mb-3">
              {a.patientName} - {new Date(a.date).toLocaleDateString()} | {a.status}
              <button
                className="ml-2 bg-green-600 text-white py-1 px-2 rounded hover:bg-green-700"
                onClick={() => handleApproval(a._id, "Approved")}
              >
                Approve
              </button>
              <button
                className="ml-2 bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700"
                onClick={() => handleApproval(a._id, "Rejected")}
              >
                Reject
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
