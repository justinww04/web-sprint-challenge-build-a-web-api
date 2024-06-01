// add middlewares here related to actions


const Action = require("./actions-model")

function validateAction(req, res, next) {
    const { notes, description } = req.body
    if (!notes || !description) {
      res.status(400).json({
        message: 'Please provide notes and description',
      })
    } else{
      req.notes = notes
      req.description = description
      next()
    }
  }

 

  async function validateActionId(req, res, next) {
    try {
      const action = await Action.get(req.params.id)
      if (!action) {
        res.status(404).json({
          message: 'project not found',
        })
      } else {
        req.action = action
        next()
      }
    } catch (err) {
      res.status(500).json({
        message:'problem finding action',
      })
    }
  }

module.exports = {
  validateAction,
  validateActionId
}