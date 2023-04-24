import { Navigate, useLocation } from "react-router-dom";
import useLoggedUser from "../../hooks/useLoggedUser";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = useLoggedUser();
  const location = useLocation();
  // const isLoggedIn = useAuthCheck();

  // return isLoggedIn?.role === "student" ? children : <Navigate to="/" />;
  return isLoggedIn?.role === "student" ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
