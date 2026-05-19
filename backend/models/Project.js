const { required } = require("joi");
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre est obligatoire"],
      trim: true,
      minlength: [3, "Le titre doit contenir au moins 3 caractères"],
    },
    description: {
      type: String,
      required: [true, "La description est obligatoire"],
      trim: true,
    },
    capital: {
      type: Number,
      required: [true, "Le capital est obligatoire"],
      min: [1, "Le capital doit être supérieur à 0"],
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    raisedAmount: {
      type: Number,
      default: 0,
      min: [0, "Le montant levé ne peut pas être négatif"],
    },
    maxInvestPercent: {
      type: Number,
      required: [true, "Le pourcentage maximum est obligatoire"],
      min: [1, "Le pourcentage doit être au moins 1"],
      max: [50, "Le pourcentage ne peut pas dépasser 50%"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Le propriétaire est obligatoire"],
    },
  },
  { timestamps: true },
);

projectSchema.index({ status: 1 });
projectSchema.index({ owner: 1 });

projectSchema.virtual("remainingCapital").get(function () {
  return this.capital - this.raisedAmount;
});
projectSchema.virtual("fundingPercentage").get(function () {
  return parseFloat(((this.raisedAmount / this.capital) * 100).toFixed(2));
});

projectSchema.set("toJSON", { virtuals: true });
projectSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Project", projectSchema);
