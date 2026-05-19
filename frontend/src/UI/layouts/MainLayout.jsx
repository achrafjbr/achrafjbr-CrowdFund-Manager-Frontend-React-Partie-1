import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

function MainLayout() {
  return (
    <div className="flex">
      <SideBar />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
