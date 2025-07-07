import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="w-64 bg-white p-4 shadow-md">
      <h2 className="text-xl font-bold mb-6">Dental Dashboard</h2>
      <ul className="space-y-4">
        <li><Link to="/dashboard" className="block">Dashboard</Link></li>
        <li><Link to="/patients" className="block">Patients</Link></li>
        <li><Link to="/appointments" className="block">Appointments</Link></li>
        <li>
          <button onClick={handleLogout} className="text-red-500">Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
