import toast from "react-hot-toast";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[]; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  const location = useLocation();

  if (!isLoggedIn) {
    toast.error("Unauthenticated ! Please Login to Continue....");
  }

  return isLoggedIn && allowedRoles.includes(role!) ? (
    <Outlet/>
  ) : isLoggedIn ? (
    <Navigate to={"/denied"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
