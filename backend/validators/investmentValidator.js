const createInvestment = Joi.object({
   
  projectId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.empty": "projectId est obligatoire",
      "string.pattern.base": "projectId invalide",
      "any.required": "projectId est obligatoire",
    }),

  
  amount: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Le montant doit être un nombre",
      "number.positive": "Le montant doit être supérieur à 0",
      "any.required": "Le montant est obligatoire",
    }),
});

module.exports = {
  createInvestment
};