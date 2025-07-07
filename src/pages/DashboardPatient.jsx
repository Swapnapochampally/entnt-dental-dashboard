import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPatient = () => {
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const role = localStorage.getItem("role");

    if (currentUser && role === "patient") {
      setPatient(currentUser);
    } else {
      // if not logged in, redirect to login
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("role");
    navigate("/");
  };

  if (!patient) {
    return <div className="p-6 text-center">No patient data found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700">
          Welcome, {patient.name}
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded shadow p-6 grid grid-cols-2 gap-4 max-w-4xl mx-auto mb-10">
        <div><strong>Age:</strong> {patient.age}</div>
        <div><strong>Date of Birth:</strong> {patient.dob}</div>
        <div><strong>Gender:</strong> {patient.gender}</div>
        <div><strong>Height:</strong> {patient.height}</div>
        <div><strong>Weight:</strong> {patient.weight}</div>
        <div><strong>Blood Group:</strong> {patient.bloodGroup}</div>
        <div><strong>Email:</strong> {patient.email}</div>
        <div><strong>Phone:</strong> {patient.phone}</div>
        <div className="col-span-2"><strong>Address:</strong> {patient.address}</div>
      </div>

      {/* Appointments Section */}
      <div className="bg-white rounded shadow p-6 max-w-4xl mx-auto mb-10">
        <h3 className="text-xl font-semibold mb-4 text-green-700">Upcoming Appointments</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Appointment with Dr. Smith - 10 July 2025, 10:30 AM</li>
          <li>Dental Cleaning - 18 July 2025, 2:00 PM</li>
        </ul>
      </div>

      {/* Treatment History Section */}
      <div className="bg-white rounded shadow p-6 max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-purple-700">Treatment History</h3>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Treatment</th>
              <th className="border px-4 py-2">Cost</th>
              <th className="border px-4 py-2">Files</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">20 June 2025</td>
              <td className="border px-4 py-2">Tooth Extraction</td>
              <td className="border px-4 py-2">₹1500</td>
              <td className="border px-4 py-2">
                <a href="#" className="text-blue-600 underline" download>Report.pdf</a>
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">05 May 2025</td>
              <td className="border px-4 py-2">Root Canal</td>
              <td className="border px-4 py-2">₹4000</td>
              <td className="border px-4 py-2">
                <a href="#" className="text-blue-600 underline" download>Xray.jpg</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPatient;
