import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

function MainLayout() {
  return (
    <div className="flex">
      <SideBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
