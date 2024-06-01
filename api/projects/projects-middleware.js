// add middlewares here related to projects


const Project = require("./projects-model")

function validateProject(req, res, next) {

    const { name, description } = req.body
    if (!name || !description) {
      res.status(400).json({
        message: 'Please provide name and description',
      })
    } else{
      req.name = name
      req.description = description
      next()
    }
  }

  function validateProjectChange(req, res, next) {

    const { name, description, completed } = req.body
    if (!name || !description || completed == null) {
      res.status(400).json({
        message: `Please provide name, description, and completed`,
      })
    } else{
      req.name = name
      req.description = description
      req.completed = completed
      next()
    }
  }

  async function validateProjectId(req, res, next) {

    
    try {
      const project = await Project.get(req.params.id)
      if (!project) {
        res.status(404).json({
          message: 'project not found',
        })
      } else {
        req.project = project
        next()
      }
    } catch (err) {
      res.status(500).json({
        message:'problem finding project',
      })
    }
  }
  

  module.exports = {
    validateProject,
    validateProjectId,
    validateProjectChange
  }