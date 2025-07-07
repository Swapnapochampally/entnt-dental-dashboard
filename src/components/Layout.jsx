// src/components/Layout.jsx

import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const isDoctor = user?.role === "doctor";

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8">
            {isDoctor ? "Doctor Panel" : "Patient Panel"}
          </h2>
          <nav className="flex flex-col gap-4">
            {isDoctor ? (
              <>
                <Link to="/doctor/dashboard" className="hover:underline">
                  Dashboard
                </Link>
                <Link to="/doctor/appointments" className="hover:underline">
                  Appointments
                </Link>
                <Link to="/doctor/surgeries" className="hover:underline">
                  Surgeries
                </Link>
                <Link to="/doctor/patients" className="hover:underline">
                  Patients
                </Link>
              </>
            ) : (
              <>
                <Link to="/patient/dashboard" className="hover:underline">
                  Dashboard
                </Link>
                <Link to="/patient/invoice" className="hover:underline">
                  Invoice
                </Link>
                <Link to="/patient/appointments" className="hover:underline">
                  Appointments
                </Link>
                <Link to="/patient/medications" className="hover:underline">
                  Medications
                </Link>
              </>
            )}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center mt-6 gap-2 text-red-300 hover:text-red-500"
        >
          <FiLogOut />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        {/* Top bar with doctor/patient info */}
        {user && (
          <div className="mb-4 flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="rounded-full w-10 h-10"
            />
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-500">
                {isDoctor ? "MDS, BDS – Oral Surgeon" : "Patient"}
              </p>
            </div>
          </div>
        )}

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
