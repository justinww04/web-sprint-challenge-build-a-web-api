// Write your "actions" router here!


const express = require('express')

const {validateAction, validateActionId} = require('./actions-middlware')

const Action = require('./actions-model')
const router = express.Router()

router.get('/', (req, res, next) =>{
    Action.get()
    .then(actions => {
        res.json(actions)
    })
    .catch(next)
});

router.get('/:id', validateActionId, async (req, res, next) =>{
    try {
        const action = await Action.get(req.params.id)
        if (!action) {
            res.status(404).json({
                message: "The action with the specified ID does not exist"
            })
        } else {
            res.json(action)
        }
    } catch (err) {
        res.status(500).json({
          message:'problem finding action',
        })
      }
});

router.post('/', validateAction, (req, res, next) =>{
    Action.insert(req.body)
    .then(newAction => {
      res.status(201).json(newAction)
    })
    .catch(next)
});

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Action.update(req.params.id,  req.body)
    .then(() => {
      return Action.get(req.params.id)
    })
    .then(action => {
      res.json(action)
    })
    .catch(next)

});

router.delete('/:id', validateActionId, async (req, res, next) =>{
    try {
        await Action.remove(req.params.id)
        res.json(req.action)
      } catch (err) {
        next(err)
      }
});

module.exports = router