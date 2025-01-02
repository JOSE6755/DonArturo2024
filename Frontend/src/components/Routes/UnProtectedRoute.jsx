import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function UnProtectedRoute() {
  const { auth } = useAuth();
  console.log(auth);
  return auth?.token ? <Navigate to="/home" /> : <Outlet />;
}
