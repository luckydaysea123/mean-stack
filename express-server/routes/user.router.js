var express = require('express')
var router = express.Router()
var controller = require('../controllers/user.controller')
var middleware = require('../middlewares/user.middleware')

router.post('/login', middleware.validateModel, controller.login)
router.post('/', middleware.validateModel, controller.register)
router.get('/', controller.getAll)
router.get('/:id',middleware.validateID, controller.getByID)
router.put('/:id', middleware.validateID, middleware.validateModel, controller.update)
router.delete('/:id', controller.delete)

module.exports = router