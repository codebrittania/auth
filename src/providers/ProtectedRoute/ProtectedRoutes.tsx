import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

interface JwtPayload {
  exp?: number;
  [key: string]: any;
}

const isTokenValid = (token: string) => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return false;
    return Date.now() < decoded.exp * 1000;
  } catch {
    return false;
  }
};

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated = token ? isTokenValid(token) : false;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
