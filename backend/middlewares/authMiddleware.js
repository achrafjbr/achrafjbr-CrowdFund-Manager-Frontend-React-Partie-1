const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foundUser = await User.findById(decoded.userId);
    if (!foundUser) return res.status(401).json({ error: "user not found" });
    req.user = foundUser;
    // console.log(req.headers.authorization);
    return next();
  } catch (error) {
    return res.status(401).json({ error: "invalid token" });
  }
};

module.exports = authMiddleware;
