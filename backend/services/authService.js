const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function register(data) {
  const { name, email, password, role } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return user;
}

async function login(email, password) {
  const foundUser = await User.findOne({ email }).select("+password");
  if (!foundUser) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, foundUser.password);
//   console.log("isMatch:", isMatch);
  
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: foundUser._id, role: foundUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "2d" },
  );

  return { token };
}

async function getUserById(id) {
  return await User.findById(id).select("-password");
}

module.exports = { register, login, getUserById };
