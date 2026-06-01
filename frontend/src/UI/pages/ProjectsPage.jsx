import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchProjects } from "../../store/slices/projectSlice";
import Spinner from "../Spinner";
import CreateProject from "../components/CreateProject.jsx";

import "../../css/projectsPage.css";

function Projects() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { projects, loading, error } = useSelector((state) => state.projects);
  const { token } = useSelector((state) => state.authentication);
console.log(token);


  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0D0F1A] min-w-[1030px]">
        <div className="bg-[#13162A] rounded-2xl p-8 text-center border border-white/10">
          <h2 className="text-xl font-bold text-red-500 mb-2">Error</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <main>
        <div className="projects-header">
          <div>
            <h1>Projects</h1>
            <p>List of actual projects</p>
          </div>

          <button className="new-project-btn" onClick={() => setOpen(true)}>
            + New project
          </button>
        </div>

        <div className="projects-list">
          {projects.map((project) => {
            const invested = project.capital - project.remainingCapital;

            const percentage =
              project.fundingPercentage || (invested / project.capital) * 100;

            return (
              <div
                key={project._id}
                className="project-card"
                onClick={() => navigate(`/home/projects/${project._id}`)}
              >
                <div className="project-top">
                  <div className="project-left">
                    <div className="project-title-row">
                      <h2 className="project-title">{project.title}</h2>

                      <span
                        className={
                          project.status?.toLowerCase() === "open"
                            ? "status-open"
                            : "status-closed"
                        }
                      >
                        {project.status}
                      </span>
                    </div>

                    <p className="project-description">{project.description}</p>
                  </div>

                  <div className="project-right">
                    <div className="project-stat">
                      <p className="project-stat-value">
                        {project.capital.toLocaleString()}
                        <span>DH</span>
                      </p>

                      <p className="project-stat-label">Capital</p>
                    </div>

                    <div className="project-stat">
                      <p className="project-stat-value">
                        {invested.toLocaleString()}
                        <span>DH</span>
                      </p>

                      <p className="project-stat-label">Invested</p>
                    </div>
                  </div>
                </div>

                <div className="project-progress">
                  <div className="progress-header">
                    <span>Funding Progress</span>
                    <span>{percentage.toFixed(1)}% Funded</span>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${Math.min(percentage, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="empty-projects">
            <h3>No projects found</h3>
            <p>Create your first project to get started</p>
          </div>
        )}

        {open && (
          <div className="popup-overlay" onClick={() => setOpen(false)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <button className="popup-close" onClick={() => setOpen(false)}>
                ×
              </button>

              <CreateProject
                token={token}
                onClose={() => setOpen(false)}
                OnAddProject={() => dispatch(fetchProjects())}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Projects;
