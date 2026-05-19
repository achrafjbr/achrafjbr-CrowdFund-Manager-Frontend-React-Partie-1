const Joi = require("joi")

const createProject = Joi.object({
    title : Joi.string().min(2).max(20).required().message({
        "string.empty" : "title is required",
        "string.min" : "title must be at least 2 characters long",
        "string.max": "title must be less than 50 characters long",
        "any.required" : "title is raquired"
    }),
    description:Joi.string().min(2).max(50).required().message({
        "string.empty":"description is required",
        "string.min":"description must be at least 2 chracters long",
        "string.max":"description must be lass than 50 chracters long",
        "any.required":"description is required"
    }),
    capital :Joi.number().positive().required(),
    maxInvestPercent:Joi.number().min(1).max(100).required(),
    initialInvestment :Joi.number().min(0).optional(),
})

const updateProject = Joi.object({
    title :Joi.string().min(3).optional().message({
        "string.empty" : "title is required",
        "string.min" : "title must be at least 2 characters long",
        "string.max": "title must be less than 50 characters long",
        "any.required" : "title is raquired"
    }),
        description:Joi.string().min(2).max(50).required().message({
        "string.empty":"description is required",
        "string.min":"description must be at least 2 chracters long",
        "string.max":"description must be lass than 50 chracters long",
        "any.required":"description is required"
    }),
    capital :Joi.number().positive().required(),
    maxInvestPercentage:Joi.number().min(1).max(100).required(),
})

module.exports ={
    createProject,
    updateProject
}