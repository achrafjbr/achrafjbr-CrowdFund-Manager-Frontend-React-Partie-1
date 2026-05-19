import { NavLink } from "react-router-dom";

function Navigator({ to, children }) {
  const isActiveLinke = ({ isActive }) =>
    isActive
      ? {
          color: "white",
          padding: "0.9rem",
          borderRadius: "10px",
          background: "pink",
        }
      : { color: "white" };

  return (
    <div>
      <NavLink style={isActiveLinke} to={to} className={`flex gap-2 `}>
        {children}
      </NavLink>
    </div>
  );
}

export default Navigator;
