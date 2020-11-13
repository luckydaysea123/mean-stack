var ObjectID = require('mongodb').ObjectId;
var equipmentService = require('../services/equipment.service')


module.exports.validateModel = (req, res, next) => {
    let { type, name, status, desc, owner, active } = req.body;
    if (type === undefined || name === undefined) {
        return res.status(400).send({ message: 'required type, name' });
    }
    req.equipment = { type, name, status, desc, owner, active }
    next();
}

module.exports.validateID = async (req, res, next) => {
    const id = req.params.id;
    const equipment = await equipmentService.getByID(id);
    if (!ObjectID.isValid(id) || !equipment) {
        return res.status(400).send({ message: 'invalid ID' });
    }
    next();
}