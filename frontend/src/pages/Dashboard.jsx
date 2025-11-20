import { useState, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FaDownload,
  FaCalendarCheck,
  FaBell,
  FaSearch,
  FaSort,
  FaEye,
  FaPills,
  FaUserMd,
  FaCalendarAlt,
} from "react-icons/fa";

export default function Dashboard() {
  const [tab, setTab] = useState("appointments");

  // -----------------------------
  // Normal CSS styles for the booking form
  // -----------------------------
  const styles = {
    formContainer: {
      background: "white",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      maxWidth: "420px",
      margin: "0 auto",
    },
    formDark: {
      background: "#1f2937",
      color: "#e5e7eb",
    },
    title: {
      fontSize: "22px",
      fontWeight: "600",
      textAlign: "center",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
      marginBottom: "15px",
    },
    inputDark: {
      background: "#374151",
      color: "#f3f4f6",
      border: "1px solid #4b5563",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#059669",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
    },
  };

  // -----------------------------
  // ★ PRESCRIPTIONS LOGIC
  // -----------------------------
  const sampleData = [
    {
      id: "p001",
      date: "2025-11-14",
      doctor: "Dr. Jane Doe",
      meds: "Medicine A - 1 tablet twice daily",
      notes: "Take after food.",
    },
    {
      id: "p002",
      date: "2025-11-10",
      doctor: "Dr. John Smith",
      meds: "Medicine B - Syrup 10ml",
      notes: "Shake before use.",
    },
    {
      id: "p003",
      date: "2025-09-12",
      doctor: "Dr. Alice Muriuki",
      meds: "Medicine C",
      notes: "Complete full dose.",
    },
  ];

  const [query, setQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 3;
  const [modal, setModal] = useState({ open: false, item: null });

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let f = sampleData.filter(
      (p) =>
        p.doctor.toLowerCase().includes(q) ||
        p.meds.toLowerCase().includes(q) ||
        p.date.includes(q)
    );
    f.sort((a, b) => {
      let da = new Date(a.date).getTime();
      let db = new Date(b.date).getTime();
      return sortAsc ? da - db : db - da;
    });
    return f;
  }, [query, sortAsc]);

  const totalPages = Math.ceil(filtered.length / pageSize);

  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openDetails = (item) => setModal({ open: true, item });
  const closeModal = () => setModal({ open: false, item: null });

  const downloadFile = (item) => {
    const text = `Prescription ID: ${item.id}\nDate: ${item.date}\nDoctor: ${item.doctor}\nMeds: ${item.meds}\nNotes: ${item.notes}`;
    const blob = new Blob([text], { type: "text/plain" });
    const link = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = link;
    a.download = `${item.id}.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <Toaster position="top-right" />

      {/* Header */}
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Patient Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-8 space-x-4">
        {[
          ["appointments", "Book Appointment", <FaCalendarCheck />],
          ["prescriptions", "My Prescriptions", <FaDownload />],
          ["reminders", "Reminders", <FaBell />],
        ].map(([key, label, icon]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition ${
              tab === key
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {/* ----------------------- */}
      {/* BOOK APPOINTMENT FORM   */}
      {/* ----------------------- */}
      {tab === "appointments" && (
        <div
          style={{
            ...styles.formContainer,
            ...(document.documentElement.classList.contains("dark")
              ? styles.formDark
              : {}),
          }}
        >
          <h2 style={styles.title}>Book Appointment</h2>
          <form>
            <input
              type="text"
              placeholder="Doctor Name"
              style={{
                ...styles.input,
                ...(document.documentElement.classList.contains("dark")
                  ? styles.inputDark
                  : {}),
              }}
            />
            <input
              type="date"
              style={{
                ...styles.input,
                ...(document.documentElement.classList.contains("dark")
                  ? styles.inputDark
                  : {}),
              }}
            />
            <button
              type="submit"
              style={styles.button}
              onClick={(e) => {
                e.preventDefault();
                toast.success("Appointment booked!");
              }}
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {/* ----------------------- */}
      {/* PRESCRIPTIONS SECTION   */}
      {/* ----------------------- */}
      {tab === "prescriptions" && (
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            maxWidth: "850px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "600",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            My Prescriptions
          </h2>

          {/* Search & Sort */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <input
              type="text"
              placeholder="Search doctor, date, medicine..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              style={{
                padding: "10px 15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "250px",
                fontSize: "16px",
              }}
            />
            <button
              onClick={() => setSortAsc(!sortAsc)}
              style={{
                padding: "10px 15px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#3b82f6",
                color: "white",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              {sortAsc ? "Old → New" : "New → Old"}
            </button>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "16px",
              }}
            >
              <thead>
                <tr style={{ background: "#eef2ff", textAlign: "left" }}>
                  <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                    Date
                  </th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                    Doctor
                  </th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                    Prescription
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      borderBottom: "2px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((p, idx) => (
                  <tr
                    key={p.id}
                    style={{
                      background: idx % 2 === 0 ? "#fff" : "#f9fafb",
                      transition: "background 0.2s",
                    }}
                  >
                    <td style={{ padding: "12px" }}>{p.date}</td>
                    <td style={{ padding: "12px" }}>{p.doctor}</td>
                    <td style={{ padding: "12px" }}>{p.meds}</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <button
                        onClick={() => openDetails(p)}
                        style={{
                          padding: "6px 12px",
                          marginRight: "6px",
                          borderRadius: "6px",
                          backgroundColor: "#3b82f6",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        View
                      </button>
                      <button
                        onClick={() => downloadFile(p)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "6px",
                          backgroundColor: "#10b981",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              style={{
                padding: "10px 15px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: page === 1 ? "#e5e7eb" : "#3b82f6",
                color: page === 1 ? "#9ca3af" : "white",
                cursor: page === 1 ? "not-allowed" : "pointer",
              }}
            >
              Previous
            </button>
            <span style={{ alignSelf: "center" }}>
              Page {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              style={{
                padding: "10px 15px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: page === totalPages ? "#e5e7eb" : "#3b82f6",
                color: page === totalPages ? "#9ca3af" : "white",
                cursor: page === totalPages ? "not-allowed" : "pointer",
              }}
            >
              Next
            </button>
          </div>

          {/* Modal */}
          {modal.open && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-96 animate-fadeIn">
                <h3 className="text-xl font-semibold mb-4">
                  Prescription Details
                </h3>
                <p>
                  <strong>Date:</strong> {modal.item.date}
                </p>
                <p>
                  <strong>Doctor:</strong> {modal.item.doctor}
                </p>
                <p>
                  <strong>Meds:</strong> {modal.item.meds}
                </p>
                <p>
                  <strong>Notes:</strong> {modal.item.notes}
                </p>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ----------------------- */}
      {/* REMINDERS SECTION       */}
      {/* ----------------------- */}
      {tab === "reminders" && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            <FaBell className="inline mr-2" /> Reminders
          </h2>
          <p className="text-center text-gray-700 dark:text-gray-300">
            No reminders yet.
          </p>
        </div>
      )}
    </div>
  );
}
