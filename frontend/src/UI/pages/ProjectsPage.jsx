import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchProjects } from "../../store/slices/projectSlice";
import Spinner from "../Spinner";
import Error from "../Error";
import CreateProject from "../components/CreateProject.jsx";

import "../../css/projectsPage.css";

function Projects() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projects, loading, error } = useSelector(
    (state) => state.projects,
  );

  const { token } = useSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  
  // filtred data based on search and  status filter 
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().startsWith(search.toLowerCase());
    const matchesStatus = statusFilter === "all" ? true : project.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // calcule of invested and percentage for each prj
  const projectCards = filteredProjects.map((project) => {
    const invested = project.capital - project.remainingCapital;

    const percentage = project.fundingPercentage || (invested / project.capital) * 100;

    return { ...project, invested, percentage };
  });

  if (loading) return <Spinner />;

  if (error) {
    return <Error message={error} /> ;
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

        <div className="filters">
          <input
            type="text"
            placeholder="Search project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="projects-list">
          {projectCards.map((project) => (
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

                  <p className="project-description">
                    {project.description}
                  </p>
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
                      {project.invested.toLocaleString()}
                      <span>DH</span>
                    </p>

                    <p className="project-stat-label">Invested</p>
                  </div>
                </div>
              </div>

              <div className="project-progress">
                <div className="progress-header">
                  <span>Funding Progress</span>
                  <span>{project.percentage.toFixed(1)}% Funded</span>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.min(project.percentage, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {projectCards.length === 0 && (
          <div className="empty-projects">
            <h3>No projects found</h3>
            <p>No project matches your search or filter</p>
          </div>
        )}

        {open && (
          <div className="popup-overlay" onClick={() => setOpen(false)}>
            <div
              className="popup-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="popup-close"
                onClick={() => setOpen(false)}
              >
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