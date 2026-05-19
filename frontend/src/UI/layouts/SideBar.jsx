import {
  FolderGit2,
  LayoutDashboard,
  LogOut,
  UserRound,
  Users,
} from "lucide-react";
import Navigator from "../components/Navigator";
import "@fortawesome/fontawesome-free/css/all.min.css";

function SideBar() {
  return (
    <div className="bg-[#0B1020] w-[18%] p-1.5 py-6 space-y-70 min-h-screen">
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
        <Navigator to="/">
          <LayoutDashboard />
          <span>Dashboard</span>
        </Navigator>

        {/*  */}
        <Navigator to="projects">
          <FolderGit2 />
          <span>Projects</span>
        </Navigator>

        {/*  */}
        <Navigator to="investors">
          <Users />
          <span>Investors</span>
        </Navigator>
      </div>

      {/* <h2 className="mt-20 font-extralight">ACCOUNT</h2> */}
      <div className="space-y-6">
        {/*  */}
        <Navigator to="profile">
          <UserRound />
          <span>Profile</span>
        </Navigator>

        {/*  */}
        <div className=" text-white cursor-pointer flex gap-2">
          <LogOut />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
