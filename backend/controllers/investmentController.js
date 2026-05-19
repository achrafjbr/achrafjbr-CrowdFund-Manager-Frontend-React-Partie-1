const investmentService = require("../services/investmentService");


async function addBalance(req, res) {
  try {
    // console.log(req.body);
    // console.log("headers:", req.headers);
    const user = await investmentService.addBalance(
      req.user._id,
      req.body.amount
    );
    res.status(200).json({ balance: user.balance });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


async function getOpenProjects(req, res) {
  try {
    const projects = await investmentService.getOpenProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getProjectById(req, res) {
  try {
    const project = await investmentService.getProjectById(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


async function invest(req, res) {
  try {
    const investment = await investmentService.invest(
      req.user._id,
      req.body.projectId,
      req.body.amount
    );
    res.status(201).json(investment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


async function getMyInvestments(req, res) {
  try {
    const investments = await investmentService.getMyInvestments(req.user._id);
    res.status(200).json(investments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  addBalance,
  getOpenProjects,
  getProjectById,
  invest,
  getMyInvestments,
};