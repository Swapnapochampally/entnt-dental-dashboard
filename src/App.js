import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PatientRegister from "./pages/PatientRegister";
import DashboardPatient from "./pages/DashboardPatient";
import DashboardDoctor from "./pages/DashboardDoctor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<PatientRegister />} />
        <Route path="/dashboard-patient" element={<DashboardPatient />} />
        <Route path="/dashboard-doctor" element={<DashboardDoctor />} />
      </Routes>
    </Router>
  );
}

export default App;
