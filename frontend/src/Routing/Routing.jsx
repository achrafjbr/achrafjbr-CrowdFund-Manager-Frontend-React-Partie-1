import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "../UI/pages/DashboardPage";
import ProjectsPage from "../UI/pages/ProjectsPage";
import CreateProjectPage from "../UI/pages/CreateProjectPage";
import InvistorsPage from "../UI/pages/InvistorsPage";
import ProfilePage from "../UI/pages/Auth/ProfilePage";
import MainLayout from "../UI/layouts/MainLayout";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LoginPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} /> */}

        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="createProject" element={<CreateProjectPage />} />
          <Route path="investors" element={<InvistorsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
