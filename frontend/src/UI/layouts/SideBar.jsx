import {
  FolderGit2,
  LayoutDashboard,
  LogOut,
  UserRound,
  Users,
} from "lucide-react";
import Navigator from "../components/Navigator";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authenticationSlice";
import { useNavigate } from "react-router-dom";
import RouteBasedRole from "../../Routing/RouteBasedRole";

function SideBar() {
  const authState = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    // <div className="bg-[#0B1020] w-[18%] p-1.5 py-6 space-y-70 min-h-screen">
    <div
      className="bg-[#0B1020] w-[18%] p-1.5
     py-6 space-y-70 min-h-screen
      fixed top-0 left-0 
      overflow-y-auto"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 text-white mb-6">
          <i className="fa-solid fa-chart-line text-purple-600 text-3xl"></i>

          <h2 className="text-2xl font-bold">
            Crowd<span className="text-purple-600">Funder</span>
          </h2>
        </div>

        {/*  */}
        <Navigator to="/home">
          <LayoutDashboard />
          <span>Dashboard</span>
        </Navigator>

        {/*  */}
        <Navigator to="projects">
          <FolderGit2 />
          <span>Projects</span>
        </Navigator>

        {/*  */}
        <RouteBasedRole roles={["investor", "owner", "admin"]}>
          <Navigator to="investors">
            <Users />
            <span>Investors</span>
          </Navigator>
        </RouteBasedRole>
      </div>

      {/* <h2 className="mt-20 font-extralight">ACCOUNT</h2> */}
      <div className="space-y-6">
        {/*  */}

        <RouteBasedRole roles={["admin", "investor", "owner"]}>
          <Navigator to="profile">
            <UserRound />
            <span>Profile</span>
          </Navigator>
        </RouteBasedRole>

        {/*  */}
        <div
          className="text-white cursor-pointer flex gap-2"
          onClick={() => {
            dispatch(logout());
            navigate("/login", { replace: true });
          }}
        >
          <LogOut />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
