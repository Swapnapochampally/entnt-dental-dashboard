import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DashboardDoctor = () => {
  const [date, setDate] = useState(new Date());
  const [activeSection, setActiveSection] = useState("appointments");
  const [showCalendar, setShowCalendar] = useState(false);

  const [appointments, setAppointments] = useState([
    { id: 1, name: "Patient A", time: "10:00 AM", date: "2025-07-08" },
    { id: 2, name: "Patient B", time: "11:30 AM", date: "2025-07-08" },
  ]);
  const [topPatients, setTopPatients] = useState([
    { id: 1, name: "Patient X", visits: 6 },
    { id: 2, name: "Patient Y", visits: 5 },
  ]);
  const [pendingTreatments, setPendingTreatments] = useState([
    { id: 1, treatment: "Root Canal", patient: "Patient M" },
  ]);
  const [completedTreatments, setCompletedTreatments] = useState([
    { id: 1, treatment: "Scaling", patient: "Patient A" },
  ]);

  const [newEntry, setNewEntry] = useState({});

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleEditChange = (e, id, field, section) => {
    const updater = (data, setData) =>
      setData(data.map((item) => (item.id === id ? { ...item, [field]: e.target.value } : item)));

    if (section === "appointments") updater(appointments, setAppointments);
    if (section === "topPatients") updater(topPatients, setTopPatients);
    if (section === "pending") updater(pendingTreatments, setPendingTreatments);
    if (section === "completed") updater(completedTreatments, setCompletedTreatments);
  };

  const handleDelete = (id, section) => {
    const deleter = (data, setData) => setData(data.filter((item) => item.id !== id));

    if (section === "appointments") deleter(appointments, setAppointments);
    if (section === "topPatients") deleter(topPatients, setTopPatients);
    if (section === "pending") deleter(pendingTreatments, setPendingTreatments);
    if (section === "completed") deleter(completedTreatments, setCompletedTreatments);
  };

  const handleNewEntryChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const addNewEntry = (section) => {
    const id = Date.now();
    if (section === "appointments" && newEntry.name && newEntry.time && newEntry.date) {
      setAppointments([...appointments, { id, ...newEntry }]);
    } else if (section === "topPatients" && newEntry.name && newEntry.visits) {
      setTopPatients([...topPatients, { id, ...newEntry }]);
    } else if (section === "pending" && newEntry.treatment && newEntry.patient) {
      setPendingTreatments([...pendingTreatments, { id, ...newEntry }]);
    } else if (section === "completed" && newEntry.treatment && newEntry.patient) {
      setCompletedTreatments([...completedTreatments, { id, ...newEntry }]);
    }
    setNewEntry({});
  };

  const renderSection = () => {
    const renderList = (items, fields, section) => (
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold mb-4 text-blue-700 capitalize">{section.replace(/([A-Z])/g, ' $1')}</h3>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-2">
              {fields.map((field) => (
                <input
                  key={field}
                  value={item[field]}
                  onChange={(e) => handleEditChange(e, item.id, field, section)}
                  className="border p-1 rounded"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
              ))}
              <button onClick={() => handleDelete(item.id, section)} className="text-red-600">🗑</button>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mt-4">
          {fields.map((field) => (
            <input
              key={field}
              name={field}
              value={newEntry[field] || ""}
              onChange={handleNewEntryChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="border p-1 rounded"
            />
          ))}
          <button
            onClick={() => addNewEntry(section)}
            className="bg-blue-500 text-white px-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    );

    switch (activeSection) {
      case "appointments":
        return renderList(appointments, ["name", "time", "date"], "appointments");
      case "topPatients":
        return renderList(topPatients, ["name", "visits"], "topPatients");
      case "pending":
        return renderList(pendingTreatments, ["treatment", "patient"], "pending");
      case "completed":
        return renderList(completedTreatments, ["treatment", "patient"], "completed");
      case "revenue":
        return <div className="bg-white p-4 rounded shadow">Revenue section (coming soon)</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pb-64 relative">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">Welcome, Dr. Swapna</h1>
          <p className="text-sm text-gray-600">BDS, MDS (Oral Surgeon)</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowCalendar(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Calendar
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <button
          onClick={() => setActiveSection("appointments")}
          className={`p-4 rounded shadow ${
            activeSection === "appointments" ? "bg-blue-600 text-white" : "bg-white"
          }`}
        >
          Appointments
        </button>
        <button
          onClick={() => setActiveSection("topPatients")}
          className={`p-4 rounded shadow ${
            activeSection === "topPatients" ? "bg-blue-600 text-white" : "bg-white"
          }`}
        >
          Top Patients
        </button>
        <button
          onClick={() => setActiveSection("pending")}
          className={`p-4 rounded shadow ${
            activeSection === "pending" ? "bg-blue-600 text-white" : "bg-white"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveSection("completed")}
          className={`p-4 rounded shadow ${
            activeSection === "completed" ? "bg-blue-600 text-white" : "bg-white"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setActiveSection("revenue")}
          className={`p-4 rounded shadow ${
            activeSection === "revenue" ? "bg-blue-600 text-white" : "bg-white"
          }`}
        >
          Revenue
        </button>
      </div>

      {/* Render Active Section */}
      {renderSection()}

      {/* Calendar Popup */}
      {showCalendar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg relative w-[320px]">
            <button
              onClick={() => setShowCalendar(false)}
              className="absolute top-2 right-2 text-red-600 font-bold text-xl hover:text-red-800"
            >
              ×
            </button>
            <Calendar onChange={setDate} value={date} />
            <p className="mt-3 text-sm text-gray-600">
              Notes for {date.toDateString()}:
              <br />
              <em>No notes added</em>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardDoctor;
