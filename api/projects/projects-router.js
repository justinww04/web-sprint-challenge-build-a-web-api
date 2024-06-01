// Write your "projects" router here!



const express = require('express')

const { validateProject, validateProjectChange, validateProjectId } = require('./projects-middleware')

const Project = require('./projects-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Project.get()
    .then(projects => {
        res.json(projects)
    })
    .catch(next)
});

router.get('/:id', async (req, res, next) =>{
    try {
        const project = await Project.get(req.params.id)
        if (!project) {
            res.status(404).json({
                message: "The project with the specified ID does not exist"
            })
        } else {
            res.json(project)
        }
    } catch (err) {
        res.status(500).json({
          message:'problem finding project',
        })
      }
});

router.post('/', validateProject, (req, res, next) =>{
    Project.insert(req.body)
    .then(newProject => {
      res.status(201).json(newProject)
    })
    .catch(next)
  });

router.put('/:id', validateProjectId, validateProjectChange, (req, res, next) =>{
    Project.update(req.params.id,  req.body)
    .then(() => {
      return Project.get(req.params.id)
    })
    .then(project => {
      res.json(project)
    })
    .catch(next)
});

router.delete('/:id', validateProjectId, async (req, res, next) =>{
    try {
        await Project.remove(req.params.id)
        res.json(req.project)
      } catch (err) {
        next(err)
      }
});

router.get('/:id/actions', validateProjectId, (req, res, next) =>{
    Project.getProjectActions(req.params.id)
    .then(actions => {
        res.json(actions)
    })
    .catch(next)
    
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      customMessage: 'something tragic inside projects router happened',
      message: err.message,
      stack:err.stack,
    })
  })

module.exports = router