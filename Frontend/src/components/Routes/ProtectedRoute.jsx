import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import NavBar from "../NavBar/NavBar";

export default function ProtectedRoute() {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(auth);
  return auth?.token ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
