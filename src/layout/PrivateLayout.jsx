import Sidebar from "../components/Sidebar";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 min-h-screen p-6">{children}</div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateLayout;
