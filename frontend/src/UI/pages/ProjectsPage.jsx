import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProjects } from "../../store/slices/projectSlice";
import Spinner from "../Spinner";
import "../../css/projectsPage.css";

function Projects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projects, loading, error } = useSelector((state) => state.projects);

  console.log(projects);
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
        {/* Header */}
        <div className="projects-header">
          <div>
            <h1>Projects</h1>
            <p>List of actual projects</p>
          </div>

          <button className="new-project-btn">+ New project</button>
        </div>

        {/* Projects List */}
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
                {/* Top Row */}
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
                    {/* Capital */}
                    <div className="project-stat">
                      <p className="project-stat-value">
                        {project.capital.toLocaleString()}
                        <span>DH</span>
                      </p>

                      <p className="project-stat-label">Capital</p>
                    </div>

                    {/* Invested */}
                    <div className="project-stat">
                      <p className="project-stat-value">
                        {invested.toLocaleString()}
                        <span>DH</span>
                      </p>

                      <p className="project-stat-label">Invested</p>
                    </div>
                  </div>
                </div>

                {/* Progress */}
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

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="empty-projects">
            <h3>No projects found</h3>

            <p>Create your first project to get started</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Projects;
