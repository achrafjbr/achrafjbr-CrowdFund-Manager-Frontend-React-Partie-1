const express = require("express");
const router = express.Router();

const projectController = require("../controllers/projectController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post(
  "/",  authMiddleware, projectController.createProject
);

router.get(
  "/my-projects",
  authMiddleware,
  roleMiddleware("owner"),
  projectController.getMyProjects
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("owner"),
  projectController.updateProject
);

router.patch(
  "/:id/close",
  authMiddleware,
  roleMiddleware("owner"),
  projectController.closePorject
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("owner"),
  projectController.deleteProject
);

router.get(
  "/:id/investments",
  authMiddleware,
  roleMiddleware("owner"),
  projectController.getProjectInvetors
);
module.exports = router;