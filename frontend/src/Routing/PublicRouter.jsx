import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRouter({ children }) {
  const { token } = useSelector((state) => state.authentication);

  if (token) {
    return <Navigate to={"/home"} />;
  }

  return children;
}

export default PublicRouter;
