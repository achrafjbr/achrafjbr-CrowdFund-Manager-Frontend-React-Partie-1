import { NavLink } from "react-router-dom";

function Navigator({ to, children }) {
  const isActiveLinke = ({ isActive }) =>
    isActive
      ? {
          color: "white",
          padding: "0.6rem",
          borderRadius: "10px",
          background: "#7C3AED",
        }
      : { color: "white" };

  return (
    <div>
      <NavLink end style={isActiveLinke} to={to} className={`flex gap-2 `}>
        {children}
      </NavLink>
    </div>
  );
}

export default Navigator;
