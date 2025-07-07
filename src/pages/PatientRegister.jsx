import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dob: "",
    gender: "",
    height: "",
    weight: "",
    bloodGroup: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingPatients = JSON.parse(localStorage.getItem("patients")) || [];

    // Check for existing email
    const emailExists = existingPatients.some(
      (p) => p.email === formData.email
    );
    if (emailExists) {
      alert("Email already registered.");
      return;
    }

    const patientId = `p${Date.now()}`;
    const newPatient = { ...formData, id: patientId };

    const updatedPatients = [...existingPatients, newPatient];
    localStorage.setItem("patients", JSON.stringify(updatedPatients));

    alert("Registration successful! Please login.");
    navigate("/"); // Redirects to Login page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Patient Registration
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input name="name" placeholder="Full Name" required onChange={handleChange} className="border p-2 rounded" />
          <input name="age" type="number" placeholder="Age" required onChange={handleChange} className="border p-2 rounded" />
          <input name="dob" type="date" placeholder="DOB" required onChange={handleChange} className="border p-2 rounded" />
          <select name="gender" required onChange={handleChange} className="border p-2 rounded">
            <option value="">Select Gender</option>
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
          <input name="height" placeholder='Height (e.g. 5"8)' required onChange={handleChange} className="border p-2 rounded" />
          <input name="weight" placeholder="Weight (kg)" required onChange={handleChange} className="border p-2 rounded" />
          <input name="bloodGroup" placeholder="Blood Group" required onChange={handleChange} className="border p-2 rounded" />
          <input name="email" type="email" placeholder="Email" required onChange={handleChange} className="border p-2 rounded" />
          <input name="phone" type="tel" placeholder="Phone Number" required onChange={handleChange} className="border p-2 rounded" />
          <input name="address" placeholder="Address" required onChange={handleChange} className="border p-2 rounded" />
          <input name="password" type="password" placeholder="Password" required onChange={handleChange} className="border p-2 rounded" />
          <button type="submit" className="col-span-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientRegister;
