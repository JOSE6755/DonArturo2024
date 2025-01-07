import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function UnProtectedRoute() {
  const { auth } = useAuth();
  if (auth.token) {
    if (auth.roleId === 2) {
      return <Navigate to="/orders" />;
    } else {
      return <Navigate to="/productCatalogue" />;
    }
  }
  return <Outlet />;
}
