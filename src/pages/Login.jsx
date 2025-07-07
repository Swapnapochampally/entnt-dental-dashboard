import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg.jpg";

const Login = () => {
  const [activeTab, setActiveTab] = useState("doctor");
  const [doctorId, setDoctorId] = useState("");
  const [doctorPin, setDoctorPin] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPassword, setPatientPassword] = useState("");
  const navigate = useNavigate();

  const handleDoctorLogin = (e) => {
    e.preventDefault();
    if (doctorId === "7896235" && doctorPin === "001") {
      localStorage.setItem("role", "doctor");
      navigate("/dashboard-doctor");
    } else {
      alert("Invalid Doctor ID or PIN");
    }
  };

  const handlePatientLogin = (e) => {
    e.preventDefault();
    const registered = JSON.parse(localStorage.getItem("patients")) || [];
    const found = registered.find(
      (p) => p.email === patientEmail && p.password === patientPassword
    );
    if (found) {
      localStorage.setItem("role", "patient");
      localStorage.setItem("currentUser", JSON.stringify(found));
      localStorage.setItem("currentPatient", JSON.stringify(found)); // Fixed key to match patient dashboard
      navigate("/dashboard-patient");
    } else {
      alert("Invalid patient credentials");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur p-8 rounded-lg shadow-xl w-full max-w-md">
        {/* Tabs */}
        <div className="flex justify-center mb-6 border-b border-gray-300">
          <button
            onClick={() => setActiveTab("doctor")}
            className={`px-4 py-2 font-semibold transition ${
              activeTab === "doctor"
                ? "border-b-4 border-blue-600 text-blue-700"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Doctor Login
          </button>
          <button
            onClick={() => setActiveTab("patient")}
            className={`px-4 py-2 font-semibold transition ${
              activeTab === "patient"
                ? "border-b-4 border-green-600 text-green-700"
                : "text-gray-500 hover:text-green-600"
            }`}
          >
            Patient Login
          </button>
        </div>

        {/* Forms */}
        {activeTab === "doctor" ? (
          <form onSubmit={handleDoctorLogin} className="space-y-4">
            <h2 className="text-xl font-bold text-center text-blue-700">
              Doctor Login
            </h2>
            <input
              type="text"
              placeholder="Doctor ID"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              placeholder="PIN"
              value={doctorPin}
              onChange={(e) => setDoctorPin(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handlePatientLogin} className="space-y-4">
            <h2 className="text-xl font-bold text-center text-green-700">
              Patient Login
            </h2>
            <input
              type="email"
              placeholder="Email"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={patientPassword}
              onChange={(e) => setPatientPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
              Login
            </button>

            <div className="text-sm text-center mt-2">
              <button className="text-blue-500 hover:underline">Forgot Password?</button>
              <br />
              <a
                href="/register"
                className="text-blue-500 hover:underline mt-1 inline-block"
              >
                Register Here
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
