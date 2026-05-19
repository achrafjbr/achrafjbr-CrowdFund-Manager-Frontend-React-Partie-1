import {
  FolderGit2,
  LayoutDashboard,
  LogOut,
  UserRound,
  Users,
} from "lucide-react";
import Navigator from "../components/Navigator";

function SideBar() {
  return (
    <div className="bg-black  w-[20%] p-1.5 py-6 space-y-8 min-h-screen">
      <div className="text-white">LOGO</div>

      {/* <Link to={"/Login"} />
      <Link to={"/Login"} /> */}

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
      <Navigator to="investors">
        <Users />
        <span>Investors</span>
      </Navigator>

      <h2 className="mt-20 font-extralight">ACCOUNT</h2>

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
  );
}

export default SideBar;
