var ObjectID = require('mongodb').ObjectId;
const Validator = require('validatorjs');
const userService = require('../services/user.service')

module.exports.validateModel = (req, res, next) => {
    let { username, password } = req.body;
    const rules = {
        "username": "required|alpha_num|between:6,30",
        "password": "required|string|between:6,30"
    }
    let validation = new Validator({ username, password }, rules);
    if (validation.fails()) {
        res.status(400).json(validation.errors.all())
    } else {
        req.user = { username, password };
        next();
    }
}

module.exports.validateID = (req, res, next) => {
    const id = req.params.id;
    const user = userService.getByID(id);
    if (!ObjectID.isValid(id) || !user) {
        return res.status(400).send({ message: 'invalid ID' });
    }
    next();
}


