import { Navigate } from "react-router";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }) {
  const { loggedOnUser } = useAuth();
  if (!loggedOnUser) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
