import toast from "react-hot-toast";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const location = useLocation();
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");

    if (storedRole) {
      setRole(storedRole);
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!role) {
    toast.error("Unauthenticated! Please log in to continue...");
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    console.log("Protected Role", role);
    return <Navigate to="/denied" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
