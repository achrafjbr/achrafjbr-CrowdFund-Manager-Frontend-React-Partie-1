import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.authentication);

  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return children;
}
