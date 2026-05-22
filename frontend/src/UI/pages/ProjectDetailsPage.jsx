import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner";
import { fetchProjectById } from "../../store/slices/projectSlice";

function ProjectDetailsPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { selectedProject, loading, error } = useSelector(
    (state) => state.projects,
  );

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [dispatch, id]);

  if (loading) return <Spinner />;

  if (error) return <h2 className="text-red-500 text-center mt-10">{error}</h2>;

  if (!selectedProject) return null;

  // Calculate progress percentage
  const progressPercentage =
    (selectedProject.raisedAmount / selectedProject.capital) * 100;
  // const selectedProject.maxInvestPercent = 50; // You can make this dynamic if needed

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: "#0B1020", minWidth: "1030px" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Main card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: "#121826" }}
        >
          {/* Header */}
          <div className="p-8 pb-4">
            <h1 className="text-3xl font-bold text-white mb-2">
              Project detail
            </h1>
          </div>

          {/* Project info grid */}
          <div className="px-8 py-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              {selectedProject.title}
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div
                className="rounded-xl p-4 text-center"
                style={{ backgroundColor: "#0B1020" }}
              >
                <p className="text-gray-400 text-sm mb-1">Capital</p>
                <p className="text-2xl font-bold text-white">
                  {selectedProject.capital.toLocaleString()} DH
                </p>
              </div>
              <div
                className="rounded-xl p-4 text-center"
                style={{ backgroundColor: "#0B1020" }}
              >
                <p className="text-gray-400 text-sm mb-1">Invested</p>
                <p className="text-2xl font-bold text-emerald-400">
                  {selectedProject.raisedAmount.toLocaleString()} DH
                </p>
              </div>
              <div
                className="rounded-xl p-4 text-center"
                style={{ backgroundColor: "#0B1020" }}
              >
                <p className="text-gray-400 text-sm mb-1">Progress</p>
                <p className="text-2xl font-bold text-blue-400">
                  {Math.round(progressPercentage)} %
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: "#0B1020" }}
              >
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                />
              </div>
            </div>

            {/* Status badge */}
            <div
              className="flex items-center justify-between mb-6 pb-4"
              style={{ borderBottomColor: "#0B1020", borderBottomWidth: "1px" }}
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Status</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedProject.status === "Open"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : selectedProject.status === "Closed"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {selectedProject.status}
                </span>
              </div>
            </div>

            {/* Investment limits */}
            <div
              className="grid grid-cols-2 gap-6 mb-6 pb-4"
              style={{ borderBottomColor: "#0B1020", borderBottomWidth: "1px" }}
            >
              <div>
                <p className="text-gray-400 text-sm mb-1">Max per investor</p>
                <p className="text-lg font-semibold text-white">
                  {selectedProject.maxInvestPercent} %
                </p>
              </div>
            </div>

            {/* Remaining amount section */}
            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-1">Remaining Amount</p>

              <p className="text-gray-300 leading-relaxed">
                {selectedProject.remainingCapital} DH remaining to reach the
                capital goal. <br />
                {selectedProject.remainingCapital > 0
                  ? "This project is still open for investments. Don't miss the opportunity to be part of it!"
                  : "This project has reached its funding goal and is now closed for investments."}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-4 justify-end" style={{ borderTopColor: "#0B1020", borderTopWidth: "1px" }}>
              <button className="px-6 py-2 rounded-lg transition-all duration-200 font-medium text-white hover:bg-gradient-to-r" 
              style={{backgroundColor: "#dc2626",backgroundImage: "linear-gradient(135deg, #dc2626, #b91c1c)",backgroundSize: "100%",backgroundRepeat: "no-repeat",}}onMouseEnter={(e) =>(e.currentTarget.style.backgroundImage ="linear-gradient(135deg, #a35454, #b91c1c)")}onMouseLeave={(e) =>(e.currentTarget.style.backgroundImage ="linear-gradient(135deg, #dc2626, #b91c1c)")}>
                Delete
              </button>
              <button
                className="px-6 py-2 rounded-lg transition-all duration-200 font-medium text-white hover:bg-gradient-to-r" style={{ backgroundColor: "#3b82f6", backgroundImage: "linear-gradient(135deg, #3b82f6, #2563eb)", backgroundSize: "100%", backgroundRepeat: "no-repeat",}} onMouseEnter={(e) =>(e.currentTarget.style.backgroundImage ="linear-gradient(135deg, #5e7fb4, #2563eb)")}onMouseLeave={(e) =>(e.currentTarget.style.backgroundImage ="linear-gradient(135deg, #3b82f6, #2563eb)")}>
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Owner section */}
        {selectedProject.owner && (
          <div
            className="mt-6 rounded-2xl p-6"
            style={{ backgroundColor: "#121826" }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Owner</h3>
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                }}
              >
                {selectedProject.owner.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-white">
                  {selectedProject.owner.name}
                </p>
                <p className="text-sm text-gray-400">
                  {selectedProject.owner.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetailsPage;

// <div style={{ backgroundColor: "lightblue", width: "1030px", padding: "20px" }}>
