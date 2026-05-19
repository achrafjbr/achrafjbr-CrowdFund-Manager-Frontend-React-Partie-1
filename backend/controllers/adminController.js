const User = require("../models/User");
const Investment = require("../models/Investment");
const Project = require("../models/Project");

async function getAllInvestors(req, res) {
  try {
    const investors = await User.find({ role: "investor" });
    res.status(200).json(investors);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


async function getAllOwners(req, res) {
  try {
    const owners = await User.find({ role: "owner" });
    res.status(200).json(owners);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


async function getInvestorPortfolio(req, res) {
  try {
    const investments = await Investment.find({ investor: req.params.id })
      .populate("project", "title capital status raisedAmount");

    const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);

    res.status(200).json({ investments, totalInvested });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


async function getOwnerPortfolio(req, res) {
  try {
    const projects = await Project.find({ owner: req.params.id });

    const totalRaised = projects.reduce(
      (sum, project) => sum + project.raisedAmount,
      0
    );

    res.status(200).json({ projects, totalRaised });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getAllInvestors,
  getAllOwners,
  getInvestorPortfolio,
  getOwnerPortfolio,
};