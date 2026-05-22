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
      percentage: (initialInvestment / capital) * 100,
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

  const { initialInvestment, capital, ...otherData } = data;

  const oldCapital = project.capital;
  const newCapital = capital;
  const capitalChanged = newCapital && newCapital !== oldCapital;

  const hasNewInvestment = initialInvestment && initialInvestment > 0;

  let totalRaisedAmount = project.raisedAmount;

  if (hasNewInvestment) {
    const existingInvestment = await investment.findOne({
      project: projectId,
      investor: ownerId,
    });

    if (existingInvestment) {
      const newAmount = existingInvestment.amount + initialInvestment;
      existingInvestment.amount = newAmount;

      if (capitalChanged) {
        existingInvestment.percentage = (newAmount / newCapital) * 100;
      } else {
        existingInvestment.percentage = (newAmount / project.capital) * 100;
      }

      await existingInvestment.save();
      totalRaisedAmount += initialInvestment;
    } else {
      const newInvestment = await investment.create({
        investor: ownerId,
        project: projectId,
        amount: initialInvestment,
        percentage: capitalChanged
          ? (initialInvestment / newCapital) * 100
          : (initialInvestment / project.capital) * 100,
      });
      totalRaisedAmount += initialInvestment;
    }
  }

  if (capital) {
    otherData.capital = capital;
  }

  Object.assign(project, otherData);

  if (capitalChanged && newCapital > 0) {
    const investments = await investment.find({ project: projectId });

    let calculatedTotalRaised = 0;
    const bulkOperations = [];

    for (const inv of investments) {
      const newPercentage = Number(
        ((inv.amount / newCapital) * 100).toFixed(2),
      );

      bulkOperations.push({
        updateOne: {
          filter: { _id: inv._id },
          update: { percentage: newPercentage },
        },
      });

      calculatedTotalRaised += inv.amount;
    }

    // Exécuter toutes les mises à jour en une seule fois
    if (bulkOperations.length > 0) {
      await investment.bulkWrite(bulkOperations);
    }

    project.raisedAmount = calculatedTotalRaised;
  } else if (hasNewInvestment) {
    project.raisedAmount = totalRaisedAmount;
  }
  project.remainingCapital = project.capital - project.raisedAmount;
  project.fundingPercentage = (project.raisedAmount / project.capital) * 100;
  if (project.remainingCapital <= 0) {
    project.status = "closed";
  }

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

async function getProjectById(projectId) {
  return await Project.findById(projectId).populate("owner", "name email");
}
module.exports = {
  createProject,
  getMyProjects,
  updateProject,
  deleteProject,
  closePorject,
  getProjectInvetors,
  getProjectById,
};
