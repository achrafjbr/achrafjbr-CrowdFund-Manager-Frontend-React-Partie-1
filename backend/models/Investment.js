
const mongoose = require("mongoose");
const investmentSchema = new mongoose.Schema(
  {
    investor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "L'investisseur est obligatoire"],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Le projet est obligatoire"],
    },
    amount: {
      type: Number,
      required: [true, "le montant est onligatoire"],
      min: [1, "Le montant doit être supérieur à 0"],
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Investment", investmentSchema);