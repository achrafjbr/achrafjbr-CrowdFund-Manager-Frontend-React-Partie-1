const Project = require("../models/Project");
const investment = require("../models/Investment");

async function createProject(data, ownerId) {
  const {
    title,
    description,
    capital,
    maxInvestPercent,
    initialInvestment,
    percentage,
  } = data;
  // console.log(data);

  const project = await Project.create({
    title,
    description,
    capital,
    raisedAmount: initialInvestment || 0,
    percentage,
    maxInvestPercent,
    owner: ownerId,
    status: "open",
  });
  if (initialInvestment && initialInvestment > 0) {
    await investment.create({
      investor: ownerId,
      project: project._id,
      amount: initialInvestment,
      precentage: (initialInvestment / capital) * 100,
    });
  }
  return project;
}

async function getMyProjects(ownerId) {
  return await Project.find({ owner: ownerId });
}

async function updateProject(projectId, ownerId, data) {
  const project = await Project.findById(projectId);
  if (!project) throw new Error("Project not found");

  if (project.owner.toString() !== ownerId) {
    throw new Error("Unauthorized");
  }

  if (project.status === "closed") {
    throw new Error("Project already closed");
  }
  Object.assign(project, data);
  return await project.save();
}

async function deleteProject(projectId, ownerId) {
  const project = await Project.findById(projectId);
  if (!project) throw new Error("Project not found");
  if (project.owner.toString() !== ownerId) {
    throw new Error("Unauthorized");
  }
  return await Project.findByIdAndDelete(projectId); 
}

async function closePorject(projectId, ownerId) {
  const project = await Project.findById(projectId);
  if (!project) throw new Error("project not found");

  if (project.owner.toString() !== ownerId) {
    throw new Error("Unauthorized");
  }
  project.status = "closed";

  return await project.save();
}

async function getProjectInvetors(projectId) {
  return await investment
    .find({ project: projectId })
    .populate("investor", "name email");
}

module.exports = {
  createProject,
  getMyProjects,
  updateProject,
  deleteProject,
  closePorject,
  getProjectInvetors,
};
