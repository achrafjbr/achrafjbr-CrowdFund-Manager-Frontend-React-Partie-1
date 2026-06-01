import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.authentication);
  console.log("Token", token);

  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return children;
}
