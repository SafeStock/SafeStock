import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute({ allowedRoles }) {
  const token = sessionStorage.getItem("authToken");
  const cargo = sessionStorage.getItem("cargo");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se passar allowedRoles, verifica se o cargo está incluso
  if (allowedRoles && !allowedRoles.includes(cargo)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
