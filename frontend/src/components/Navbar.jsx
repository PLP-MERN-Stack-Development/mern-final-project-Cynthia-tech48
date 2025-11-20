import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-50 shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* SITE NAME */}
        <h1 className="text-2xl font-extrabold text-blue-700">MedReach</h1>

        {/* NAV LINKS */}
        <div className="space-x-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-700 transition">Home</Link>
          <Link to="/login" className="hover:text-blue-700 transition">Login</Link>
          <Link to="/register" className="hover:text-blue-700 transition">Register</Link>
          <Link to="/dashboard" className="hover:text-blue-700 transition">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
