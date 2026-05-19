const projectService = require("../services/projectService")

async function createProject(req,res) {
    try {
        const project = await projectService.createProject(
            req.body,
            req.user.id
        )
        res.status(200).json(project)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

async function getMyProjects(req,res) {
    try {
        const project = await projectService.getMyProjects(req.user.id)
        res.status(200).json(project)
    } catch (error) {
        console.log(error)
        res.status(400).json({message : error.message})
    }
}
async function updateProject(req,res) {
    try {
        const project = await projectService.updateProject(
            req.params.id,
            req.user.id,
            req.body
        )
        res.status(200).json(project)
    } catch (error) {
        res.status(400).json({message :error.message})
    }
}
async function deleteProject(req,res){
    try {
        const project = await projectService.deleteProject(
            req.params.id,
            req.user.id,
        )
        res.status(200).json(project)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

async function closePorject(req,res) {
    try {
        const project =await projectService.closePorject(
            req.params.id,
            req.user.id
        )
        res.status(200).json(project)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

async function getProjectInvetors(req,res) {
    try {
        const project = await projectService.getProjectInvetors(
            req.params.id
        )
        res.status(200).json(project)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

module.exports={
    createProject,
    getMyProjects,
    updateProject,
    deleteProject,
    closePorject,
    getProjectInvetors
}