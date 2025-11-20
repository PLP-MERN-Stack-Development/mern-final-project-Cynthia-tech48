export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center pt-24 px-4">

      {/* MAIN LOGO */}
      <img src="../photos/logo.jpg" alt="MediReach" className="h-36 w-36 mb-8" />

      {/* TITLE */}
      <h1 className="text-5xl font-extrabold text-blue-700 mb-6 text-center tracking-tight drop-shadow-lg">
        Welcome to MedReach
      </h1>

      {/* MESSAGE BOX */}
      <div className="home-message p-8 bg-white rounded-xl shadow-lg max-w-3xl text-center text-gray-700 leading-relaxed text-lg">
        MedReach helps you easily connect with healthcare providers, 
        book appointments, receive reminders, and manage prescriptions — 
        all in one simple and modern platform designed for you.
      </div>

      {/* BUTTONS */}
      <div className="mt-10 flex flex-col space-y-5 items-center w-full max-w-xs">
        <a
          href="/login"
          className="bg-blue-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-blue-700 hover:shadow-2xl transition transform hover:-translate-y-1 w-full text-center"
        >
          Login
        </a>

        <a
          href="/register"
          className="bg-gray-200 text-gray-800 px-10 py-4 rounded-lg font-semibold hover:bg-gray-300 hover:shadow-2xl transition transform hover:-translate-y-1 w-full text-center"
        >
          Register
        </a>
      </div>
    </div>
  );
}
