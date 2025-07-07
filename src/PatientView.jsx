import React from "react";

const PatientView = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Patient Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appointment Section */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Upcoming Appointment</h2>
          <p>Date: 10 July 2025</p>
          <p>Time: 10:30 AM</p>
          <p>Dentist: Dr. Swapna</p>
        </div>

        {/* Invoice Section */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Invoice</h2>
          <p>Amount: ₹1500</p>
          <p>Status: Paid</p>
          <p>Invoice No: INV-20250704</p>
        </div>

        {/* Calendar Section */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Calendar</h2>
          <p>[Calendar Widget Placeholder]</p>
        </div>

        {/* Medication Section */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Medications</h2>
          <ul>
            <li>Medicine A - 9:00 AM</li>
            <li>Medicine B - 2:00 PM</li>
            <li>Medicine C - 9:00 PM</li>
          </ul>
        </div>

        {/* Patient Info Section */}
        <div className="bg-white shadow rounded p-4 col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Patient Profile</h2>
          <p>Name: John Doe</p>
          <p>Age: 28</p>
          <p>Blood Group: B+</p>
          <p>Email: john@example.com</p>
          <p>Phone: 9876543210</p>
          <p>Address: 123 Street, Hyderabad</p>
          <p>Reports: <a href="#">Download Report</a></p>
        </div>
      </div>
    </div>
  );
};

export default PatientView;
