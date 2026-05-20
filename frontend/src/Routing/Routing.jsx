import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "../UI/pages/DashboardPage";
import ProjectsPage from "../UI/pages/ProjectsPage";
import LoginPage from "../UI/pages/Auth/LoginPage";
import RegisterPage from "../UI/pages/Auth/LoginPage";

import CreateProjectPage from "../UI/pages/CreateProjectPage";
import InvistorsPage from "../UI/pages/InvistorsPage";
import ProfilePage from "../UI/pages/Auth/ProfilePage";
import MainLayout from "../UI/layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRouter from "./PublicRouter";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRouter>
              <LoginPage />
            </PublicRouter>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRouter>
              <LoginPage />
            </PublicRouter>
          }
        />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
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
