var express = require('express')
var router = express.Router()
var controller = require('../controllers/equipment.controller')
var middleware = require('../middlewares/equipment.middleware')
var userMiddleware = require('../middlewares/user.middleware')

router.get('/', controller.getAll)
router.get('/:id', middleware.validateID, controller.get)
router.get('/user/:id', userMiddleware.validateID, controller.getByOwner)
router.post('/', middleware.validateModel, controller.create)
router.put('/:id', middleware.validateID, middleware.validateModel, controller.update)
router.delete('/:id', middleware.validateID, controller.delete)

module.exports = router