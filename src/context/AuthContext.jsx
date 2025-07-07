import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const defaultUsers = [
  { id: "1", role: "Doctor", doctorId: "7896235", pin: "001", name: "Dr. Swapna", qualification: "BDS, MDS" },
  { id: "2", role: "Patient", email: "john@entnt.in", password: "patient123", patientId: "p1" }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

  useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem("users"));
    if (!existingUsers) {
      localStorage.setItem("users", JSON.stringify(defaultUsers));
    }
  }, []);

  const login = ({ role, doctorId, pin, email, password }) => {
    const users = JSON.parse(localStorage.getItem("users"));
    let matchedUser;

    if (role === "Doctor") {
      matchedUser = users.find(u => u.role === "Doctor" && u.doctorId === doctorId && u.pin === pin);
    } else {
      matchedUser = users.find(u => u.role === "Patient" && u.email === email && u.password === password);
    }

    if (matchedUser) {
      setUser(matchedUser);
      localStorage.setItem("user", JSON.stringify(matchedUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const registerPatient = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = { id: Date.now().toString(), role: "Patient", ...data };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registerPatient }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
