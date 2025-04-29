import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute() {
  const token = sessionStorage.getItem("authToken");
  return token ? <Outlet /> : <Navigate to="/login" />;
}