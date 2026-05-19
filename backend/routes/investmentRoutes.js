const express = require("express");
const router = express.Router();

const investmentController = require("../controllers/investmentController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");


router.post(
  "/balance",
  authMiddleware,
  roleMiddleware("investor"),
  investmentController.addBalance
);


router.get(
  "/projects",
  authMiddleware,
  roleMiddleware("investor"),
  investmentController.getOpenProjects
);


router.get(
  "/projects/:id",
  authMiddleware,
  roleMiddleware("investor"),
  investmentController.getProjectById
);


router.post(
  "/",
  authMiddleware,
  roleMiddleware("investor"),
  investmentController.invest
);


router.get(
  "/my-investments",
  authMiddleware,
  roleMiddleware("investor"),
  investmentController.getMyInvestments
);

module.exports = router;