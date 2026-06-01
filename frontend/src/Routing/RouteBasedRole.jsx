import { useSelector } from "react-redux";
import { decodeToken, getToken } from "../services/tokenService";

function RouteBasedRole({ roles, children }) {
  // const {
  //   decodedToken: { userId, role },
  // } = useSelector((state) => state.authentication);

  const { userId, role } = decodeToken(getToken());

  console.log("RouteBasedRole Token : ", role, userId);

  if (roles.includes(role)) {
    return children;
  }
}

export default RouteBasedRole;
