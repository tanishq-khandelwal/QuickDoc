import toast from "react-hot-toast";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { useState, useEffect } from "react";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const location = useLocation();
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decodedToken = jwt_decode<{ email: string; role: string }>(token);
        setRole(decodedToken.role);
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Invalid token! Please log in again.");
        Cookies.remove("token");
      }
    }

    setIsLoading(false);
  }, []);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!role) {
    toast.error("Unauthenticated! Please log in to continue...");
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }


  if (!allowedRoles.includes(role)) {
    console.log("Protected Role",role)
    return <Navigate to="/denied" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
