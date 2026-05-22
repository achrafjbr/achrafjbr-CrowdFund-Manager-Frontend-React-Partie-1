import { useSelector } from "react-redux";

function RouteBasedRole({ roles, children }) {
  const {
    decodedToken: { userId, role },
  } = useSelector((state) => state.authentication);

  console.log("RouteBasedRole Token : ", role, userId);
  return privateRoute(roles, children, role);
}

export default RouteBasedRole;

const privateRoute = (roles, children, role) => {
  if (roles.includes(role)) {
    return children;
  } else {
    return <></>;
  }
};
