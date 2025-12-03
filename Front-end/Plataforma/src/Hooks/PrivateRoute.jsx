import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute({ allowedRoles }) {
  const token = sessionStorage.getItem("authToken");
  const cargo = sessionStorage.getItem("cargo");

  console.log('PrivateRoute - Token:', token ? 'Existe' : 'Não existe');
  console.log('PrivateRoute - Cargo:', cargo);
  console.log('PrivateRoute - Roles permitidos:', allowedRoles);

  if (!token) {
    console.log('PrivateRoute - Redirecionando para login: sem token');
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(cargo)) {
    console.log('PrivateRoute - Redirecionando para login: cargo não permitido');
    return <Navigate to="/login" replace />;
  }

  console.log('PrivateRoute - Acesso permitido!');
  return <Outlet />;
}
