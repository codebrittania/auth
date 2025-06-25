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

const UnauthenticatedRoute = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated = token ? isTokenValid(token) : false;

  // Если аутентифицирован, редиректим с публичных страниц на /
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default UnauthenticatedRoute;
