const dotenv = require("dotenv");
const ErrorMiddleware=require("./middlewares/errorHandler")
dotenv.config();
const connectDB = require("./config/db");

const express = require("express");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes")
const investmentRoutes = require("./routes/investmentRoutes");
const adminRoutes = require("./routes/adminRoutes");



const app = express();
connectDB();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/projects",projectRoutes)
app.use("/api/investments", investmentRoutes); 
app.use("/api/admin", adminRoutes);

app.use((err, req, res,next) => {
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message || "Server Error" ,message :err});
});
app.use(ErrorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
app.use(ErrorMiddleware)
module.exports = app;
