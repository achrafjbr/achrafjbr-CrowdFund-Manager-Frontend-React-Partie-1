import { useSelector } from "react-redux";

function RouteBasedRole({ roles, children }) {
  const {
    decodedToken: { userId, role },
  } = useSelector((state) => state.authentication);

  console.log("RouteBasedRole Token : ", role, userId);

  if (roles.includes(role)) {
    return children;
  }
}

export default RouteBasedRole;
