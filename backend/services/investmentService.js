const Investment = require("../models/Investment");
const Project = require("../models/Project");
const User = require("../models/User");


async function addBalance(userId, amount) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  if (amount <= 0) throw new Error("Le montant doit être supérieur à 0");

  user.balance += amount;
  return await user.save();
}


async function getOpenProjects() {
  return await Project.find({ status: "open" });
}


async function getProjectById(projectId) {
  const project = await Project.findById(projectId);
  if (!project) throw new Error("Project not found");
  return project;
}


async function invest(investorId, projectId, amount) {
  
  const project = await Project.findById(projectId);
  if (!project) throw new Error("Project not found");


  if (project.status === "closed") {
    throw new Error("Project is closed");
  }

  
  const investor = await User.findById(investorId);
  if (!investor) throw new Error("Investor not found");
  if (investor.balance < amount) {
    throw new Error("Solde insuffisant");
  }

  const remainingCapital = project.capital - project.raisedAmount;
  if (amount > remainingCapital) {
    throw new Error("Le montant dépasse le capital restant");
  }


  const investmentPercentage = (amount / project.capital) * 100;
  if (investmentPercentage > project.maxInvestPercent) {
    throw new Error(
      `Vous ne pouvez pas investir plus de ${project.maxInvestPercent}% du capital`
    );
  }


  investor.balance -= amount;
  await investor.save();

  const investment = await Investment.create({
    investor: investorId,
    project: projectId,
    amount,
    percentage: investmentPercentage,
  });


  project.raisedAmount += amount;


  if (project.raisedAmount >= project.capital) {
    project.status = "closed";
  }

  await project.save();

  return investment;
}

async function getMyInvestments(investorId) {
  return await Investment.find({ investor: investorId }).populate(
    "project",
    "title capital status raisedAmount"
  );
}

module.exports = {
  addBalance,
  getOpenProjects,
  getProjectById,
  invest,
  getMyInvestments,
};