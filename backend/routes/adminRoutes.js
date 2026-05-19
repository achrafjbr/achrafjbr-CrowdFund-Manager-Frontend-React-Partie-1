const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get(
  "/investors",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getAllInvestors
);


router.get(
  "/owners",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getAllOwners
);


router.get(
  "/investors/:id/portfolio",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getInvestorPortfolio
);

router.get(
  "/owners/:id/portfolio",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getOwnerPortfolio
);

module.exports = router;